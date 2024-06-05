chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['contentScript.js']
    });
  });

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.greeting === "hello")
      sendResponse({farewell: "goodbye"});
    if (request.action === "appendStorage") {
      const { key, value } = request;
      chrome.storage.sync.get(["focusData"]).then((result)=>{
        const existingData = result.focusData || {};
        existingData[key] = value;
        chrome.storage.sync.set({ focusData: existingData }).then(() => {
          sendResponse(existingData)
        })
        ;})
    // Return true to indicate you want to send a response asynchronously
      return true;
      }
  
    if (request.action === "getStorage") {
      chrome.storage.sync.get(["focusData"]).then((result)=>{sendResponse(result.focusData);})
    // Return true to indicate you want to send a response asynchronously
    return true;
  }  
  }
);


  