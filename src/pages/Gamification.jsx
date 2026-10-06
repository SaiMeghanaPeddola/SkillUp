import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Must match the titles used in CourseDetails / MyLearning / Dashboard / Analytics
const COURSE_TITLES = [
  "React Fundamentals",
  "Python Programming",
  "AI & Machine Learning",
  "Data Science",
];

// XP awarded per completed lesson
const XP_PER_LESSON = 50;
// XP required to advance one level
const XP_PER_LEVEL = 500;

// ---------------------------------------------------------------
// Read completed-lesson counts + progress from localStorage.
// Returns { totalCompleted, completedCourses, coursesWithProgress }
// ---------------------------------------------------------------
function loadData() {
  let totalCompleted = 0;
  let completedCourses = 0;
  let coursesWithProgress = 0;

  COURSE_TITLES.forEach((title) => {
    const savedLessons = localStorage.getItem(
      `skillup-completed-lessons-${title}`
    );
    const savedProgress = localStorage.getItem(`skillup-progress-${title}`);

    let lessonCount = 0;
    let progress = 0;

    if (savedLessons !== null) {
      try {
        const parsed = JSON.parse(savedLessons);
        if (Array.isArray(parsed)) lessonCount = parsed.length;
      } catch {
        // ignore
      }
    }

    if (savedProgress !== null) {
      progress = Number(savedProgress);
    }

    totalCompleted += lessonCount;

    if (progress >= 100) completedCourses += 1;
    if (progress > 0) coursesWithProgress += 1;
  });

  return { totalCompleted, completedCourses, coursesWithProgress };
}

// ---------------------------------------------------------------
// Achievement definitions
// Each has: icon, title, description, threshold label,
//   unlockFn(data) → boolean,
//   progressPct(data) → 0-100 number for locked progress bar
// ---------------------------------------------------------------
const ACHIEVEMENTS = [
  {
    icon: "👣",
    title: "First Steps",
    description: "Complete your very first lesson.",
    unlockFn: (d) => d.totalCompleted >= 1,
    progressPct: (d) => Math.min(100, (d.totalCompleted / 1) * 100),
    progressLabel: (d) => `${Math.min(d.totalCompleted, 1)} / 1 lesson`,
  },
  {
    icon: "📖",
    title: "Learning Starter",
    description: "Complete at least 3 lessons.",
    unlockFn: (d) => d.totalCompleted >= 3,
    progressPct: (d) => Math.min(100, (d.totalCompleted / 3) * 100),
    progressLabel: (d) => `${Math.min(d.totalCompleted, 3)} / 3 lessons`,
  },
  {
    icon: "⚡",
    title: "Fast Learner",
    description: "Complete at least 5 lessons.",
    unlockFn: (d) => d.totalCompleted >= 5,
    progressPct: (d) => Math.min(100, (d.totalCompleted / 5) * 100),
    progressLabel: (d) => `${Math.min(d.totalCompleted, 5)} / 5 lessons`,
  },
  {
    icon: "🎯",
    title: "Dedicated Learner",
    description: "Complete at least 10 lessons.",
    unlockFn: (d) => d.totalCompleted >= 10,
    progressPct: (d) => Math.min(100, (d.totalCompleted / 10) * 100),
    progressLabel: (d) => `${Math.min(d.totalCompleted, 10)} / 10 lessons`,
  },
  {
    icon: "🏆",
    title: "Course Master",
    description: "Reach 100% progress in any course.",
    unlockFn: (d) => d.completedCourses >= 1,
    progressPct: (d) => (d.completedCourses >= 1 ? 100 : 0),
    progressLabel: (d) =>
      d.completedCourses >= 1 ? "1 course complete" : "0 / 1 course",
  },
  {
    icon: "🧠",
    title: "Skill Builder",
    description: "Make progress in at least 3 different courses.",
    unlockFn: (d) => d.coursesWithProgress >= 3,
    progressPct: (d) => Math.min(100, (d.coursesWithProgress / 3) * 100),
    progressLabel: (d) =>
      `${Math.min(d.coursesWithProgress, 3)} / 3 courses`,
  },
];

// Badges are tied to specific achievements by index.
// A badge is earned when its linked achievement is unlocked.
const BADGES = [
  {
    icon: "🌟",
    title: "First Step",
    text: "Completed your first lesson",
    achievementIndex: 0,
  },
  {
    icon: "📖",
    title: "Bookworm",
    text: "Completed 10 lessons",
    achievementIndex: 3,
  },
  {
    icon: "🏆",
    title: "Course Master",
    text: "Finished an entire course",
    achievementIndex: 4,
  },
  {
    icon: "🧠",
    title: "Skill Builder",
    text: "Active across 3 different courses",
    achievementIndex: 5,
  },
];

export default function Gamification() {
  const navigate = useNavigate();
  const [data, setData] = useState(() => loadData());

  // Refresh on every mount so changes from CourseDetails are reflected.
  useEffect(() => {
    setData(loadData());
  }, []);

  // ---- Derived values ----
  const totalXP = data.totalCompleted * XP_PER_LESSON;
  const level = Math.floor(totalXP / XP_PER_LEVEL) + 1;
  const xpIntoLevel = totalXP % XP_PER_LEVEL;
  const xpBarPct = Math.round((xpIntoLevel / XP_PER_LEVEL) * 100);
  const xpToNext = XP_PER_LEVEL - xpIntoLevel;

  const unlockedAchievements = ACHIEVEMENTS.map((a) => a.unlockFn(data));
  const unlockedCount = unlockedAchievements.filter(Boolean).length;

  const earnedBadges = BADGES.filter(
    (b) => unlockedAchievements[b.achievementIndex]
  );

  return (
    <div className="gamification-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Achievements 🏆</h1>
          <p>Earn XP, badges, levels and rewards.</p>
        </div>

        <div className="level-box">
          <span>⭐</span>
          <div>
            <strong>Level {level}</strong>
            <small>{totalXP.toLocaleString()} XP</small>
          </div>
        </div>
      </div>

      {/* XP Progress Card */}
      <div className="xp-card">
        <div className="xp-content">
          <span className="xp-icon">🚀</span>
          <div>
            <span className="xp-label">YOUR PROGRESS</span>
            <h2>Keep leveling up!</h2>
            <p>
              You're doing great. Keep learning to unlock new achievements
              and rewards.
            </p>
          </div>
        </div>

        <div className="xp-progress-area">
          <div className="xp-numbers">
            <span>Level {level}</span>
            <strong>
              {xpIntoLevel.toLocaleString()} / {XP_PER_LEVEL.toLocaleString()} XP
            </strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${xpBarPct}%` }}
            ></div>
          </div>

          <small>
            {xpToNext > 0
              ? `${xpToNext} XP needed for Level ${level + 1}`
              : `Level ${level} complete!`}
          </small>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">⭐</div>
          <div>
            <strong>{totalXP.toLocaleString()}</strong>
            <span>Total XP</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">🔥</div>
          <div>
            <strong>7 Days</strong>
            <span>Current Streak</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">🏅</div>
          <div>
            <strong>{unlockedCount}</strong>
            <span>Achievements</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pink">🎖️</div>
          <div>
            <strong>{earnedBadges.length}</strong>
            <span>Badges Earned</span>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <section>
        <div className="section-title">
          <div>
            <h2>Achievements</h2>
            <p>Complete challenges and earn rewards.</p>
          </div>
          <span>{unlockedCount} / {ACHIEVEMENTS.length} Unlocked</span>
        </div>

        <div className="achievement-grid">
          {ACHIEVEMENTS.map((item, index) => {
            const unlocked = unlockedAchievements[index];
            const pct = item.progressPct(data);
            const label = item.progressLabel(data);

            return (
              <div
                className={`achievement-card ${unlocked ? "completed" : "locked"}`}
                key={item.title}
              >
                <div className="achievement-top">
                  <div className={`achievement-icon ${unlocked ? "" : "achievement-icon-locked"}`}>
                    {unlocked ? item.icon : "🔒"}
                  </div>

                  {unlocked ? (
                    <span className="completed-badge">✓ Unlocked</span>
                  ) : (
                    <span className="locked-badge">Locked</span>
                  )}
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <div className="achievement-progress">
                  <span>{label}</span>
                </div>

                {!unlocked && (
                  <div className="mini-progress">
                    <div style={{ width: `${pct}%` }}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Badges */}
      <section className="badges-section">
        <div className="section-title">
          <div>
            <h2>Your Badges 🎖️</h2>
            <p>Special rewards you've unlocked.</p>
          </div>
          <span>{earnedBadges.length} Earned</span>
        </div>

        {earnedBadges.length > 0 ? (
          <div className="badges-grid">
            {earnedBadges.map((badge) => (
              <div className="badge-card" key={badge.title}>
                <div className="badge-circle">{badge.icon}</div>
                <div>
                  <h3>{badge.title}</h3>
                  <p>{badge.text}</p>
                </div>
                <span className="earned">✓</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-badges">
            <span>🔒</span>
            <p>Complete lessons to earn your first badge!</p>
            <button
              className="continue-learning-btn"
              onClick={() => navigate("/my-learning")}
            >
              Continue Learning →
            </button>
          </div>
        )}
      </section>

    </div>
  );
}
