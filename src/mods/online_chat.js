const chatSocket = new WebSocket("wss://vocapepper.com:9600") // Change this to your server address

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