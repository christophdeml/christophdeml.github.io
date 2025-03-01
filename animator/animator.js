const ANIMATOR_DEFAULTS = {
  DELAY: 1000,
  DURATION: 1000,
  AFTER: ""
}

const animationEventManager = {
  listeners: new Map(),
  subscribe: (triggerId, handler) => {
    if (!animationEventManager.listeners.has(triggerId)) {
      animationEventManager.listeners.set(triggerId, []);
    }
    animationEventManager.listeners.get(triggerId).push(handler);
  },
  publish: (triggerId) => {
    if (!animationEventManager.listeners.has(triggerId)) {
      return;
    }
    animationEventManager.listeners.get(triggerId).forEach(handler => handler());
  }
}

const ACTIONS = new Map([
  ["appear", (domNode) => domNode.classList.add("animation-appear")],
  ["appear-disappear", (domNode) => domNode.classList.add("animation-appear-disappear")]
]);

function animate(element) {
  const action = element.getAttribute("animator-action");
  const delay = element.getAttribute("animator-delay") || ANIMATOR_DEFAULTS.DELAY;
  const duration = element.getAttribute("animator-duration") || ANIMATOR_DEFAULTS.DURATION;
  element.style.setProperty("--animation-duration", duration + "ms");
  setTimeout(() => {
    const func = ACTIONS.get(action);
    func(element);
    animationEventManager.publish(element.id);
    afterAnimation(element);
  }, delay);
}

function afterAnimation(element) {
  const after = element.getAttribute("animator-after");
  if (!after) {
    return;
  }
  if (!element.id) element.id = element.parentElement.id + "-" + Array.from(element.parentElement.childNodes).indexOf(element);
  animationEventManager.subscribe(element.id, () => element.classList.add(after));
}

document.addEventListener("DOMContentLoaded", () => {
  const elements = Array.from(document.querySelectorAll(".animator-element"));
  const autoAnimatedElements = elements.filter(element => !element.hasAttribute("animator-trigger"));
  const triggeredElements = elements.filter(element => element.hasAttribute("animator-trigger"));

  triggeredElements.forEach(element => {
    const triggerId = element.getAttribute("animator-trigger");
    animationEventManager.subscribe(triggerId, () => animate(element));
  });

  autoAnimatedElements.forEach(element => animate(element));
});