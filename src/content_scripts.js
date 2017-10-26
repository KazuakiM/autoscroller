"use strict";

browser.runtime.onMessage.addListener(function() {
  window.scrollBy(0, 1)
});
