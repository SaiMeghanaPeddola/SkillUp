import {
  LayoutDashboard,
  BookOpen,
  Bot,
  Brain,
  Box,
  Trophy,
  BarChart3,
  GraduationCap,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Courses", path: "/courses", icon: BookOpen },
  { name: "AI Tutor", path: "/ai-tutor", icon: Bot },
  { name: "Adaptive Learning", path: "/adaptive-learning", icon: Brain },
  { name: "VR Classroom", path: "/vr-classroom", icon: Box },
  { name: "Achievements", path: "/gamification", icon: Trophy },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "My Learning", path: "/my-learning", icon: GraduationCap },
  { name: "Profile", path: "/profile", icon: User },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        🎓 <span>SkillUp</span>
      </div>

      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;