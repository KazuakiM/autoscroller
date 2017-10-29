"use strict";

let autoscrollerBS = {
  "ls": browser.storage.local,
  "timmer": null,
  "interval": 10,

  "isInteger": function(value) {
    return Math.round(value) === value;
  },

  "checkLSData": function(lsData) {
    //{{{

    if (typeof lsData.intervalLS !== "undefined" && autoscrollerBS.isInteger(parseInt(lsData.intervalLS, 10))) {
      autoscrollerBS.interval = parseInt(lsData.intervalLS, 10);
    } else {
      autoscrollerBS.interval = (autoscrollerBS.isInteger(autoscrollerBS.interval)) ? autoscrollerBS.interval : 10;

      autoscrollerBS.ls.set({
        "intervalLS": autoscrollerBS.interval
      });
    }

    return autoscrollerBS.interval;
    //}}}
  },

  "stopTimmer": function(tabId) {
    //{{{
    clearInterval(autoscrollerBS.timmer);
    autoscrollerBS.timmer = null;

    browser.browserAction.setIcon({
      "tabId": tabId,
      "path": "img/dead.svg"
    });
    //}}}
  },

  "makeConnection": function(tab) {
    //{{{
    if (autoscrollerBS.timmer !== null) {
      autoscrollerBS.stopTimmer(tab.id);
    } else {
      browser.browserAction.setIcon({
        "tabId": tab.id,
        "path": "img/active.svg"
      });

      browser.tabs.sendMessage(tab.id, {}).then(function() {
        autoscrollerBS.useMessage(tab.id);
      }).catch(function() {
        let errorCnt = 0
        clearInterval(autoscrollerBS.timmer);
        autoscrollerBS.timmer = setInterval(function() {
          if (errorCnt < 10) {
            browser.tabs.sendMessage(tab.id, {}).then(function() {
              autoscrollerBS.useMessage(tab.id);
            }).catch(function() {
              ++errorCnt;
            });
          } else {
            autoscrollerBS.stopTimmer(tab.id);
          }
        }, 2000);
      });
    }
    //}}}
  },

  "useMessage": function(tabId) {
    //{{{
    clearInterval(autoscrollerBS.timmer);
    autoscrollerBS.timmer = setInterval(function() {
      browser.tabs.sendMessage(tabId, {});
    }, autoscrollerBS.ls.get().then(autoscrollerBS.checkLSData, autoscrollerBS.onLSError));
    //}}}
  },

  "onLSError": function() {
    return 10;
  }
};

browser.browserAction.onClicked.addListener(autoscrollerBS.makeConnection);
