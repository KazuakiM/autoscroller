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
      //TODO: アイコン?
      autoscrollerBS.timmer = null;

    } else {
      //TODO: アイコン?

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
