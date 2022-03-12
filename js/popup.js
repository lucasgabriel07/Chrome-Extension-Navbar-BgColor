let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.defaultValue = color;
});

changeColor.addEventListener("input", async () => {
  let color = changeColor.value;

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setNavbarBackgroundColor,
    args: [color]
  });
});

changeColor.addEventListener("change", async () => {
  let color = changeColor.value;
  chrome.storage.sync.set({ color });
});

function setNavbarBackgroundColor(color) {
  chrome.storage.sync.get("color", () => {
    document.querySelector('nav').style.backgroundColor = color;
  });
}