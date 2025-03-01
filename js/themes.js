
document.addEventListener("DOMContentLoaded", () => {
  const themes = document.querySelector("#themes");
  const themesPlaceholder = themes.querySelector("#themes-placeholder");
  const themesItems = themes.querySelectorAll(".theme");
  const possibleThemes = Array.from(themesItems).map(item => item.dataset.value);

  document.body.classList.add("theme-dark");

  themesItems.forEach(item => {
    item.addEventListener("click", () => {
      document.body.classList.remove(...possibleThemes);
      document.body.classList.add(item.dataset.value);
    });
  });

  let open = false;

  themes.addEventListener("click", () => {
    if(open) closeSelector();
    else openSelector();
  });

  function openSelector() {
    themesPlaceholder.classList.add("hidden");
    themesItems.forEach(item => item.classList.remove("hidden"));
    open = true;
  }

  function closeSelector() {
    themesPlaceholder.classList.remove("hidden");
    themesItems.forEach(item => item.classList.add("hidden"));
    open = false;
  }
});
