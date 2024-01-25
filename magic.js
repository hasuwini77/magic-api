$(() => {
  let creatureRandomCall = "random?q=t:creature";
  let funnyCall = "+is:funny";
  NEW_API_CREATURE_A = "https://api.scryfall.com/cards/" + creatureRandomCall;
  NEW_API_FUNNY_CREATURE_B = "https://api.scryfall.com/cards/" + creatureRandomCall + funnyCall;

  resultDiv = $(".result");
  mainDiv = $(".main-content");
  let currentPlayer = "";
  let playerAPower;
  let playerAToughness;
  let playerBPower;
  let playerBToughness;

  const getRandomCard = async (url, button) => {
    button.prop("disabled", true);
    const wrapper = $(".form-menu");
    const loader = document.createElement("p");
    loader.innerText = "Loading...";
    loader.classList.add("loader-element");
    wrapper.append(loader);

    try {
      let res = await fetch(url);

      if (!res.ok) {
        throw new Error("Impossible to fetch data");
      }

      let data = await res.json();

      if (data.object === "card" && data.image_uris && data.image_uris.normal) {
        let randomCard = data;
        currentPlayer = button.hasClass("button-a") ? "Player A" : "Player B";
        if (button.hasClass("button-a")) {
          playerAPower = randomCard.power;
          playerAToughness = randomCard.toughness;
        } else {
          playerBPower = randomCard.power;
          playerBToughness = randomCard.toughness;
        }
        wrapper.append(createCard(randomCard));
        console.log(data);
      } else {
        throw new Error("No valid card found");
      }
    } catch (error) {
      loader.innerText = error.message;
      loader.style.color = "red";
    } finally {
      loader.remove();
      button.prop("disabled", false);
    }
  };

  /**
   * Creating an HTML element with a new card
   * @param {object} randomCard
   */
  function createCard(randomCard) {
    const card = document.createElement("div");

    card.innerHTML = `
      <h2>${randomCard.name}</h2>
      <p class="card-type">${randomCard.type_line}</p>
      <img src="${randomCard.image_uris.normal}" class="card-image" alt="${randomCard.name}">
      <p class="artist">Artist: ${randomCard.artist}</p>
      <p class="player-name">${currentPlayer}</p>
    `;
    card.classList.add("magic-card");
    resultDiv.css("display", "flex");
    resultDiv.append(card);
  }

  const resetGame = () => {
    resultDiv.empty();
    resultDiv.css("display", "none");
    $(".fight-button").empty().hide();
    $(".button-a, .button-b").prop("disabled", false);
  };

  fightStart = () => {
    $(".fight-button").on("click", () => {
      if (playerAPower >= playerBToughness && playerBPower < playerAToughness) {
        alert("Player A Wins the Game");
      } else if (playerBPower >= playerAToughness && playerAPower < playerBToughness) {
        alert("Player B Wins the Game");
      } else if (playerAPower >= playerBToughness && playerBPower >= playerAToughness) {
        alert("Both players DIE! DRAW!");
      }

      resetGame();
    });
  };

  const generateRandomCreature = () => {
    $(".button-a").on("click", () => {
      getRandomCard(NEW_API_CREATURE_A, $(".button-a")).then(() => {
        $(".button-a").prop("disabled", true);
        checkAndCreateFightButton();
      });
    });

    $(".button-b").on("click", () => {
      getRandomCard(NEW_API_FUNNY_CREATURE_B, $(".button-b")).then(() => {
        $(".button-b").prop("disabled", true);
        checkAndCreateFightButton();
      });
    });

    const checkAndCreateFightButton = () => {
      if ($(".magic-card").length === 2) {
        const newButton = $("<button>").text("Fight!").attr("id", "fight").addClass("fight-button");
        mainDiv.append(newButton);
        fightStart();
      }
    };
  };

  generateRandomCreature();
});
