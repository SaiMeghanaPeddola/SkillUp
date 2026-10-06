import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Meghana",
    email: "meghana@example.com",
    goal: "Become a Full Stack Developer",
  });

  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setProfile(formData);
    setEditing(false);
  };

  return (
    <div className="profile-page">

      {/* Header */}
      <div className="profile-header">
        <div>
          <p className="profile-label">YOUR PROFILE</p>
          <h1>My Profile 👩‍💻</h1>
          <p>Manage your profile and track your learning journey.</p>
        </div>

        <button
          
  className="edit-profile-btn"
  onClick={() => alert("Edit Profile feature coming soon!")}
>
  ✏️ Edit Profile

        </button>
      </div>

      {/* Main Profile Section */}
      <div className="profile-grid">

        {/* Profile Card */}
        <div className="profile-card">

          <div className="profile-avatar">
            👩🏻‍💻
          </div>

          {!editing ? (
            <>
              <h2>{profile.name}</h2>
              <h3>SkillUp Learner</h3>

              <div className="profile-info">

                <div className="info-row">
                  <span>📧</span>
                  <div>
                    <strong>Email</strong>
                    <p>{profile.email}</p>
                  </div>
                </div>

                <div className="info-row">
                  <span>🎯</span>
                  <div>
                    <strong>Learning Goal</strong>
                    <p>{profile.goal}</p>
                  </div>
                </div>

                <div className="info-row">
                  <span>🗓️</span>
                  <div>
                    <strong>Joined</strong>
                    <p>January 2026</p>
                  </div>
                </div>

              </div>
            </>
          ) : (
            <div className="edit-form">

              <label>Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <label>Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <label>Learning Goal</label>
              <input
                name="goal"
                value={formData.goal}
                onChange={handleChange}
              />

              <div className="form-buttons">
                <button
                  className="save-btn"
                  onClick={handleSave}
                >
                  Save Changes
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Learning Statistics */}
        <div className="stats-card">

          <h2>Learning Statistics 📊</h2>

          <div className="stats-grid">

            <div className="stat-box">
              <span>📚</span>
              <h3>12</h3>
              <p>Courses Enrolled</p>
            </div>

            <div className="stat-box">
              <span>🏆</span>
              <h3>8</h3>
              <p>Courses Completed</p>
            </div>

            <div className="stat-box">
              <span>⏱️</span>
              <h3>36 hrs</h3>
              <p>Learning Time</p>
            </div>

            <div className="stat-box">
              <span>🔥</span>
              <h3>7 Days</h3>
              <p>Current Streak</p>
            </div>

          </div>

        </div>
      </div>

      {/* Skills */}
      <div className="skills-card">

        <h2>My Skills 🧠</h2>
        <p>Your current skill levels across different areas.</p>

        <div className="skills-list">

          <div className="skill-item">
            <div>
              <span>Web Development</span>
              <strong>78%</strong>
            </div>
            <div className="skill-bar">
              <div style={{ width: "78%" }}></div>
            </div>
          </div>

          <div className="skill-item">
            <div>
              <span>Programming</span>
              <strong>65%</strong>
            </div>
            <div className="skill-bar">
              <div style={{ width: "65%" }}></div>
            </div>
          </div>

          <div className="skill-item">
            <div>
              <span>Artificial Intelligence</span>
              <strong>82%</strong>
            </div>
            <div className="skill-bar">
              <div style={{ width: "82%" }}></div>
            </div>
          </div>

          <div className="skill-item">
            <div>
              <span>Data Science</span>
              <strong>59%</strong>
            </div>
            <div className="skill-bar">
              <div style={{ width: "59%" }}></div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;