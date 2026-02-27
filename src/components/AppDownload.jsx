import { TbAward } from "react-icons/tb";

export default function AppDownload() {
  return (
    <div className="rounded-2xl sm:rounded-3xl w-full p-3 sm:p-4 text-white bg-[url('/timerBg.png')] bg-cover bg-center overflow-hidden">
      <div className="space-y-2 sm:space-y-3">
        <span>
          <TbAward size={24} className="sm:w-7 sm:h-7" />
        </span>

        <h1 className="text-lg sm:text-xl font-medium tracking-wide leading-snug">
          Download our Mobile App
        </h1>

        <p className="text-xs sm:text-sm text-white/80">
          Get easy access in another way
        </p>

        <button className="w-full py-2 sm:py-3 bg-green-800 hover:bg-green-700 transition rounded-full text-sm sm:text-base font-medium">
          Download
        </button>
      </div>
    </div>
  );
}
