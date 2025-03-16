(() => {
  // extension/popup.ts
  var crank_meter = document.getElementById("crank");
  var humidity_meter = document.getElementById("humidity");
  chrome.runtime.onMessage.addListener((data) => {
    const message = JSON.parse(data);
    console.log(message);
    if (message.type === "crank") {
      document.getElementById("crank").value = message.value * 100;
    }
    if (message.type === "humidity") {
      document.getElementById("humidity").value = message.value;
    }
    if (message.type === "distance") {
      document.getElementById("distance").value = message.value / 10;
    }
  });
})();
