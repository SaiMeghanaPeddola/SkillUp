import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    title: "React Fundamentals",
    category: "Web Development",
    icon: "⚛️",
    progress: 72,
    completedLessons: 8,
    totalLessons: 11,
    level: "Beginner",
    description:
      "Learn React from the basics and build modern interactive web applications.",
  },
  {
    title: "Python Programming",
    category: "Programming",
    icon: "🐍",
    progress: 48,
    completedLessons: 12,
    totalLessons: 25,
    level: "Beginner",
    description:
      "Master Python programming with practical examples and hands-on exercises.",
  },
  {
    title: "AI & Machine Learning",
    category: "Artificial Intelligence",
    icon: "🤖",
    progress: 82,
    completedLessons: 18,
    totalLessons: 22,
    level: "Intermediate",
    description:
      "Explore machine learning, AI concepts, models and real-world applications.",
  },
  {
    title: "Data Science",
    category: "Data Science",
    icon: "📊",
    progress: 61,
    completedLessons: 14,
    totalLessons: 23,
    level: "Intermediate",
    description:
      "Analyze data, discover patterns and create meaningful insights.",
  },
];

function MyLearning() {
  const navigate = useNavigate();

  // Store courses with updated progress
  const [learningCourses, setLearningCourses] = useState(courses);

  // --------------------------------------------------
  // LOAD SAVED COURSE PROGRESS
  // --------------------------------------------------

  useEffect(() => {
    const updatedCourses = courses.map((course) => {
      const savedProgress = localStorage.getItem(
        `skillup-progress-${course.title}`
      );

      const savedCompletedLessons = localStorage.getItem(
        `skillup-completed-lessons-${course.title}`
      );

      let progress = course.progress;
      let completedLessons = course.completedLessons;

      // If Course Details has saved progress
      if (savedProgress !== null) {
        progress = Number(savedProgress);
      }

      // If Course Details has saved completed lesson list
      if (savedCompletedLessons !== null) {
        try {
          const parsedLessons = JSON.parse(savedCompletedLessons);

          if (Array.isArray(parsedLessons)) {
            completedLessons = parsedLessons.length;
          }
        } catch (error) {
          console.log("Could not read saved lesson data.");
        }
      } else if (savedProgress !== null) {
        // Calculate completed lessons from saved progress
        completedLessons = Math.round(
          (progress / 100) * course.totalLessons
        );
      }

      return {
        ...course,
        progress,
        completedLessons,
      };
    });

    setLearningCourses(updatedCourses);
  }, []);

  // --------------------------------------------------
  // OPEN COURSE
  // --------------------------------------------------

  const continueCourse = (course) => {
    const courseForDetails = {
      title: course.title,
      category: course.category,
      level: course.level,
      lessons: course.totalLessons,
      progress: course.progress,
      icon: course.icon,
      description: course.description,
    };

    navigate("/course-details", {
      state: {
        course: courseForDetails,
      },
    });
  };

  // --------------------------------------------------
  // EXPLORE COURSES
  // --------------------------------------------------

  const exploreCourses = () => {
    navigate("/courses");
  };

  // --------------------------------------------------
  // CALCULATE STATS
  // --------------------------------------------------

  const activeCourses = learningCourses.filter(
    (course) => course.progress > 0 && course.progress < 100
  ).length;

  const overallProgress =
    learningCourses.length > 0
      ? Math.round(
          learningCourses.reduce(
            (total, course) => total + course.progress,
            0
          ) / learningCourses.length
        )
      : 0;

  return (
    <div className="page-container">

      {/* =================================================
          HEADER
          ================================================= */}

      <div className="page-header">

        <div>

          <p className="eyebrow">
            YOUR LEARNING
          </p>

          <h1>
            My Learning 🎓
          </h1>

          <p className="subtitle">
            Continue your courses and keep building your skills.
          </p>

        </div>

        <div className="learning-summary">

          <span>
            📚
          </span>

          <div>

            <strong>
              12
            </strong>

            <small>
              Courses Enrolled
            </small>

          </div>

        </div>

      </div>


      {/* =================================================
          STATS
          ================================================= */}

      <div className="learning-stats">

        {/* Active Courses */}

        <div className="stat-card">

          <div className="stat-icon">
            📖
          </div>

          <div>

            <strong>
              {activeCourses}
            </strong>

            <span>
              Active Courses
            </span>

          </div>

        </div>


        {/* Learning Time */}

        <div className="stat-card">

          <div className="stat-icon">
            ⏱️
          </div>

          <div>

            <strong>
              36 hrs
            </strong>

            <span>
              Learning Time
            </span>

          </div>

        </div>


        {/* Overall Progress */}

        <div className="stat-card">

          <div className="stat-icon">
            🎯
          </div>

          <div>

            <strong>
              {overallProgress}%
            </strong>

            <span>
              Overall Progress
            </span>

          </div>

        </div>


        {/* Streak */}

        <div className="stat-card">

          <div className="stat-icon">
            🔥
          </div>

          <div>

            <strong>
              7 Days
            </strong>

            <span>
              Current Streak
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          CONTINUE LEARNING
          ================================================= */}

      <section className="learning-section">

        <div className="section-title">

          <div>

            <h2>
              Continue Learning 🚀
            </h2>

            <p>
              Pick up where you left off.
            </p>

          </div>

          <span className="course-count">
            {learningCourses.length} courses
          </span>

        </div>


        {/* COURSE GRID */}

        <div className="course-grid">

          {learningCourses.map((course) => (

            <div
              className="learning-card"
              key={course.title}
            >

              {/* Course Image */}

              <div className="course-image">

                <span>
                  {course.icon}
                </span>

              </div>


              {/* Course Content */}

              <div className="course-content">

                <span className="course-category">
                  {course.category}
                </span>

                <h3>
                  {course.title}
                </h3>


                {/* Course Info */}

                <div className="course-info">

                  <span>
                    📖 {course.completedLessons} /{" "}
                    {course.totalLessons} lessons
                  </span>

                  <span>
                    🎯 {course.level}
                  </span>

                </div>


                {/* Progress Header */}

                <div className="progress-header">

                  <span>
                    Your progress
                  </span>

                  <strong>
                    {course.progress}%
                  </strong>

                </div>


                {/* Progress Bar */}

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${course.progress}%`,
                    }}
                  ></div>

                </div>


                {/* Continue Button */}

                <button
                  className="continue-btn"
                  onClick={() => continueCourse(course)}
                >

                  {course.progress >= 100
                    ? "Review Course →"
                    : "Continue Learning →"}

                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* =================================================
          RECOMMENDED
          ================================================= */}

      <section className="recommended-section">

        <div>

          <span className="recommend-icon">
            ✨
          </span>

          <div>

            <p className="eyebrow">
              RECOMMENDED FOR YOU
            </p>

            <h2>
              Keep growing your skills
            </h2>

            <p>
              Based on your progress, we recommend exploring
              advanced React and AI concepts next.
            </p>

          </div>

        </div>


        <button
          className="recommend-btn"
          onClick={exploreCourses}
        >
          Explore Courses →
        </button>

      </section>

    </div>
  );
}

export default MyLearning;