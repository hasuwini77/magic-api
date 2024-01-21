$(() => {
  let creatureCallWhite = "?types=Creature&colors=W&pageSize=100&contains=imageUrl";
  let creatureCallBlack = "?types=Creature&colors=B&pageSize=100&contains=imageUrl";

  resultDiv = $(".result");
  mainDiv = $("main-content");
  let currentPlayer = "";
  MAGIC_API_CREATURE_A = "https://api.magicthegathering.io/v1/cards" + creatureCallWhite;
  MAGIC_API_CREATURE_B = "https://api.magicthegathering.io/v1/cards" + creatureCallBlack;

  const getRandomCardA = async (url) => {
    $(".button-a").on("click", async function () {
      $(".button-a").prop("disabled", true);
      const wrapper = $(".form-menu");
      const loader = document.createElement("p");
      loader.innerText = "Loading...";
      loader.classList.add("loader-element");
      wrapper.append(loader);

      let res = await fetch(url);

      if (!res.ok) {
        loader.innerText = "Impossible to fetch data";
        loader.style.color = "red";
        return;
      }

      let data = await res.json();
      loader.remove();
      let randomCard = data.cards.length > 0 ? data.cards[Math.floor(Math.random() * data.cards.length)] : null;
      currentPlayer = "Player A";
      if (randomCard) {
        wrapper.append(createCard(randomCard));
        console.log(data);
      } else {
        loader.innerText = "No cards found";
        loader.style.color = "red";
      }
    });
  };

  const getRandomCardB = async (url) => {
    $(".button-b").on("click", async function () {
      $(".button-b").prop("disabled", true);
      const wrapper = $(".form-menu");
      const loader = document.createElement("p");
      loader.innerText = "Loading...";
      loader.classList.add("loader-element");
      wrapper.append(loader);

      let res = await fetch(url);

      if (!res.ok) {
        loader.innerText = "Impossible to fetch data";
        loader.style.color = "red";
        return;
      }

      let data = await res.json();
      loader.remove();
      let randomCard = data.cards.length > 0 ? data.cards[Math.floor(Math.random() * data.cards.length)] : null;
      currentPlayer = "Player B";
      if (randomCard) {
        wrapper.append(createCard(randomCard));
        console.log(data);
      } else {
        loader.innerText = "No cards found";
        loader.style.color = "red";
      }
    });
  };

  /**
   * Creating an html element with a new card
   * @param {{title: string, body: string}} randomCard
   */
  function createCard(randomCard) {
    const card = document.createElement("div");

    card.innerHTML = ` 
    <h2>${randomCard.name}</h2> 
    <p class="card-type">Type: ${randomCard.type}</p> 
    <img src="${randomCard.imageUrl}" class="card-image" alt="${randomCard.originalType}">
    <p class="artist">Artist: ${randomCard.artist}</p> 
    <p class="player-name"> ${currentPlayer} </p> 
  `;
    card.classList.add("magic-card");
    resultDiv.append(card);
  }

  const fightButton = async () => {
    const promiseA = getRandomCardA(MAGIC_API_CREATURE_A);
    const promiseB = getRandomCardB(MAGIC_API_CREATURE_B);

    await Promise.all([promiseA, promiseB]);

    if ($(".magic-card").length === 2) {
      const newButton = $("<button>").text("Fight!").attr("id", "fight").addClass("fight-button");
      mainDiv.append(newButton);
    }
  };

  fightButton();
});
