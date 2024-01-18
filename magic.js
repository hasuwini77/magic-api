$(() => {
  let creatureCallWhite = "?types=Creature&colors=W&pageSize=100&contains=imageUrl";

  let creatureCallBlack = "?types=Creature&colors=B&pageSize=100&contains=imageUrl";

  resultDiv = $(".result");
  MAGIC_API_CREATURE_A = "https://api.magicthegathering.io/v1/cards" + creatureCallWhite;
  MAGIC_API_CREATURE_B = "https://api.magicthegathering.io/v1/cards" + creatureCallBlack;

  const getRandomCardA = async (url) => {
    $(".button-a").on("click", async function () {
      const wrapper = $(".form-menu");
      const loader = document.createElement("p");
      loader.innerText = "Loading...";
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
      const wrapper = $(".form-menu");
      const loader = document.createElement("p");
      loader.innerText = "Loading...";
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

      if (randomCard) {
        wrapper.append(createCard(randomCard));
        console.log(data);
      } else {
        loader.innerText = "No cards found";
        loader.style.color = "red";
      }
    });
  };

  getRandomCardA(MAGIC_API_CREATURE_A);
  getRandomCardB(MAGIC_API_CREATURE_B);

  /**
   * Creating an html element with a new card
   * @param {{title: string, body: string}} randomCard
   * @return {HTMLElement}
   */
  function createCard(randomCard) {
    const card = document.createElement("div");

    card.innerHTML = ` 
    <h2>${randomCard.name}</h2> 
    <p class="card-type">Type: ${randomCard.type}</p> 
    <img src="${randomCard.imageUrl}" class="card-image" alt="${randomCard.originalType}">
    <p class="artist">Artist: ${randomCard.artist}</p> 
  `;

    card.classList.add("magic-card");
    const newCard = resultDiv.append(card);
    return newCard;
  }
});
