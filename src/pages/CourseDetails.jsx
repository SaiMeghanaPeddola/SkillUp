import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CourseDetails.css";

function CourseDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const course = location.state?.course;

  // Currently selected lesson
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Lessons that are completed
  const [completedLessons, setCompletedLessons] = useState([]);

  // Current progress
  const [progress, setProgress] = useState(course?.progress || 0);

  // --------------------------------------------------
  // LOAD SAVED PROGRESS
  // --------------------------------------------------

  useEffect(() => {
    if (!course) return;

    const savedCompleted = localStorage.getItem(
      `skillup-completed-lessons-${course.title}`
    );

    if (savedCompleted) {
      try {
        const parsedLessons = JSON.parse(savedCompleted);

        if (Array.isArray(parsedLessons)) {
          setCompletedLessons(parsedLessons);

          const newProgress = Math.round(
            (parsedLessons.length / course.lessons) * 100
          );

          setProgress(newProgress);
          return;
        }
      } catch (error) {
        console.log("Could not load saved lessons");
      }
    }

    // If there is no saved lesson data,
    // calculate completed lessons from existing course progress.

    const existingCompleted = Math.floor(
      ((course.progress || 0) / 100) * course.lessons
    );

    const initialLessons = Array.from(
      { length: existingCompleted },
      (_, index) => index + 1
    );

    setCompletedLessons(initialLessons);
  }, [course]);

  // --------------------------------------------------
  // COURSE NOT FOUND
  // --------------------------------------------------

  if (!course) {
    return (
      <div className="course-not-found">

        <div className="not-found-icon">
          📚
        </div>

        <h2>
          Course not found
        </h2>

        <p>
          We couldn't find the course you are looking for.
        </p>

        <button
          className="back-btn"
          onClick={() => navigate("/courses")}
        >
          ← Back to Courses
        </button>

      </div>
    );
  }

  // --------------------------------------------------
  // START / REVIEW LESSON
  // --------------------------------------------------

  const openLesson = (lessonNumber) => {
    setSelectedLesson(lessonNumber);

    // Scroll to the learning area
    setTimeout(() => {
      const element = document.getElementById(
        "lesson-learning-area"
      );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // --------------------------------------------------
  // MARK LESSON AS COMPLETE
  // --------------------------------------------------

  const completeLesson = () => {
    if (!selectedLesson) return;

    // If already completed, don't add again
    if (completedLessons.includes(selectedLesson)) {
      return;
    }

    const updatedLessons = [
      ...completedLessons,
      selectedLesson,
    ].sort((a, b) => a - b);

    setCompletedLessons(updatedLessons);

    // Calculate progress
    const newProgress = Math.round(
      (updatedLessons.length / course.lessons) * 100
    );

    setProgress(newProgress);

    // Save completed lessons
    localStorage.setItem(
      `skillup-completed-lessons-${course.title}`,
      JSON.stringify(updatedLessons)
    );

    // Save progress separately too
    localStorage.setItem(
      `skillup-progress-${course.title}`,
      newProgress.toString()
    );
  };

  // --------------------------------------------------
  // CHECK IF LESSON IS COMPLETED
  // --------------------------------------------------

  const isCompleted = (lessonNumber) => {
    return completedLessons.includes(lessonNumber);
  };

  return (
    <div className="course-details-page">

      {/* =================================================
          BACK BUTTON
          ================================================= */}

      <button
        className="back-btn"
        onClick={() => navigate("/courses")}
      >
        ← Back to Courses
      </button>


      {/* =================================================
          COURSE HEADER
          ================================================= */}

      <div className="course-details-header">

        <div className="course-details-icon">
          {course.icon}
        </div>

        <div className="course-header-content">

          <p className="course-category">
            {course.category}
          </p>

          <h1>
            {course.title}
          </h1>

          <p className="course-description">
            {course.description}
          </p>

          <div className="course-meta">

            <span>
              📚 {course.lessons} Lessons
            </span>

            <span>
              🎯 {course.level}
            </span>

            <span>
              📊 {progress}% Complete
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          PROGRESS
          ================================================= */}

      <div className="course-progress-box">

        <div className="progress-header">

          <div>

            <strong>
              Your Progress
            </strong>

            <small>
              {completedLessons.length} of{" "}
              {course.lessons} lessons completed
            </small>

          </div>

          <span>
            {progress}%
          </span>

        </div>

        <div className="progress-bar">

          <div
            style={{
              width: `${progress}%`,
            }}
          ></div>

        </div>

      </div>


      {/* =================================================
          LESSON LEARNING AREA
          ================================================= */}

      {selectedLesson && (

        <div
          id="lesson-learning-area"
          className="lesson-learning-box"
        >

          <div className="lesson-learning-header">

            <div>

              <span className="learning-label">
                NOW LEARNING
              </span>

              <h2>
                Lesson {selectedLesson}
              </h2>

            </div>

            <button
              className="close-lesson-btn"
              onClick={() => setSelectedLesson(null)}
            >
              ✕
            </button>

          </div>


          {/* Lesson Content */}

          <div className="lesson-content-area">

            <div className="lesson-play-circle">
              ▶
            </div>

            <h3>
              Lesson {selectedLesson}
            </h3>

            <p>
              Learn important concepts and practical
              skills in this lesson.
            </p>

            <div className="lesson-topic-box">

              <span>
                📖
              </span>

              <div>

                <strong>
                  What you'll learn
                </strong>

                <p>
                  Concepts, examples and practical
                  exercises related to {course.title}.
                </p>

              </div>

            </div>

          </div>


          {/* Lesson Actions */}

          <div className="lesson-learning-footer">

            <div className="lesson-status">

              {isCompleted(selectedLesson) ? (
                <>
                  <span className="status-icon">
                    ✓
                  </span>

                  <span>
                    Lesson completed
                  </span>
                </>
              ) : (
                <>
                  <span className="status-icon pending">
                    📚
                  </span>

                  <span>
                    Complete this lesson to update your progress
                  </span>
                </>
              )}

            </div>


            {isCompleted(selectedLesson) ? (

              <button
                className="completed-btn"
                disabled
              >
                ✓ Completed
              </button>

            ) : (

              <button
                className="complete-btn"
                onClick={completeLesson}
              >
                ✓ Mark as Complete
              </button>

            )}

          </div>

        </div>

      )}


      {/* =================================================
          LESSONS
          ================================================= */}

      <div className="lessons-section">

        <div className="lessons-heading">

          <div>

            <h2>
              Course Lessons 📖
            </h2>

            <p>
              Complete each lesson to improve your progress.
            </p>

          </div>

          <span className="lesson-count">
            {course.lessons} Lessons
          </span>

        </div>


        <div className="lessons-list">

          {Array.from(
            { length: course.lessons },
            (_, index) => {

              const lessonNumber = index + 1;

              const completed =
                isCompleted(lessonNumber);

              const selected =
                selectedLesson === lessonNumber;

              return (

                <div
                  key={lessonNumber}
                  className={`lesson-card
                    ${completed ? "completed-lesson" : ""}
                    ${selected ? "selected-lesson" : ""}
                  `}
                >

                  {/* Lesson Number */}

                  <div className="lesson-number">

                    {completed
                      ? "✓"
                      : lessonNumber}

                  </div>


                  {/* Lesson Information */}

                  <div className="lesson-info">

                    <div className="lesson-title-row">

                      <h3>
                        Lesson {lessonNumber}
                      </h3>

                      {completed && (

                        <span className="completed-label">
                          Completed
                        </span>

                      )}

                    </div>

                    <p>
                      Learn important concepts and
                      practical skills in this lesson.
                    </p>

                    <span className="lesson-duration">
                      ⏱️ 15–20 min
                    </span>

                  </div>


                  {/* Lesson Button */}

                  <button
                    className={
                      completed
                        ? "lesson-btn review-btn"
                        : "lesson-btn"
                    }
                    onClick={() =>
                      openLesson(lessonNumber)
                    }
                  >

                    {completed
                      ? "Review"
                      : "Start Lesson →"}

                  </button>

                </div>

              );
            }
          )}

        </div>

      </div>


      {/* =================================================
          COURSE COMPLETE
          ================================================= */}

      {progress === 100 && (

        <div className="course-complete-box">

          <div className="complete-icon">
            🏆
          </div>

          <div>

            <h2>
              Course Completed! 🎉
            </h2>

            <p>
              Congratulations! You have completed{" "}
              {course.title}.
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default CourseDetails;