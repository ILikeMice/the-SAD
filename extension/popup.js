(() => {
  // extension/popup.ts
  var crank_meter = document.getElementById("crank");
  var humidity_meter = document.getElementById("humidity");
  var distance_meter = document.getElementById("distance");
  var websocket = new WebSocket("ws://localhost:8000");
  websocket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "crank") {
      crank_meter.value = 100 - message.value * 100;
    }
    if (message.type === "humidity") {
      humidity_meter.value = message.value;
    }
    if (message.type === "distance") {
      distance_meter.value = message.value / 10;
    }
  });
})();
