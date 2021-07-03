document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);


function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
      close_regex: document.querySelector("#close_regex").value,
      reload_regex: document.querySelector("#reload_regex").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
      document.querySelector("#close_regex").value = result.close_regex || "Request blocked";
  }
    function setCurrentChoice2(result) {
        document.querySelector("#reload_regex").value = result.reload_regex || "Request blocked";
    }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("close_regex");
    getting.then(setCurrentChoice, onError);

  var getting2 = browser.storage.local.get("reload_regex");
    getting2.then(setCurrentChoice2, onError);
}
