chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['contentScript.js']
    });
  });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting === "hello")
      sendResponse({farewell: "goodbye"});
    if (message.action === "setStorage") {
      chrome.storage.local.set(message.data, () => {
        if (chrome.runtime.lastError) {
          sendResponse({ success: false, error: chrome.runtime.lastError });
        } else {
          sendResponse({ success: true, message: "Value was set" });
        }
      });
      // Return true to indicate you want to send a response asynchronously
      return true;
    }  
  }
);

  // chrome.storage.session.set({ key: value }).then(() => {
  //   console.log("Value was set");
  // });
  
  // chrome.storage.session.get(["key"]).then((result) => {
  //   console.log("Value is " + result.key);
  // });
  