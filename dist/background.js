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

    if (request.action === "getStorage") {
      try {
        chrome.storage.sync.get(["focusData"]).then((result) => {sendResponse(result.focusData)})
      } catch {
        chrome.storage.sync.set({ "focusData" : { currentGoal: { "subtasks" : [] } } }).then((result) => {sendResponse(result.focusData)})
      }      
    return true;
    }

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
    if (request.action === "appendCurrentGoal") {
      const { data } = request;

      chrome.storage.sync.get(["focusData"]).then((result)=>{
        const existingData = result.focusData || {};
        existingData["currentGoal"] = {"name": data};
        chrome.storage.sync.set({ focusData: existingData }).then(() => {
          sendResponse(existingData)
        })
        ;})
      return true;
      }

    if (request.action === "appendSubtasks") {
      const { data } = request;
      console.log(data)

      chrome.storage.sync.get(["focusData"]).then((result)=>{
        const existingData = result.focusData || {};
        existingData.currentGoal = existingData.currentGoal || {};
        existingData.currentGoal["subtasks"] = existingData.currentGoal["subtasks"] || [];
        for (let i = 0; i < data.length; i++) {
          let subtask = {
            name: data[i],
            completed: false,
            studynotes: null,
            emoji: null,
            reflection: null,
            timestart: null,
            timeend: null
          }
          existingData.currentGoal["subtasks"].push(subtask)
        }
        chrome.storage.sync.set({ focusData: existingData }).then(() => {
          sendResponse(existingData)
        })
        ;})
      return true;
      }
  
    
  }
);


  