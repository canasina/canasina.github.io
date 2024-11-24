const apiKey = "sk-svcacct-28lU-Gk63v6xOP_jDXj12TexLrqm-AC-t4OugXX6IpLE3HCp3pEvVxIPV_m8MT3BlbkFJMxVvTJwfGCG2tNntj3cGCIuzXkiPJXoOxJ5EIql09TXB3s6Olm8pc3p7mGmCwA";


document.getElementById("send-button").addEventListener("click", () => {
  const userInput = document.getElementById("user-input").value;
  if (!userInput.trim()) return;

  addMessage(userInput, "user-message");
  document.getElementById("user-input").value = "";

  fetchBotResponse(userInput);
});

function addMessage(text, className) {
  const messageElement = document.createElement("div");
  messageElement.className = `message ${className}`;
  messageElement.textContent = text;
  document.getElementById("messages").appendChild(messageElement);
  document.getElementById("chat-box").scrollTop = document.getElementById("chat-box").scrollHeight;
}

async function fetchBotResponse(userInput) {
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: userInput,
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const botResponse = data.choices[0].text.trim();
    addMessage(botResponse, "bot-message");
  } catch (error) {
    console.error("API hatası:", error);
    addMessage("Bir hata oluştu. Lütfen tekrar deneyin.", "bot-message");
  }
}

