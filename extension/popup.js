(() => {
  // extension/popup.ts
  var crank_meter = document.getElementById("crank");
  var humidity_meter = document.getElementById("humidity");
  var distance_meter = document.getElementById("distance");
  chrome.runtime.onMessage.addListener((data) => {
    const message = JSON.parse(data);
    console.log(message);
    if (message.type === "crank") {
      document.getElementById("crank").value = message.value / 2e3;
    }
    if (message.type === "humidity") {
      document.getElementById("humidity").value = message.value;
    }
    if (message.type === "distance") {
      document.getElementById("distance").value = message.value;
    }
  });
})();
