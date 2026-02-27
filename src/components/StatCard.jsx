import { GoArrowUpRight } from "react-icons/go";

export default function StatCard({ title, value }) {
  return (
    <div className="group bg-white hover:bg-radial-[at_25%_75%] from-[#3a753d] to-[#154c33] hover:text-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 transition-all duration-200 space-y-2 sm:space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xs sm:text-sm md:text-base font-medium leading-tight">
          {title}
        </h3>
        <span className="bg-white rounded-full p-1.5 sm:p-2 border text-black shrink-0">
          <GoArrowUpRight size={18} className="sm:w-6 sm:h-6" />
        </span>
      </div>

      <p className="text-2xl sm:text-3xl md:text-4xl font-semibold">{value}</p>
      <p className="text-green-600 font-medium text-xs sm:text-sm group-hover:text-[#b0e853] transition-colors duration-200">
        Increase from last month
      </p>
    </div>
  );
}
