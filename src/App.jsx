// App.jsx
// Modern React single-file app for an AI chat interface integrated with external APIs using axios.
// Default export is the App component. Uses Tailwind CSS for styling.
// To run: create a new Vite or CRA project, add Tailwind and axios, then replace src/App.jsx with this file.

import React, { useEffect, useRef, useState } from "react";
import {
  createConversationAPI,
  getAllConversationAPI,
  getConversationAPI,
} from "./api";
import LeftSide from "./components/LeftSide";
import MainChat from "./components/MainChat";
import RightSide from "./components/RightSide";

export default function App() {
  const [conversations, setConversations] = useState([]);

  const [activeConvId, setActiveConvId] = useState(null);

  const [apiError, setApiError] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const activeConv =
    conversations.find((c) => c.session_id === activeConvId) || null;

  // Get all conversations after the page initially loads
  useEffect(() => {
    async function fetchConversations() {
      try {
        const convs = await getAllConversationAPI();
        setConversations(convs);
        // setActiveConvId(convs[0]?.session_id || null);
      } catch (error) {
        console.error("API error:", error);
        setApiError(error.message);
      }
    }
    fetchConversations();
  }, []);

  // Smooth scrolling when conversation loads or change
  useEffect(() => {
    inputRef.current?.focus();
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConvId, conversations]);

  function handleAddUserMessage(inputValue) {
    const userMsg = {
      data: {
        role: "user",
        additional_kwargs: {},
        blocks: [
          {
            block_type: "text",
            text: inputValue,
          },
        ],
      },
      created_at: Date.now(),
      message_id: "",
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.session_id === activeConv.session_id) {
          return {
            ...c,
            messages: [...c.messages, userMsg],
            last_active_at: Date.now(),
          };
        }
        return c;
      })
    );
  }

  function handleAddAgentMessage(replyText) {
    console.log(replyText);
    
    const assistantMsg = {
      data: {
        role: "assistant",
        additional_kwargs: {},
        blocks: [
          {
            block_type: "text",
            text: replyText,
          },
        ],
      },
      created_at: Date.now(),
      message_id: "",
    };

    
    setConversations((prev) =>
      prev.map((c) => {
        if (c.session_id === activeConv.session_id) {
          return {
            ...c,
            messages: [...c.messages, assistantMsg],
            last_active_at: Date.now(),
          };
        }
        return c;
      })
    );

    // setTimeout(
    //   () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
    //   100
    // );
  }

  async function handleSelectConversation(session_id) {
    try {
      const conv = await getConversationAPI(session_id);
      // console.log(conv);
      setConversations((prev) =>
        prev.map((c) => (c.session_id == session_id ? conv : c))
      );
      setActiveConvId(session_id);
    } catch (error) {
      console.error("API error:", error);
      setApiError(error.message);
    }
  }

  async function handleCreateConversation() {
    const newConv = {
      title: "New conversation",
    };
    try {
      const newConversation = await createConversationAPI(newConv);
      setConversations((prev) => [newConversation, ...prev]);
      setActiveConvId(newConversation.session_id);
    } catch (error) {
      console.error("API error:", error);
      setApiError(
        error.message || "Sorry, there was an error contacting the API."
      );
    }
  }

  function handleError(error) {
    setApiError(
      error || "Sorry, there was an error contacting the API."
    );
  }

  return (
    <div className="h-screen w-screen bg-gray-50 text-gray-900 flex">
      {/* Left Sidebar */}
      <LeftSide
        conversations={conversations}
        activeConvId={activeConvId}
        onSelect={handleSelectConversation}
        onCreate={handleCreateConversation}
      />

      {/* Main Chat */}
      <MainChat
        // key={activeConvId}
        activeConv={activeConv}
        onAddUserMessage={handleAddUserMessage}
        onAddAgentMessage={handleAddAgentMessage}
        apiError={apiError}
        onError={handleError}
        // isSending={isSending}
        inputRef={inputRef}
        messagesEndRef={messagesEndRef}
      />

      {/* Right Sidebar */}
      {/* <RightSide activeConv={activeConv} /> */}
    </div>
  );
}
