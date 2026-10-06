import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ---------------------------------------------------------------
// Same course data used by Dashboard / MyLearning / Analytics /
// Gamification. Titles must match exactly (they are the localStorage
// key suffix).
// ---------------------------------------------------------------
const BASE_COURSES = [
  {
    title: "React Fundamentals",
    category: "Web Development",
    icon: "⚛️",
    defaultProgress: 72,
    defaultCompleted: 8,
    totalLessons: 11,
    level: "Beginner",
    description:
      "Learn React from the basics and build modern interactive web applications.",
  },
  {
    title: "Python Programming",
    category: "Programming",
    icon: "🐍",
    defaultProgress: 48,
    defaultCompleted: 12,
    totalLessons: 25,
    level: "Beginner",
    description:
      "Master Python programming with practical examples and hands-on exercises.",
  },
  {
    title: "AI & Machine Learning",
    category: "Artificial Intelligence",
    icon: "🤖",
    defaultProgress: 82,
    defaultCompleted: 18,
    totalLessons: 22,
    level: "Intermediate",
    description:
      "Explore machine learning, AI concepts, models and real-world applications.",
  },
  {
    title: "Data Science",
    category: "Data Science",
    icon: "📊",
    defaultProgress: 61,
    defaultCompleted: 14,
    totalLessons: 23,
    level: "Intermediate",
    description:
      "Analyze data, discover patterns and create meaningful insights.",
  },
];

function loadCourseProgress() {
  return BASE_COURSES.map((course) => {
    const savedProgress = localStorage.getItem(
      `skillup-progress-${course.title}`
    );
    const savedCompletedLessons = localStorage.getItem(
      `skillup-completed-lessons-${course.title}`
    );

    let progress = course.defaultProgress;
    let completedLessons = course.defaultCompleted;

    if (savedProgress !== null) {
      progress = Number(savedProgress);
    }

    if (savedCompletedLessons !== null) {
      try {
        const parsed = JSON.parse(savedCompletedLessons);
        if (Array.isArray(parsed)) completedLessons = parsed.length;
      } catch {
        // ignore parse errors
      }
    } else if (savedProgress !== null) {
      completedLessons = Math.round((progress / 100) * course.totalLessons);
    }

    return { ...course, progress, completedLessons };
  });
}

// Return a recommendation string based on a course's progress %.
function getRecommendation(progress, courseTitle) {
  if (progress >= 100) {
    return `You've completed ${courseTitle}! Move on to an advanced course or explore related topics.`;
  }
  if (progress >= 70) {
    return `You're nearly done with ${courseTitle}. Dive into advanced concepts, projects, and revision to finish strong.`;
  }
  if (progress >= 40) {
    return `You're making solid progress in ${courseTitle}. Keep going and practice the intermediate concepts.`;
  }
  return `You're getting started with ${courseTitle}. Focus on the fundamentals and complete the beginner lessons first.`;
}

// Short label used in the AI Recommendation card.
function getProgressTierLabel(progress) {
  if (progress >= 100) return "mastery-level";
  if (progress >= 70) return "advanced";
  if (progress >= 40) return "intermediate";
  return "beginner";
}

function AdaptiveLearning() {
  const navigate = useNavigate();

  const [level, setLevel] = useState("Intermediate");
  const [topic, setTopic] = useState("React");
  const [selectedPath, setSelectedPath] = useState("Balanced");
  const [courses, setCourses] = useState(() => loadCourseProgress());

  // Re-read localStorage on every mount so CourseDetails changes are reflected.
  useEffect(() => {
    setCourses(loadCourseProgress());
  }, []);

  // ---- Derived values ----
  const totalCompletedLessons = courses.reduce(
    (sum, c) => sum + c.completedLessons,
    0
  );

  const overallProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce((sum, c) => sum + c.progress, 0) / courses.length
        )
      : 0;

  // Sort by progress to find weakest and strongest
  const sorted = [...courses].sort((a, b) => a.progress - b.progress);
  const weakestCourse = sorted[0];
  const strongestCourse = sorted[sorted.length - 1];

  const weakestRec = getRecommendation(
    weakestCourse.progress,
    weakestCourse.title
  );
  const weakestTier = getProgressTierLabel(weakestCourse.progress);

  // Navigate to CourseDetails with the same shape that MyLearning uses.
  const goToCourse = (course) => {
    navigate("/course-details", {
      state: {
        course: {
          title: course.title,
          category: course.category,
          level: course.level,
          lessons: course.totalLessons,
          progress: course.progress,
          icon: course.icon,
          description: course.description,
        },
      },
    });
  };

  // Map the three learning paths to real course data so the progress bars
  // show live values instead of hardcoded numbers.
  const learningPaths = [
    {
      icon: "🌱",
      title: "Foundation",
      description: "Strengthen your basics before moving to advanced concepts.",
      course: courses[0], // React Fundamentals
      tag: "Recommended",
    },
    {
      icon: "⚡",
      title: "Balanced",
      description:
        "Mix theory, practice and challenges based on your performance.",
      course: courses[1], // Python Programming
      tag: "Best Match",
    },
    {
      icon: "🚀",
      title: "Advanced",
      description: "Challenge yourself with difficult problems and projects.",
      course: courses[2], // AI & Machine Learning
      tag: "Challenge",
    },
  ];

  return (
    <div className="adaptive-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <p className="eyebrow">PERSONALIZED LEARNING</p>
          <h1>Adaptive Learning 🧠</h1>
          <p className="subtitle">
            Your learning path automatically adapts to your performance,
            progress and skill level.
          </p>
        </div>

        <div className="adaptive-status">
          <span className="status-dot"></span>
          Learning Path Active
        </div>
      </div>

      {/* Main grid */}
      <div className="adaptive-grid">

        {/* ---- Left column ---- */}
        <div className="adaptive-main">

          {/* Learning Profile */}
          <div className="adaptive-card profile-card">
            <div className="card-title">
              <div className="title-icon">🎯</div>
              <div>
                <h2>Your Learning Profile</h2>
                <p>Customize how SkillUp adapts your learning experience.</p>
              </div>
            </div>

            <div className="settings-grid">
              <div className="setting">
                <label>Learning Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div className="setting">
                <label>Current Topic</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  <option>React</option>
                  <option>Python</option>
                  <option>JavaScript</option>
                  <option>Machine Learning</option>
                  <option>Data Structures</option>
                </select>
              </div>
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="recommendation-card">
            <div className="recommendation-icon">✨</div>

            <div>
              <p className="recommendation-label">AI RECOMMENDATION</p>
              <h2>Your path has been optimized!</h2>

              <p>
                Based on your progress, SkillUp recommends a{" "}
                <strong>{weakestTier}</strong>-level focus on{" "}
                <strong>{weakestCourse.title}</strong> (
                {weakestCourse.progress}% complete). You selected{" "}
                <strong>{topic}</strong> as your current topic with an{" "}
                <strong>{level.toLowerCase()}</strong>-level preference.
              </p>

              <button
                className="primary-btn"
                onClick={() => goToCourse(weakestCourse)}
              >
                Start Recommended Path →
              </button>
            </div>
          </div>

          {/* Learning Paths */}
          <div className="section-heading">
            <div>
              <h2>Choose Your Learning Path</h2>
              <p>SkillUp adapts the content according to your choice.</p>
            </div>
          </div>

          <div className="path-grid">
            {learningPaths.map((path) => (
              <div
                key={path.title}
                className={`path-card ${
                  selectedPath === path.title ? "selected" : ""
                }`}
                onClick={() => setSelectedPath(path.title)}
              >
                <div className="path-top">
                  <div className="path-icon">{path.icon}</div>
                  <span className="path-tag">{path.tag}</span>
                </div>

                <h3>{path.title}</h3>
                <p>{path.description}</p>

                <div className="progress-info">
                  <span>{path.course.title}</span>
                  <strong>{path.course.progress}%</strong>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${path.course.progress}%` }}
                  ></div>
                </div>

                <button className="path-btn">
                  {selectedPath === path.title ? "Selected ✓" : "Select Path"}
                </button>
              </div>
            ))}
          </div>

          {/* Adaptation Features */}
          <div className="section-heading">
            <div>
              <h2>How Adaptive Learning Works</h2>
              <p>Learning changes as you improve.</p>
            </div>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <span>📊</span>
              <h3>Performance Analysis</h3>
              <p>
                Your quiz scores and activities are continuously analyzed.
              </p>
            </div>

            <div className="feature-card">
              <span>🧩</span>
              <h3>Difficulty Adjustment</h3>
              <p>
                Questions become easier or harder based on your performance.
              </p>
            </div>

            <div className="feature-card">
              <span>🎓</span>
              <h3>Personalized Content</h3>
              <p>
                Get learning resources that match your strengths and weaknesses.
              </p>
            </div>
          </div>

        </div>

        {/* ---- Right sidebar ---- */}
        <div className="adaptive-sidebar">

          {/* Your Progress */}
          <div className="adaptive-card">
            <h2>📈 Your Progress</h2>

            <div className="big-progress">
              <div className="circle-progress">
                <span>{overallProgress}%</span>
              </div>

              <div>
                <h3>Overall Skill</h3>
                <p>
                  {overallProgress >= 70
                    ? "You're making great progress!"
                    : overallProgress >= 40
                    ? "Keep it up, you're improving!"
                    : "Just getting started — keep going!"}
                </p>
              </div>
            </div>

            <div className="stat-row">
              <span>Lessons Completed</span>
              <strong>{totalCompletedLessons}</strong>
            </div>

            <div className="stat-row">
              <span>Best Performance</span>
              <strong>{strongestCourse.progress}%</strong>
            </div>

            <div className="stat-row">
              <span>Current Streak</span>
              <strong>7 days 🔥</strong>
            </div>
          </div>

          {/* Next Recommended */}
          <div className="adaptive-card next-card">
            <div className="next-icon">🚀</div>

            <h2>Next Recommended</h2>
            <h3>{weakestCourse.title}</h3>

            <p>{weakestRec}</p>

            <button
              className="secondary-btn"
              onClick={() => goToCourse(weakestCourse)}
            >
              Continue Learning →
            </button>
          </div>

          {/* Adaptive Insights */}
          <div className="adaptive-card">
            <h2>💡 Adaptive Insights</h2>

            <div className="insight">
              <span>🏆</span>
              <p>
                Strongest area: <strong>{strongestCourse.title}</strong> at{" "}
                {strongestCourse.progress}%.
              </p>
            </div>

            <div className="insight">
              <span>🎯</span>
              <p>
                Needs attention: <strong>{weakestCourse.title}</strong> at{" "}
                {weakestCourse.progress}%.
              </p>
            </div>

            <div className="insight">
              <span>⚡</span>
              <p>
                {weakestCourse.progress >= 70
                  ? "You're ready for advanced challenges in your weakest course."
                  : weakestCourse.progress >= 40
                  ? "Practice intermediate exercises to push past the halfway point."
                  : "Complete the beginner lessons to build a solid foundation."}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdaptiveLearning;
