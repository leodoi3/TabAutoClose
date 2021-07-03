
function checkAndCloseTab(tabId, changeInfo, tab) {
  console.log("checkAndCloseTab");
  browser.storage.local.get("close_regex").then(checkRegex);

  function checkRegex(result) {
    console.log(result);
    var patt = new RegExp(result.close_regex);
    if (result.close_regex && result.close_regex.length > 0 && tab && patt.test(tab.title)) {
      chrome.tabs.remove(tabId);
    }
  }
}
function handleClick() {
    browser.runtime.openOptionsPage();
}



 function checkAndReloadTab(tabId, changeInfo, tab) {
    console.log("checkAndReloadTab");
     browser.storage.local.get("reload_regex").then(checkRegex);

    async function checkRegex(result) {
        console.log(result);
        var patt = new RegExp(result.reload_regex);
        if (result.reload_regex && result.reload_regex.length > 0 && tab && patt.test(tab.title) && changeInfo.status == 'complete') {
     //       var allTabs = (await browser.tabs.query({})).length
       //     console.log("tab length: "+allTabs);
        //    await new Promise(r => setTimeout(r, 1000 * allTabs));
                chrome.tabs.reload(tabId);
           
        }
    }
}

// listen to tab URL changes
chrome.tabs.onUpdated.addListener(checkAndCloseTab);
chrome.tabs.onUpdated.addListener(checkAndReloadTab);
//Object.addListener('load',checkAndReloadTab );
//document.addEventListener('DOMContentLoaded', checkAndReloadTab, false);
//chrome.webRequest.onCompleted.addListener(checkAndReloadTab);
//chrome.tabs.webNavigation.onCompleted.addListener(checkAndReloadTab);
//chrome.tabs.webNavigation.onCompleted(checkAndReloadTab);


// update when the extension loads initially
checkAndCloseTab();
checkAndReloadTab();

browser.browserAction.onClicked.addListener(handleClick);