let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.defaultValue = color;
});

changeColor.addEventListener("change", async () => {
  let color = changeColor.value;
  chrome.storage.sync.set({ color });

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setNavbarBackgroundColor
  });
});

function setNavbarBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.querySelector('nav').style.backgroundColor = color;
  });
}