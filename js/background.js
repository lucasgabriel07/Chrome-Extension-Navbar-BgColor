let color = '#00A470';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
});