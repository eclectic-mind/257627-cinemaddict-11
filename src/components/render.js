import {createElement} from '../utils.js';

export const RenderPositionS = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderS = (container, element, place) => {
  switch (place) {
    case RenderPositionS.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPositionS.BEFOREEND:
      container.append(element);
      break;
  }
};
