const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

function addMessage(content, sender) {
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;
  msg.innerText = content;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  userInput.value = '';
  addMessage('Typing...', 'bot');

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();

    chatbox.lastChild.remove();
    addMessage(data.choices?.[0]?.message?.content?.trim() || 'No response', 'bot');
  } catch (error) {
    chatbox.lastChild.remove();
    addMessage("⚠️ Something went wrong", 'bot');
    console.error(error);
  }
}

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

