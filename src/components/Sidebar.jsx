import { BsCalendar4Event, BsPeople } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import {
  IoBarChartOutline,
  IoLogOutOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { PiLifebuoyLight } from "react-icons/pi";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import { useLocation, Link } from "react-router";
import AppDownload from "./AppDownload";

export default function Sidebar({ onClose }) {
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <TbLayoutDashboardFilled size={20} />,
    },
    {
      label: "Tasks",
      href: "/dashboard/tasks/",
      icon: <FaTasks size={20} />,
    },
    {
      label: "Calendar",
      href: "/dashboard/calendar/",
      icon: <BsCalendar4Event size={20} />,
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics/",
      icon: <IoBarChartOutline size={20} />,
    },
    {
      label: "Team",
      href: "/dashboard/team/",
      icon: <BsPeople size={20} />,
    },
  ];

  const generalItems = [
    {
      label: "Setting",
      href: "/dashboard/setting",
      icon: <IoSettingsOutline size={20} />,
    },
    {
      label: "Support",
      href: "/dashboard/support",
      icon: <PiLifebuoyLight size={20} />,
    },
    {
      label: "Logout",
      href: "/",
      icon: <IoLogOutOutline size={20} />,
    },
  ];

  const NavItem = ({ item, index }) => {
    const isActive = item.href === location.pathname;
    return (
      <Link
        to={item.href}
        key={index}
        onClick={onClose}
        className="flex items-center gap-3 py-3 rounded-2xl w-full hover:bg-gray-100 transition-colors duration-150"
      >
        {/* Active left bar */}
        <div
          className={`h-8 w-1.5 rounded-r-full shrink-0 ${
            isActive ? "bg-green-700" : "bg-transparent"
          }`}
        />

        {/* Icon */}
        <span className={isActive ? "text-green-700" : "text-gray-400"}>
          {item.icon}
        </span>

        {/* Label */}
        <span
          className={`text-sm sm:text-base ${
            isActive ? "text-black font-medium" : "text-gray-400"
          }`}
        >
          {item.label}
        </span>
      </Link>
    );
  };

  return (
    <div className="h-full w-64 bg-gray-50 rounded-3xl flex flex-col  overflow-y-auto">
      {/* Logo + Close button (mobile) */}
      <div className="flex items-center justify-between pr-4">
        <img src="/logo.png" alt="Logo" className="w-40 sm:w-48 p-4 sm:p-6" />
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-full hover:bg-gray-200 transition"
            aria-label="Close sidebar"
          >
            <MdClose size={20} />
          </button>
        )}
      </div>

      <div className="flex-1">
        {/* MENU */}
        <div>
          <p className="text-xs font-medium px-6 text-gray-500 mb-1">MENU</p>
          <nav className="flex flex-col">
            {menuItems.map((item, index) => (
              <NavItem key={index} item={item} index={index} />
            ))}
          </nav>
        </div>

        {/* GENERAL */}
        <div className="mt-6">
          <p className="text-xs font-medium px-6 text-gray-500 mb-1">GENERAL</p>
          <nav className="flex flex-col">
            {generalItems.map((item, index) => (
              <NavItem key={index} item={item} index={index} />
            ))}
          </nav>
        </div>
      </div>

      {/* App Download */}
      <div className="px-4 sm:px-6 mb-4 sm:mb-6 mt-4">
        <AppDownload />
      </div>
    </div>
  );
}
