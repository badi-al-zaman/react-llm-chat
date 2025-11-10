import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chat_with_ai } from "../api";

const MainChat = ({
  activeConv,
  onAddUserMessage,
  onAddAgentMessage,
  apiError,
  onError,
  messagesEndRef,
  inputRef,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSend() {
    let user_message = inputValue.trim();
    if (!user_message || !activeConv) return;
    onAddUserMessage(user_message);
    setInputValue("");
    setIsSending(true);

    let replyText;
    try {
      replyText = await chat_with_ai(user_message, activeConv.session_id);
      onAddAgentMessage(replyText);
      setIsSending(false);
    } catch (error) {
      console.error("API error:", error);
      onError(error.message);
      setIsSending(false);
      return;
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && !isSending) {
      handleSend();
    }
  }

  return (
    <main className="flex-1 flex flex-col">
      <header className="border-b border-gray-200 p-4 bg-white flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {activeConv?.title || "Select a conversation or create new one"}
          </h3>
          <div className="text-xs text-gray-500">
            {activeConv
              ? `${
                  activeConv.messages ? activeConv.messages.length : 0
                } messages`
              : "No conversation selected"}
          </div>
        </div>
        {apiError && (
          <div className="text-xs text-red-500">API Error: {apiError}</div>
        )}
      </header>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto p-6" id="chat-scroll">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence initial={false} mode="popLayout">
              {activeConv?.messages?.map((msg, index) => {
                if (
                  msg.data.role === "user" ||
                  (msg.data.role === "assistant" &&
                    !msg.data.additional_kwargs?.tool_calls) ||
                  (msg.data.role === "assistant" &&
                    msg.data.additional_kwargs?.tool_calls.length === 0)
                )
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className={`mb-4 flex ${
                        msg.data.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`rounded-xl p-4 whitespace-pre-wrap max-w-[70%] ${
                          msg.data.role === "user"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <div className="text-sm leading-relaxed">
                          {msg.data.blocks[0].text}
                        </div>
                        <div
                          className={`text-[10px] mt-2 ${
                            msg.data.role === "user"
                              ? "text-indigo-200"
                              : "text-gray-500"
                          }`}
                        >
                          {new Date(msg.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                    </motion.div>
                  );
              })}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Composer */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="max-w-3xl mx-auto flex items-end gap-3">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                activeConv
                  ? "Type a message — press Ctrl/Cmd+Enter to send"
                  : "Select a conversation to start"
              }
              className="flex-1 min-h-[48px] max-h-40 resize-none overflow-auto rounded-md border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <button
              onClick={handleSend}
              disabled={!activeConv || !inputValue.trim() || isSending}
              className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm disabled:opacity-50"
            >
              {isSending ? "Sending..." : "Send"}
            </button>
          </div>
          <div className="max-w-3xl mx-auto text-xs text-gray-400 mt-2">
            Tip: press <kbd className="px-1 py-0.5 border rounded">Ctrl</kbd>/
            <kbd className="px-1 py-0.5 border rounded">⌘</kbd> +
            <kbd className="px-1 py-0.5 border rounded">Enter</kbd> to send
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainChat;
