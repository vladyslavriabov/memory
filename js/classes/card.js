export class Card {
  constructor(
    id,
    matchId,
    parentComponent,
    style = { cardWidth: 20, cardHeight: 20 }
  ) {
    this.id = id;
    this.matchId = matchId;
    this.parentComponent = parentComponent;
    this.isFlipped = false;
    this.isMatched = false;
    this.style = style;

    this.render();
  }

  flip() {
    this.isFlipped = !this.isFlipped;
    const cardElement = document.querySelector(`.card[data-id="${this.id}"]`);
    cardElement.classList.toggle("flipped");
  }

  match() {
    this.isMatched = true;
    const cardElement = document.querySelector(`.card[data-id="${this.id}"]`);
    cardElement.classList.add("matched");
  }

  render() {
    const { cardWidth, cardHeight } = this.style;
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.style.width = cardWidth + "px";
    newCard.style.height = cardHeight + "px";
    newCard.dataset.id = this.id;
    newCard.dataset.match_id = this.matchId;
    newCard.innerHTML = `
                        <div class="front">${this.matchId}</div>
                        <div class="back"></div>
                      `;
    this.parentComponent.appendChild(newCard);
  }
}
