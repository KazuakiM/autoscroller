"use strict";

let autoscrollerCS = {
  "listenMessage": function() {
    window.scrollBy(0, 1);
  }
};

browser.runtime.onMessage.addListener(autoscrollerCS.listenMessage);
