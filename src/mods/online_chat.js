const chatSocket = new WebSocket("wss://vocapepper.com:9601"); // Change this to your server address

let lastPingTimestamp = 0;
let pingInterval = null;

function updatePingDisplay(ms) {
    const el = document.getElementById("pingDisplay");
    if (el) el.textContent = `Ping: ${ms} ms`;
}

// Send a ping every 5 seconds
function startPing() {
    if (pingInterval) clearInterval(pingInterval);
    pingInterval = setInterval(() => {
        if (chatSocket.readyState === WebSocket.OPEN) {
            lastPingTimestamp = Date.now();
            chatSocket.send("__ping__");
        }
    }, 5000);
}

chatSocket.onopen = function(event) {
    isSocketConnected = true;
    console.log("Connected to server.");
    startPing();
};

chatSocket.onclose = function(event) {
    isSocketConnected = false;
    console.log("Disconnected from server.");
    updatePingDisplay("--");
    if (pingInterval) clearInterval(pingInterval);
};

chatSocket.onerror = function(event) {
    console.error("Connection error occurred!", event);
    updateBattleLog("<span class='action'>Connection error occurred!</span>");
    render();
};

chatSocket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    // Handle ping response
    if (data.message === "__pong__") {
        const latency = Date.now() - lastPingTimestamp;
        updatePingDisplay(latency);
        return;
    }
    console.log(`${data.timestamp} ${data.message}`);
    updateBattleLog(`<span class='chat'>${data.message}</span>`);
};