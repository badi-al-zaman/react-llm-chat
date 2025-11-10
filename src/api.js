import axios from "axios";

const API_URL = "http://localhost:8000";

async function chat_with_ai(prompt, session_id) {
  const response = await axios.post(
    `${API_URL}/v1/chat/${session_id}`,
    null,
    {
      headers: { "Content-Type": "application/json" },
      params: {
        query: prompt,
      },
    }
  );
  console.log(response.data);
  
  return response.data.response || "No response from API.";
}

// Conversation Management APIs
async function createConversationAPI(session) {
  const response = await axios.post(
    `${API_URL}/sessions`,
    JSON.stringify(session),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

async function getConversationAPI(session_id) {
  const response = await axios.get(`${API_URL}/sessions/${session_id}`, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

async function deleteConversationAPI(session) {
  const response = await axios.delete(`${API_URL}/sessions/${session.id}`, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

async function getAllConversationAPI() {
  const response = await axios.get(`${API_URL}/sessions/`, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  
  return response.data.data;
}

export {
  chat_with_ai,
  createConversationAPI,
  deleteConversationAPI,
  getConversationAPI,
  getAllConversationAPI,
};
