import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Same course list as MyLearning / Dashboard — must match titles exactly
// because titles are used as localStorage key suffixes.
const BASE_COURSES = [
  {
    title: "React Fundamentals",
    category: "Web Development",
    defaultProgress: 72,
    defaultCompleted: 8,
    totalLessons: 11,
  },
  {
    title: "Python Programming",
    category: "Programming",
    defaultProgress: 48,
    defaultCompleted: 12,
    totalLessons: 25,
  },
  {
    title: "AI & Machine Learning",
    category: "Artificial Intelligence",
    defaultProgress: 82,
    defaultCompleted: 18,
    totalLessons: 22,
  },
  {
    title: "Data Science",
    category: "Data Science",
    defaultProgress: 61,
    defaultCompleted: 14,
    totalLessons: 23,
  },
];

// Static weekly activity — no per-day tracking yet.
const weeklyActivity = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3.2 },
  { day: "Wed", hours: 2.1 },
  { day: "Thu", hours: 3.6 },
  { day: "Fri", hours: 2.8 },
  { day: "Sat", hours: 3.4 },
  { day: "Sun", hours: 1.9 },
];

const weeklyTotal = weeklyActivity
  .reduce((sum, d) => sum + d.hours, 0)
  .toFixed(1);

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
        if (Array.isArray(parsed)) {
          completedLessons = parsed.length;
        }
      } catch {
        // ignore parse errors
      }
    } else if (savedProgress !== null) {
      completedLessons = Math.round((progress / 100) * course.totalLessons);
    }

    return { ...course, progress, completedLessons };
  });
}

function Analytics() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(() => loadCourseProgress());

  // Re-read localStorage on every mount so updates from CourseDetails are reflected.
  useEffect(() => {
    setCourses(loadCourseProgress());
  }, []);

  // --- Derived stats ---
  const totalEnrolled = courses.length;

  const totalCompletedLessons = courses.reduce(
    (sum, c) => sum + c.completedLessons,
    0
  );
  // ~15 min per lesson, converted to hours
  const learningHours = Math.round((totalCompletedLessons * 15) / 60);

  const overallProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce((sum, c) => sum + c.progress, 0) / courses.length
        )
      : 0;

  // Skills: one entry per unique category, progress = that course's live progress
  const skills = courses.map((c) => ({
    name: c.category,
    progress: c.progress,
  }));

  return (
    <div className="analytics-page">

      {/* Header */}
      <div className="analytics-header">
        <div>
          <h1>Learning Analytics 📊</h1>
          <p>Track your learning progress and understand your performance.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="analytics-stats">

        <div className="analytics-stat-card">
          <div className="stat-icon">⏱️</div>
          <div>
            <h2>{learningHours} hrs</h2>
            <p>Total Learning Time</p>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="stat-icon">📚</div>
          <div>
            <h2>{totalEnrolled}</h2>
            <p>Courses Enrolled</p>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="stat-icon">🎯</div>
          <div>
            <h2>{overallProgress}%</h2>
            <p>Overall Progress</p>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="stat-icon">🔥</div>
          <div>
            <h2>7 Days</h2>
            <p>Learning Streak</p>
          </div>
        </div>

      </div>

      {/* Main Grid */}
      <div className="analytics-grid">

        {/* Course Progress */}
        <div className="analytics-card course-progress-card">
          <h2>Course Progress</h2>
          <p className="card-subtitle">
            Your progress across active courses.
          </p>

          <div className="course-progress-list">
            {courses.map((course) => (
              <div className="course-progress-item" key={course.title}>
                <div className="course-progress-info">
                  <div>
                    <h3>{course.title}</h3>
                    <span>
                      {course.category} &middot; {course.completedLessons} /{" "}
                      {course.totalLessons} lessons
                    </span>
                  </div>

                  <strong>{course.progress}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="analytics-card weekly-card">
          <h2>Weekly Activity 📈</h2>
          <p className="card-subtitle">
            Hours spent learning this week.
          </p>

          <div className="activity-chart">
            {weeklyActivity.map((item) => (
              <div className="activity-column" key={item.day}>
                <div
                  className="activity-bar"
                  style={{ height: `${item.hours * 55}px` }}
                  title={`${item.hours} hours`}
                ></div>

                <span>{item.day}</span>
              </div>
            ))}
          </div>

          <div className="weekly-total">
            <strong>{weeklyTotal} hrs</strong>
            <span>This week</span>
          </div>
        </div>

        {/* Skills Overview */}
        <div className="analytics-card skills-card">
          <h2>Skills Overview 🧠</h2>
          <p className="card-subtitle">
            Your current skill levels across different areas.
          </p>

          <div className="skills-list">
            {skills.map((skill) => (
              <div className="skill-item" key={skill.name}>
                <div className="skill-info">
                  <span>{skill.name}</span>
                  <strong>{skill.progress}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivation */}
        <div className="analytics-card motivation-card">
          <div className="rocket">🚀</div>

          <h2>Keep Going!</h2>

          <p>
            You're making excellent progress. Keep completing lessons
            to level up your skills and reach your learning goals.
          </p>

          <button onClick={() => navigate("/my-learning")}>
            Continue Learning →
          </button>
        </div>

      </div>
    </div>
  );
}

export default Analytics;
