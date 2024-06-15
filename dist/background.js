chrome.action.onClicked.addListener((e=>{chrome.scripting.executeScript({target:{tabId:e.id},files:["contentScript.js"]})})),chrome.runtime.onMessage.addListener((function(e,s,t){if("hello"===e.greeting)t({farewell:"goodbye"});else{if("startup"===e.action){try{chrome.storage.sync.get(["focusData"]).then((e=>{const s=e.focusData;if(!s||s.currentGoal&&0===Object.keys(s.currentGoal).length){const e={currentGoal:{subtasks:[]},assessments:s&&s.assessments||{}};chrome.storage.sync.set({focusData:e}).then((()=>{t("onboarding")})).catch((e=>{t(e.message)}))}else t("returning")})).catch((e=>{t(e.message)}))}catch(e){t(e.message)}return!0}if("fetchGoals"===e.action)return chrome.storage.sync.get(["focusData"]).then((e=>{const s=(e.focusData||{}).currentGoal||{},a=s.name||"";s.subtasks,t({goal:a,subtasks})})),!0;if("appendCurrentGoal"===e.action){const{data:s}=e;return chrome.storage.sync.get(["focusData"]).then((e=>{const a=e.focusData||{};a.currentGoal={name:s},chrome.storage.sync.set({focusData:a}).then((()=>{t(a)}))})),!0}if("appendSubtasks"===e.action){const{data:s}=e;return console.log(s),chrome.storage.sync.get(["focusData"]).then((e=>{const a=e.focusData||{};a.currentGoal=a.currentGoal||{},a.currentGoal.subtasks=a.currentGoal.subtasks||[];for(let e=0;e<s.length;e++){let t={name:s[e],completed:!1,studynotes:null};a.currentGoal.subtasks.push(t)}chrome.storage.sync.set({focusData:a}).then((()=>{t(a)}))})),!0}if("appendAssessment"===e.action){const{weekKey:s,dayOfWeek:a,assessment:c}=e;return chrome.storage.sync.get(["focusData"]).then((e=>{const o=e.focusData||{};o.currentGoal=o.currentGoal||{},o.assessments=o.assessments||{},o.assessments[s]||(o.assessments[s]={}),o.assessments[s][a]||(o.assessments[s][a]=[]),o.assessments[s][a].push(c),chrome.storage.sync.set({focusData:o}).then((()=>{t(o)})).catch((e=>{t({error:e.message})}))})).catch((e=>{t({error:e.message})})),!0}if("clearGoal"===e.action)return chrome.storage.sync.get(["focusData"]).then((e=>{let s=e.focusData||{currentGoal:{}};s.currentGoal={},chrome.storage.sync.set({focusData:s}).then((()=>{t("cleared")})).catch((e=>{t({error:e.message})}))})).catch((e=>{t({error:e.message})})),!0}if("saveQuickNotes"===e.action){const{notes:s}=e;return chrome.storage.sync.set({quickNotes:s}).then((()=>{t({success:!0})})).catch((e=>{t({success:!1,error:e.message})})),!0}if("convertQuickNotes"===e.action){const{format:s}=e;return chrome.storage.sync.get(["quickNotes"]).then((e=>{const a=e.quickNotes||"";let c="";switch(s){case"doc":case"txt":c=`${a}`;break;case"pdf":c=`\n              <html>\n                <head>\n                  <title>Quick Notes</title>\n                  <style>\n                    body { font-family: Arial, sans-serif; }\n                  </style>\n                </head>\n                <body>${a}</body>\n              </html>\n            `;break;default:return void t({error:"Invalid format"})}const o=new Blob([c],{type:"pdf"===s?"application/pdf":`text/${s}`}),n=URL.createObjectURL(o);chrome.downloads.download({url:n,filename:`quicknotes.${s}`,conflictAction:"uniquify"}),t({success:!0})})).catch((e=>{t({success:!1,error:e.message})})),!0}}));