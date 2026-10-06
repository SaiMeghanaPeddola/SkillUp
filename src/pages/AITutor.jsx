import { useEffect, useRef, useState } from "react";
import "./AITutor.css";

function AITutor() {
  const [message, setMessage] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [topic, setTopic] = useState("React");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! 👋 I'm your AI Tutor. Ask me anything and I'll help you learn step by step.",
    },
  ]);

  const quickPrompts = [
    "Explain this concept",
    "Give me an example",
    "Quiz me",
    "Summarize this topic",
  ];

  // Scroll to the latest message whenever the list changes.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (text = message) => {
    const trimmed = (typeof text === "string" ? text : message).trim();
    if (!trimmed || isLoading) return;

    setError(null);
    setMessage("");
    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, level, topic }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error ?? `Server error ${res.status}`);
      }

      setMessages((prev) => [...prev, { sender: "ai", text: data.answer }]);
    } catch (err) {
      setError(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-tutor-page">

      {/* Header */}
      <div className="ai-header">
        <div>
          <span className="section-label">SMART LEARNING</span>
          <h1>AI Tutor 🤖</h1>
          <p>
            Your personal AI-powered learning companion.
            Ask questions, practice concepts and learn at your own pace.
          </p>
        </div>

        <div className="ai-status">
          <span className="status-dot"></span>
          AI Tutor Online
        </div>
      </div>

      {/* Main Layout */}
      <div className="ai-layout">

        {/* Chat Section */}
        <div className="chat-card">

          <div className="chat-header">
            <div className="tutor-avatar">🤖</div>

            <div>
              <h2>SkillUp AI Tutor</h2>
              <span>Personalized learning assistant</span>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-row ${
                  msg.sender === "user" ? "user-row" : "ai-row"
                }`}
              >

                {msg.sender === "ai" && (
                  <div className="small-avatar">🤖</div>
                )}

                <div
                  className={`message ${
                    msg.sender === "user" ? "user-message" : "ai-message"
                  }`}
                >
                  {msg.text.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>

              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="message-row ai-row">
                <div className="small-avatar">🤖</div>
                <div className="message ai-message loading-message">
                  <span className="loading-dot"></span>
                  <span className="loading-dot"></span>
                  <span className="loading-dot"></span>
                </div>
              </div>
            )}

            {/* Error banner */}
            {error && (
              <div className="error-banner">
                ⚠️ {error}
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />

          </div>

          {/* Quick Prompts */}
          <div className="quick-prompts">
            <span>Quick prompts</span>

            <div className="prompt-buttons">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  disabled={isLoading}
                >
                  ✨ {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Ask your AI Tutor anything..."
              value={message}
              disabled={isLoading}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              className="send-button"
              onClick={() => sendMessage()}
              disabled={isLoading}
            >
              {isLoading ? "Thinking…" : "Send ➤"}
            </button>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="tutor-sidebar">

          {/* Learning Settings */}
          <div className="side-card">
            <h3>🎯 Learning Settings</h3>

            <label>Learning Level</label>

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            <label>Current Topic</label>

            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option>React</option>
              <option>Python</option>
              <option>Artificial Intelligence</option>
              <option>Machine Learning</option>
              <option>Web Development</option>
              <option>Data Science</option>
            </select>
          </div>

          {/* Personalized Learning */}
          <div className="side-card personalized-card">
            <div className="card-icon">🧠</div>

            <h3>Personalized Learning</h3>

            <p>
              Your AI Tutor adapts explanations according to your
              learning level and current progress.
            </p>

            <div className="learning-stat">
              <span>Current Level</span>
              <strong>{level}</strong>
            </div>

            <div className="learning-stat">
              <span>Current Topic</span>
              <strong>{topic}</strong>
            </div>
          </div>

          {/* AI Features */}
          <div className="side-card">
            <h3>✨ What I can do</h3>

            <div className="feature-item">
              <span>💡</span>
              <div>
                <strong>Explain Concepts</strong>
                <p>Understand difficult topics easily.</p>
              </div>
            </div>

            <div className="feature-item">
              <span>📝</span>
              <div>
                <strong>Practice & Quiz</strong>
                <p>Test your knowledge instantly.</p>
              </div>
            </div>

            <div className="feature-item">
              <span>🚀</span>
              <div>
                <strong>Learning Guidance</strong>
                <p>Get personalized study suggestions.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AITutor;