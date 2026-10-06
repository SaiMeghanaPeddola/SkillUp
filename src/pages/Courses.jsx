import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    title: "React Fundamentals",
    category: "Web Development",
    level: "Beginner",
    lessons: 11,
    progress: 72,
    icon: "⚛️",
    description:
      "Learn React from the basics and build modern interactive web applications.",
  },
  {
    title: "Python Programming",
    category: "Programming",
    level: "Beginner",
    lessons: 25,
    progress: 48,
    icon: "🐍",
    description:
      "Master Python programming with practical examples and hands-on exercises.",
  },
  {
    title: "AI & Machine Learning",
    category: "Artificial Intelligence",
    level: "Intermediate",
    lessons: 22,
    progress: 82,
    icon: "🤖",
    description:
      "Explore machine learning, AI concepts, models and real-world applications.",
  },
  {
    title: "Data Science",
    category: "Data Science",
    level: "Intermediate",
    lessons: 18,
    progress: 35,
    icon: "📊",
    description:
      "Analyze data, discover patterns and create meaningful insights.",
  },
  {
    title: "Cloud Computing",
    category: "Cloud",
    level: "Intermediate",
    lessons: 20,
    progress: 20,
    icon: "☁️",
    description:
      "Understand cloud platforms, services, deployment and scalable systems.",
  },
  {
    title: "UI/UX Design",
    category: "Design",
    level: "Beginner",
    lessons: 14,
    progress: 60,
    icon: "🎨",
    description:
      "Design beautiful, accessible and user-friendly digital experiences.",
  },
];

function Courses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Used to navigate to Course Details
  const navigate = useNavigate();

  // Filter courses based on search and category
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || course.category === category;

    return matchesSearch && matchesCategory;
  });

  // Open the selected course
  const openCourse = (course) => {
    navigate("/course-details", {
      state: {
        course: course,
      },
    });
  };

  return (
    <div className="courses-page">

      {/* ================= HEADER ================= */}

      <div className="courses-header">

        <div>
          <p className="page-label">LEARNING LIBRARY</p>

          <h1>Explore Courses 📚</h1>

          <p className="page-subtitle">
            Discover courses designed to build your skills and achieve your
            goals.
          </p>
        </div>

        <div className="course-stat">

          <span>📚</span>

          <div>
            <strong>50+</strong>
            <small>Courses Available</small>
          </div>

        </div>

      </div>

      {/* ================= SEARCH & FILTER ================= */}

      <div className="course-controls">

        <div className="search-box">

          🔍

          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >

          <option value="All">All Categories</option>

          <option value="Web Development">
            Web Development
          </option>

          <option value="Programming">
            Programming
          </option>

          <option value="Artificial Intelligence">
            Artificial Intelligence
          </option>

          <option value="Data Science">
            Data Science
          </option>

          <option value="Cloud">
            Cloud
          </option>

          <option value="Design">
            Design
          </option>

        </select>

      </div>

      {/* ================= CATEGORY BUTTONS ================= */}

      <div className="category-row">

        {[
          ["All", "✨"],
          ["Web Development", "💻"],
          ["Programming", "🐍"],
          ["Artificial Intelligence", "🤖"],
          ["Data Science", "📊"],
          ["Cloud", "☁️"],
          ["Design", "🎨"],
        ].map(([name, icon]) => (

          <button
            key={name}
            className={
              category === name
                ? "active-category"
                : ""
            }
            onClick={() => setCategory(name)}
          >
            {icon} {name}
          </button>

        ))}

      </div>

      {/* ================= SECTION TITLE ================= */}

      <div className="section-title">

        <div>

          <h2>Popular Courses</h2>

          <p>
            Continue learning or start something new.
          </p>

        </div>

        <span>
          {filteredCourses.length} courses
        </span>

      </div>

      {/* ================= COURSE CARDS ================= */}

      <div className="courses-grid">

        {filteredCourses.map((course) => (

          <div
            className="course-card"
            key={course.title}
          >

            {/* Course Icon */}

            <div className="course-image">

              <span>
                {course.icon}
              </span>

            </div>

            {/* Course Content */}

            <div className="course-content">

              <div className="course-category">
                {course.category}
              </div>

              <h3>
                {course.title}
              </h3>

              <p className="course-description">
                {course.description}
              </p>

              {/* Course Information */}

              <div className="course-info">

                <span>
                  📖 {course.lessons} Lessons
                </span>

                <span>
                  🎯 {course.level}
                </span>

              </div>

              {/* Progress */}

              <div className="progress-section">

                <div className="progress-label">

                  <span>
                    Your progress
                  </span>

                  <strong>
                    {course.progress}%
                  </strong>

                </div>

                <div className="progress-bar">

                  <div
                    style={{
                      width: `${course.progress}%`,
                    }}
                  ></div>

                </div>

              </div>

              {/* ================= CONNECTED BUTTON ================= */}

              <button
                className="continue-btn"
                onClick={() => openCourse(course)}
              >

                {course.progress > 0
                  ? "Continue Learning →"
                  : "Start Course →"}

              </button>

            </div>

          </div>

        ))}

      </div>

      {/* ================= NO COURSES ================= */}

      {filteredCourses.length === 0 && (

        <div className="no-courses">

          <div>
            🔎
          </div>

          <h3>
            No courses found
          </h3>

          <p>
            Try searching for another course or category.
          </p>

        </div>

      )}

    </div>
  );
}

export default Courses;