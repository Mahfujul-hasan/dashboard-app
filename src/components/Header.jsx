import { HiOutlineBell, HiOutlineEnvelope } from "react-icons/hi2";
import { MdKeyboardCommandKey, MdMenu } from "react-icons/md";

export default function Header({ onMenuClick }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-gray-50 p-3 sm:p-4 rounded-2xl shadow mb-3">
      {/* Left: Hamburger (mobile) + Search */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden shrink-0 p-2 rounded-full bg-white shadow-sm"
          aria-label="Open menu"
        >
          <MdMenu size={22} />
        </button>

        {/* Search */}
        <div className="relative w-full max-w-xs sm:max-w-sm">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 pr-14 rounded-3xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none hidden xs:flex items-center gap-1 bg-gray-100 rounded-xl px-2 py-1 text-xs">
            <MdKeyboardCommandKey /> F
          </span>
        </div>
      </div>

      {/* Right: Icons + Avatar */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button className="rounded-full bg-white p-2 sm:p-3 shadow-sm hover:bg-gray-100 transition">
          <HiOutlineEnvelope size={18} />
        </button>

        <button className="rounded-full bg-white p-2 sm:p-3 shadow-sm hover:bg-gray-100 transition">
          <HiOutlineBell size={18} />
        </button>

        <div className="flex items-center gap-2">
          <img
            src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"
            alt="user"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shrink-0"
          />
          <div className="hidden lg:block">
            <h3 className="text-sm font-medium leading-tight">Totok Michael</h3>
            <p className="text-gray-500 text-xs">tmichael20@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
