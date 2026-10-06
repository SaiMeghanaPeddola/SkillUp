import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// The same course list used in MyLearning — single source of truth
const COURSES = [
  {
    title: "React Fundamentals",
    category: "Web Development",
    icon: "⚛️",
    bgClass: "react-bg",
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
    bgClass: "python-bg",
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
    bgClass: "ai-bg",
    defaultProgress: 82,
    defaultCompleted: 18,
    totalLessons: 22,
    level: "Intermediate",
    description:
      "Explore machine learning, AI concepts, models and real-world applications.",
  },
];

function loadCourseProgress(courses) {
  return courses.map((course) => {
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
        if (Array.isArray(parsed)) {
          completedLessons = parsed.length;
        }
      } catch {
        // ignore
      }
    } else if (savedProgress !== null) {
      completedLessons = Math.round((progress / 100) * course.totalLessons);
    }

    return { ...course, progress, completedLessons };
  });
}

function getLevel(overallProgress) {
  if (overallProgress >= 90) return "Level 10";
  if (overallProgress >= 80) return "Level 8";
  if (overallProgress >= 70) return "Level 7";
  if (overallProgress >= 60) return "Level 6";
  if (overallProgress >= 50) return "Level 5";
  if (overallProgress >= 40) return "Level 4";
  if (overallProgress >= 30) return "Level 3";
  if (overallProgress >= 20) return "Level 2";
  return "Level 1";
}

function Dashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(() => loadCourseProgress(COURSES));

  // Reload progress each time the Dashboard mounts (e.g., after navigating back)
  useEffect(() => {
    setCourses(loadCourseProgress(COURSES));
  }, []);

  // --- Derived stats ---
  const totalEnrolled = courses.length;

  const totalCompletedLessons = courses.reduce(
    (sum, c) => sum + c.completedLessons,
    0
  );
  // Rough estimate: ~15 min per lesson
  const learningHours = Math.round((totalCompletedLessons * 15) / 60);

  const overallProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce((sum, c) => sum + c.progress, 0) / courses.length
        )
      : 0;

  const currentLevel = getLevel(overallProgress);

  // Show top 3 in-progress or all courses in the Continue Learning section
  const continueCourses = courses.slice(0, 3);

  return (
    <div className="dashboard">

      <div className="topbar">
        <div>
          <h1>Good morning, Learner 👋</h1>
          <p>Continue your learning journey and reach your goals.</p>
        </div>

        <div className="profile-circle">
          👤
        </div>
      </div>

      <section className="hero-card">
        <div>
          <span className="hero-tag">PERSONALIZED LEARNING</span>
          <h2>Keep learning, keep growing 🚀</h2>
          <p>
            Your personalized learning path is waiting for you.
            Continue where you left off and build your skills.
          </p>

          <button onClick={() => navigate("/my-learning")}>
            Continue Learning →
          </button>
        </div>

        <div className="hero-icon">
          🎓
        </div>
      </section>

      <section className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div>
            <h3>{totalEnrolled}</h3>
            <p>Courses Enrolled</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div>
            <h3>{learningHours} hrs</h3>
            <p>Learning Time</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div>
            <h3>7 Days</h3>
            <p>Learning Streak</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div>
            <h3>{currentLevel}</h3>
            <p>Current Level</p>
          </div>
        </div>

      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <h2>Continue Learning</h2>
            <p>Pick up where you left off.</p>
          </div>

          <span onClick={() => navigate("/my-learning")}>View All →</span>
        </div>

        <div className="course-grid">

          {continueCourses.map((course) => (
            <div className="course-card" key={course.title}>
              <div className={`course-image ${course.bgClass}`}>
                {course.icon}
              </div>
              <div className="course-content">
                <span>{course.category}</span>
                <h3>{course.title}</h3>

                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>

                <div className="course-footer">
                  <span>{course.progress}% complete</span>
                  <span>
                    {course.completedLessons} / {course.totalLessons} lessons
                  </span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      <section className="section">

        <div className="section-heading">
          <div>
            <h2>Smart Learning</h2>
            <p>Technology-powered learning experiences.</p>
          </div>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Tutor</h3>
            <p>
              Get instant explanations, personalized guidance
              and intelligent answers.
            </p>
            <span>Explore AI Tutor →</span>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Adaptive Learning</h3>
            <p>
              Learning content automatically adapts to your
              performance and skill level.
            </p>
            <span>View Learning Path →</span>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🥽</div>
            <h3>VR Classroom</h3>
            <p>
              Experience immersive classrooms using modern
              AR and VR technologies.
            </p>
            <span>Enter Classroom →</span>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;
