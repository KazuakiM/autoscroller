"use strict";

let autoscrollerBS = {
  "ls": browser.storage.local,
  "timmer": null,
  "interval": 10,

  "checkStoredSettings": function(storedSettings) {
    //{{{
    if (!storedSettings.intervalLS) {
      autoscrollerBS.ls.set({
        "intervalLS": autoscrollerBS.interval
      });
    } else {
      autoscrollerBS.interval = storedSettings.intervalLS;
    }

    return autoscrollerBS.interval;
    //}}}
  },

  "sendMessage": function(tab) {
    //{{{
    clearInterval(autoscrollerBS.timmer);

    if (autoscrollerBS.timmer !== null) {
      //TODO: アイコン?
      autoscrollerBS.timmer = null;

    } else {
      //TODO: アイコン?

      autoscrollerBS.timmer = setInterval(function() {
        browser.tabs.sendMessage(tab.id, {});
      }, autoscrollerBS.ls.get().then(autoscrollerBS.checkStoredSettings, autoscrollerBS.onLSError));
    }
    //}}}
  },

  "onLSError": function(e) {
    return autoscrollerBS.interval;
  }
};

browser.browserAction.onClicked.addListener(autoscrollerBS.sendMessage);
