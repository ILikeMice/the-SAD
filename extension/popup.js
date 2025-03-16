chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "crank") {
        document.getElementById("crankprogress").value = request.value*100
        sendResponse({ farewell: "goodbye from background script" });
        console.log(request.value)
    }
    if (request.type === "humidity") {
        document.getElementById("humidityprogress").value = request.value*100
        sendResponse({ farewell: "goodbye from background script" });
        console.log(request.value)
    }
});