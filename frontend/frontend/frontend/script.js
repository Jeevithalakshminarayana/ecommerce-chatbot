const backendBase = 
"http://127.0.0.1:8000";
function addToChat(message, sender){
    const box =
    document.getElementById("chat-box");
    const msg =
    document.createElement("div");
    msg.textContent = '${sender}: ${message}';
    msg.style.marginBottom = "10px";
    msg.style.fontWeight = sender === "Bot" ?
    "bold" : "normal";
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}
function handleKeyPress(event){
    if (event.key === "Enter"){
        sendMessage();
    }
}
