$(() => {
  MAGIC_API_CREATURE_A = "https://api.magicthegathering.io/v1/cards" + creatureCall;
  MAGIC_API_CREATURE_B = "https://api.magicthegathering.io/v1/cards" + creatureCall;
  let creatureCall = "?types=Creature";
  resultDiv = $(".result");

  const getRandomCard = async (url) => {
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

      // Loop until a card with imageUrl is found
      let randomCard;
      do {
        randomCard = data.cards[Math.floor(Math.random() * 100) + 1];
      } while (!randomCard.imageUrl);

      wrapper.append(createCard(randomCard));
      console.log(data);
    });
  };

  const getRandomSetCard = async (url) => {
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

      console.log(data);
    });
  };

  getRandomCard(MAGIC_API_CREATURE_A);
  getRandomSetCard(MAGIC_API_CREATURE_B);

  /**
   * Creating an html element with a new card
   * @param {{title: string, body: string}} randomCard
   * @return {HTMLElement}
   */
  function createCard(randomCard) {
    const card = document.createElement("div");
    card.innerHTML = ` 
        <h2> ${randomCard.name} </h2> 
        <p class="card-type"> Type: ${randomCard.type} </p> 
        <img src="${randomCard.imageUrl}" class="card-image" alt="${randomCard.originalType}> 
        <p class="artist"> Artist: ${randomCard.artist} </p> 
        `;

    if (!randomCard.imageUrl) {
      card.innerHTML = ` 
        <h2> ${randomCard.name} </h2> 
        <p class="card-type"> Type: ${randomCard.type} </p> 
        <p class="no-image"> Oh no Boi! There was no image for this Card </p 
        <p class="no-image"> Make sure to re-generate some more cards! </p> 
        <p class="artist"> Artist: ${randomCard.artist} </p> 
      `;
    }

    card.classList.add("magic-card");
    const newCard = resultDiv.append(card);
    return newCard;
  }
});
