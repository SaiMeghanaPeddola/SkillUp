import React from "react";

function VRClassroom() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>VR Classroom 🥽</h1>
        <p>Enter an immersive virtual learning environment.</p>
      </div>

      <div className="vr-hero">
        <div className="vr-content">
          <span className="vr-label">IMMERSIVE LEARNING</span>

          <h2>Step Into Your Virtual Classroom 🚀</h2>

          <p>
            Experience interactive lessons, virtual labs and engaging
            learning environments using modern VR technology.
          </p>

          <button className="primary-btn">
            Enter VR Classroom →
          </button>
        </div>

        <div className="vr-visual">
          🥽
        </div>
      </div>

      <h2 className="section-title">Virtual Learning Spaces</h2>
      <p className="section-subtitle">
        Choose an immersive environment and start exploring.
      </p>

      <div className="vr-grid">
        <div className="vr-card">
          <div className="vr-icon">🧪</div>
          <h3>Virtual Science Lab</h3>
          <p>
            Perform experiments and explore scientific concepts in a
            safe virtual environment.
          </p>
          <button className="secondary-btn">Enter Lab →</button>
        </div>

        <div className="vr-card">
          <div className="vr-icon">💻</div>
          <h3>Programming Lab</h3>
          <p>
            Practice programming concepts with interactive virtual
            coding environments.
          </p>
          <button className="secondary-btn">Enter Lab →</button>
        </div>

        <div className="vr-card">
          <div className="vr-icon">🌎</div>
          <h3>Virtual Exploration</h3>
          <p>
            Explore places, concepts and real-world scenarios through
            immersive learning.
          </p>
          <button className="secondary-btn">Explore →</button>
        </div>
      </div>

      <div className="vr-features">
        <div>
          <span>🎯</span>
          <h3>Interactive Learning</h3>
          <p>Learn by doing through immersive activities.</p>
        </div>

        <div>
          <span>👥</span>
          <h3>Collaborative Classes</h3>
          <p>Learn and interact with other virtual learners.</p>
        </div>

        <div>
          <span>🏆</span>
          <h3>Skill Challenges</h3>
          <p>Complete challenges and improve your learning level.</p>
        </div>
      </div>
    </div>
  );
}

export default VRClassroom;