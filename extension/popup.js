(() => {
  // extension/popup.ts
  var websocket = new WebSocket("ws://localhost:8000");
  var crank_meter = document.getElementById("crank");
  var humidity_meter = document.getElementById("crank");
  var distance_meter = document.getElementById("crank");
  websocket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "crank") {
      crank_meter.value = message.value / 2e3;
    }
    if (message.type === "humidity") {
      humidity_meter.value = message.value;
    }
    if (message.type === "distance") {
      distance_meter.value = message.value;
    }
  });
})();
