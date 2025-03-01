
document.addEventListener("DOMContentLoaded", () => {
  const themes = document.querySelector("#themes");
  const button = themes.querySelector("span");
  const initialNode = button.cloneNode(true);

  const selector = createSelector();
  button.addEventListener("click", () => openSelector());

  function openSelector() {
    themes.innerHTML = selector.innerHTML;
  }

  function closeSelector() {
    themes.innerHTML = initialNode.innerHTML;
  }

  function createSelector() {
    const div = document.createElement("div");
    div.classList.add("themes");
    ["green", "blue", "red", "yellow"].forEach(theme => {
      const btn = document.createElement("span");
      btn.classList.add("theme");
      btn.innerText = theme;
      btn.addEventListener("click", () => {
        closeSelector();
      });
      div.appendChild(btn);
    });
    return div;
  }
});
