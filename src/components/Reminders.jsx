import { BsCameraVideoFill } from "react-icons/bs";

export default function Reminders() {
  return (
    <div className="p-3 sm:p-4 bg-white rounded-2xl sm:rounded-3xl h-full flex flex-col justify-between gap-3">
      <div>
        <h4 className="font-bold text-sm sm:text-base mb-3 sm:mb-4">
          Reminder
        </h4>
        <h3 className="font-extrabold text-lg sm:text-xl leading-snug">
          Meeting with Arc Company
        </h3>
        <p className="text-xs sm:text-sm font-normal text-gray-500 mt-1">
          Time: 02.00pm – 04.00pm
        </p>
      </div>
      <button className="w-full rounded-full flex items-center justify-center text-sm sm:text-base font-medium py-2.5 sm:py-3 gap-2 sm:gap-3 bg-green-900 text-white hover:bg-green-800 transition">
        <BsCameraVideoFill />
        Start Meeting
      </button>
    </div>
  );
}
