(() => {
  // extension/popup.ts
  var crank_meter = document.getElementById("crank");
  var humidity_meter = document.getElementById("humidity");
  var distance_meter = document.getElementById("distance");
  chrome.runtime.onMessage.addListener((data) => {
    const message = JSON.parse(data);
    if (message.type === "crank") {
      crank_meter.value = 100 - message.value * 100;
    }
    if (message.type === "humidity") {
      humidity_meter.value = message.value;
    }
    if (message.type === "distance") {
      distance_meter.value = message.value;
    }
  });
})();
