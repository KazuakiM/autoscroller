"use strict";

const intervalInput = document.getElementById("interval");

intervalInput.addEventListener("blur", function() {
  browser.storage.local.set({"intervalLS": intervalInput.value});
});

let autoscrollerOUI = {
  "updateUI": function(restoredSettings) {
    intervalInput.value = restoredSettings.intervalLS || "";
  },

  "onError": function(e) {
    console.error(e);
  }
};

browser.storage.local.get().then(autoscrollerOUI.updateUI, autoscrollerOUI.onError);
