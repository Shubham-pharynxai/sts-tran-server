const WebSocket = require('ws');

let runpodSocket;
let savedUrl;
let reconnectInterval;
let intervalRef;

const randomId = Math.floor(Math.random() * 10000);
const roomId = `RoomId-${Math.floor(Math.random() * 10000)}`;
console.log(`[RunPod] Assigned Random ID: ${randomId} , "roomId ${roomId}`);


function connectToRunpod(url) {
  // Store URL on first call
  if (url) savedUrl = url;

  if (!savedUrl) {
    throw new SyntaxError("Missing WebSocket URL");
  }

  runpodSocket = new WebSocket(savedUrl);

  runpodSocket.on('open', (ws) => {
    console.log('[RunPod] ✅ Connected');
    clearInterval(reconnectInterval); // Stop retrying once connected
    runpodSocket.send(JSON.stringify({
        type: 'connect',
        meeting_id: roomId,
        client_id: randomId,
        source_language: "hin",
        mode: "speech_to_speech",
        mulaw: false
      }));
    
  });

  runpodSocket.on('message', (msg) => {

    console.log('[RunPod] 📥 Message:', msg.toString());
    // Broadcast to local clients if needed
    const data = JSON.parse(msg.toString());
      console.log("onMessage", data);
      const { type } = data;

      if (type === "connection_established") {
        runpodSocket.send(JSON.stringify({
          type: 'inference',
          meeting_id: roomId,
          client_id: randomId,
          source: "hin",
          text: "connection",
          mulaw: false
        }))
        console.log("connection established");
      }

      if (type === 'waiting') {
       console.log("waiting before interval");
        // intervalRef = setInterval(() => {
        //   runpodSocket.send(JSON.stringify({
        //     type: 'inference',
        //     meeting_id: roomId,
        //     client_id: randomId,
        //     source: "hin",
        //     test: "connection",
        //     mulaw: false
        //   }));
        // }, 2000);

        console.log("waiting after interval");

      }

      else if (type === 'meeting_ready') {
        //document.getElementById("autoplay-trigger")?.click();
        // document.getElementById("startTalkingButton")?.click();
        //setDetail(data)
        if (intervalRef) {
          clearInterval(intervalRef);
          //intervalRef.current = null;
        }
        console.log("Meeting Ready");
      
      }

  });

  runpodSocket.on('close', () => {
    console.log('[RunPod] ❌ Connection closed');
   
  });

  runpodSocket.on('error', (err) => {
    console.error('[RunPod] ⚠️ Error: Retrying 3 sec...', err.message);
     if (!reconnectInterval) {
      reconnectInterval = setInterval(() => {
        console.log('[RunPod] 🔁 Retrying connection...');
        connectToRunpod(savedUrl); // Use saved URL
      }, 3000);
    }
  });
}

function getRunpodSocket() {
  return runpodSocket;
}

module.exports = {
  connectToRunpod,
  getRunpodSocket,
};
