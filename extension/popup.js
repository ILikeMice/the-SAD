(() => {
  // extension/popup.ts
  var crank_meter = document.getElementById("crank");
  var humidity_meter = document.getElementById("humidity");
  chrome.runtime.onMessage.addListener((data) => {
    const message = JSON.parse(data);
    console.log(message);
    if (message.type === "crank") {
      crank_meter.value = message.value / 2e3;
    }
    if (message.type === "humidity") {
      humidity_meter.value = message.value;
    }
  });
})();
