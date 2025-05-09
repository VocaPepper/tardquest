 // Touch Controls
 function resetGame() {
    window.location.reload();
}

function openControl(getID)
{
    const element = document.getElementById(getID);
    if (!element) return;
    element.style.visibility = "visible";
}
function closeControl(getID)
{
    const element = document.getElementById(getID);
    if (!element) return;
    element.style.visibility = "hidden";
}

// Online functionality, in alpha stages.
//const chatSocket = new WebSocket("wss://127.0.0.1:1233")

chatSocket.onopen = function(event) {
    isSocketConnected = true;
    console.log("Connected to server.")
}

chatSocket.onclose = function(event) {
    isSocketConnected = false;
    console.log("Disconnected from server.");
};

chatSocket.onerror = function(event) {
    console.error("Connection error occurred!", event);
    updateBattleLog("<span class='action'>Connection error occurred!</span>");
    render();
};

chatSocket.onmessage = function(event) {
const data = JSON.parse(event.data);
console.log(`${data.timestamp} ${data.message}`);
updateBattleLog(`<span class='chat'>${data.message}</span>`);
};