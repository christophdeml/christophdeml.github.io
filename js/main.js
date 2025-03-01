const LETTER_DELAY = 50;
const WORD_DELAY = 1000;

const FIRST_GREETINGS = [
  "Hi!",
  "I'm happy you made it here",
  "Welcome to my website :)",
  "I am Chris",
  "How do you want to continue?",
];

const WELCOME_BACK_GREETINGS = [
  "Welcome back!",
  "How do you want to continue?",
];

const hasVisited = !!localStorage.getItem("visited");
localStorage.setItem("visited", "true");
if (hasVisited) {
  showInvisibleElements('#actions', 'header', 'footer');
}

document.addEventListener('DOMContentLoaded', async () => {
  await showTextAnimation(hasVisited ? WELCOME_BACK_GREETINGS : FIRST_GREETINGS);
  showInvisibleElements('#actions', 'header', 'footer');
});

async function showTextAnimation(greetings) {
  async function print(domNode, text) {
    await text.split("").reduce(async (previous, letter) => {
      await previous;
      domNode.innerHTML += letter;
      return new Promise(resolve => setTimeout(resolve, LETTER_DELAY));
    }, Promise.resolve());
  }

  const currentText = document.querySelector('#current-text');

  setTimeout(() => {
  }, 1000);

  await greetings
    .reduce(async (previous, greeting) => {
      await previous;
      currentText.innerHTML = "";
      await print(currentText, greeting);
      return new Promise(resolve => setTimeout(resolve, WORD_DELAY));
    }, Promise.resolve());
}

function showInvisibleElements(...selectors) {
  selectors.forEach(selector => {
    document.querySelector(selector).classList.remove('invisible');
  });
}