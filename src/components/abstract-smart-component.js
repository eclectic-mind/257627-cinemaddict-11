import AbstractComponent from './abstract-component.js';

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    const scrollPosition = oldElement.scrollTop;
    parent.replaceChild(newElement, oldElement);
    newElement.scrollTop = scrollPosition;
    this.recoveryListeners();
  }

}
