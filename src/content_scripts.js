"use strict";

let autoscrollerCS = {
  "listenMessage": function(message) {
    //{{{
    window.scrollBy(0, 100);
    //}}}
  }
};

browser.runtime.onMessage.addListener(autoscrollerCS.listenMessage);
