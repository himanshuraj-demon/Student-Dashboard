"use client";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  LuPanelRightClose,
  LuBotMessageSquare,
  LuSend,
  LuUser,
  LuSparkles,
  LuZap,
} from "react-icons/lu";
import "../../pages/css/aisidebar.css";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  type?: "markdown";
}

interface UserInput {
  inputText: string;
}

interface AIResponse {
  success: boolean;
  message: ChatMessage;
}

interface AiSidebarProps {
  setAiOpen: (open: boolean) => void;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const AiSidebar = ({ setAiOpen }: AiSidebarProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UserInput>({ defaultValues: { inputText: "" } });

  const inputValue = watch("inputText");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (data: UserInput) => {
    const input = data.inputText.trim();
    if (!input) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    reset();

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setIsTyping(true);
    try {
      const updatedHistory = [...messages, userMessage];
      setMessages(updatedHistory);
      const res = await fetch("http://localhost:3000/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history: updatedHistory }),
      });

      const json: AIResponse = await res.json();
      console.log(json)

      if (json.success && json.message) {
        setMessages((prev) => [...prev, json.message]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Sorry, I couldn't process that. Please try again.",
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Something went wrong. Please check your connection.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  /* Register textarea with ref forwarding for auto-grow */
  const { ref: rhfRef, ...textareaProps } = register("inputText", {
    required: "Message cannot be empty",
    maxLength: { value: 2000, message: "Max 2000 characters" },
  });

  return (
    <div className="ai-sidebar">
      <div className="ai-sidebar__header">
        <div className="ai-sidebar__title">
          <LuBotMessageSquare className="ai-sidebar__title-icon" />
          <span>AI Assistant</span>
        </div>

        <div className="ai-sidebar__status">
          <span className="ai-sidebar__status-dot" />
          Online
        </div>

        <button
          className="ai-sidebar__close"
          onClick={() => setAiOpen(false)}
          aria-label="Close AI sidebar">
          <LuPanelRightClose size={18} />
        </button>
      </div>

      <div className="ai-sidebar__messages">
        {messages.length === 0 && !isTyping ? (
          <div className="ai-sidebar__empty">
            <LuSparkles className="ai-sidebar__empty-icon" />
            <p className="ai-sidebar__empty-title">How can I help you?</p>
            <p className="ai-sidebar__empty-sub">
              Ask me anything — I'm here to assist you instantly.
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`ai-message ${
                  msg.role === "user" ? "ai-message--user" : "ai-message--ai"
                }`}>
                {/* Avatar */}
                <div
                  className={`ai-message__avatar ${
                    msg.role === "user"
                      ? "ai-message__avatar--user"
                      : "ai-message__avatar--ai"
                  }`}>
                  {msg.role === "user" ? (
                    <LuUser size={14} />
                  ) : (
                    <LuZap size={14} />
                  )}
                </div>

                <div className="ai-message__body">
                  <div
                    className={`ai-message__bubble ${
                      msg.role === "user"
                        ? "ai-message__bubble--user"
                        : "ai-message__bubble--ai"
                    }`}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                  <span className="ai-message__time">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-message ai-message--ai">
                <div className="ai-message__avatar ai-message__avatar--ai">
                  <LuZap size={14} />
                </div>
                <div className="ai-typing">
                  <span className="ai-typing__dot" />
                  <span className="ai-typing__dot" />
                  <span className="ai-typing__dot" />
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="ai-sidebar__input-area">
        <p className="ai-sidebar__input-hint">
          <LuZap size={11} />
          Press Enter to send · Shift+Enter for new line
        </p>

        <form
          className="ai-sidebar__form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate>
          <textarea
            {...textareaProps}
            ref={(el) => {
              rhfRef(el);
              (
                textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>
              ).current = el;
            }}
            className="ai-sidebar__textarea"
            placeholder="Ask me anything…"
            rows={1}
            onChange={(e) => {
              textareaProps.onChange(e);
              handleTextareaChange(e);
            }}
            onKeyDown={handleKeyDown}
          />

          <button
            type="submit"
            className="ai-sidebar__send"
            disabled={isSubmitting || isTyping || !inputValue?.trim()}
            aria-label="Send message">
            <LuSend size={15} />
          </button>
        </form>

        {errors.inputText && (
          <p className="ai-sidebar__error">{errors.inputText.message}</p>
        )}
      </div>
    </div>
  );
};

export default AiSidebar;
