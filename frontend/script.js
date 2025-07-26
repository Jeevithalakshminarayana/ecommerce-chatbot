const backendBase = "http://127.0.0.1:8000"; // change if deployed

function addToChat(message, sender) {
  const box = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.textContent = `${sender}: ${message}`;
  msg.style.marginBottom = "10px";
  msg.style.fontWeight = sender === "Bot" ? "bold" : "normal";
  box.appendChild(msg);
  box.scrollTop = box.scrollHeight;
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

async function sendMessage() {
  const input = document.getElementById("user-input");
  const userText = input.value.trim();
  if (!userText) return;

  addToChat(userText, "You");
  input.value = "";

  let responseText = "Sorry, I didn’t understand that.";

  if (userText.includes("top") && userText.includes("sold")) {
    const res = await fetch(`${backendBase}/top-products`);
    const data = await res.json();
    responseText = "Top 5 Products:\n" + data.map(p => `• ${p.name} (${p.units_sold} sold)`).join("\n");
  }

  else if (userText.includes("status") && userText.match(/\d+/)) {
    const orderId = userText.match(/\d+/)[0];
    const res = await fetch(`${backendBase}/order-status/${orderId}`);
    const data = await res.json();
    responseText = data.status
      ? `Status of order ${orderId}: ${data.status}`
      : "Order not found.";
  }

  else if (userText.includes("how many") && userText.toLowerCase().includes("left")) {
    const productMatch = userText.match(/(?:stock of|how many|left in stock)?\s*(.+?)(?:\?|$)/i);
    const productName = productMatch ? productMatch[1].replace(/left in stock|\?/gi, '').trim() : "";
    const res = await fetch(`${backendBase}/product-stock?product_name=${encodeURIComponent(productName)}`);
    const data = await res.json();
    responseText = data.stock !== undefined
      ? `${productName} stock: ${data.stock}`
      : "Product not found.";
  }

  addToChat(responseText, "Bot");
}