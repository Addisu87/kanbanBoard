export default class Item {
  constructor(id, content) {
    this.elements = {};
    this.element.root = Item.createRoot();
    this.elements.input = this.elements.root.querySelector(
      '.kanban__item-input'
    );

    this.elements.root.dataset = id;
    this.elements.input.textContent = content;
    this.content = content;
  }

  static createRoot() {
    const range = document.createRange();
    range.selectNode(document.body);

    return range.createContextualFragment(`
      <div class="kanban__item" draggable="true">
          <div class="kanban__item-input" contenteditable></div>
      </div> 
    `).children[0];
  }
}
