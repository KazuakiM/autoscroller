"use strict";

let autoscrollerBS = {
  "ls": browser.storage.local,
  "timmer": null,
  "interval": 10,

  "checkLSData": function(lsData) {
    //{{{

    if (typeof lsData.intervalLS !== "undefined" && Math.round(parseInt(lsData.intervalLS, 10)) === parseInt(lsData.intervalLS, 10)) {
      autoscrollerBS.interval = parseInt(lsData.intervalLS, 10);
    } else {
      autoscrollerBS.interval = (Math.round(autoscrollerBS.interval) === autoscrollerBS.interval) ? autoscrollerBS.interval : 10;
      autoscrollerBS.ls.set({
        "intervalLS": autoscrollerBS.interval
      });
    }

    return autoscrollerBS.interval;
    //}}}
  },

  "sendMessage": function(tab) {
    //{{{
    clearInterval(autoscrollerBS.timmer);

    if (autoscrollerBS.timmer !== null) {
      browser.browserAction.setIcon({
        "tabId": tab.id,
        "path": "img/dead.svg"
      });

      autoscrollerBS.timmer = null;

    } else {
      browser.browserAction.setIcon({
        "tabId": tab.id,
        "path": "img/active.svg"
      });

      autoscrollerBS.timmer = setInterval(function() {
        browser.tabs.sendMessage(tab.id, {});
      }, autoscrollerBS.ls.get().then(autoscrollerBS.checkLSData, autoscrollerBS.onLSError));
    }
    //}}}
  },

  "onLSError": function(e) {
    return 10;
  }
};

browser.browserAction.onClicked.addListener(autoscrollerBS.sendMessage);
