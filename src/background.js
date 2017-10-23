"use strict";

let autoscrollerBS = {
  "status": false,
  "timmer": null,

  "sendMessage": function(tab) {
    autoscrollerBS.status = !autoscrollerBS.status;
    if (autoscrollerBS.status === false && autoscrollerBS.timmer != null) {
      clearInterval(autoscrollerBS.timmer);
      autoscrollerBS.timmer = null;

    } else {
      clearInterval(autoscrollerBS.timmer);
      autoscrollerBS.timmer = setInterval(function() {
        browser.tabs.sendMessage(tab.id, {
          'status': autoscrollerBS.status
        });
      }, 500);
    }
  },
};
browser.browserAction.onClicked.addListener(autoscrollerBS.sendMessage);
