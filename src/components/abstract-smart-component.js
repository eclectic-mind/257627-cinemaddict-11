import AbstractComponent from "./abstract-component.js";

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  reRender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    newElement.scrollTop = oldElement.scrollTop;

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}
