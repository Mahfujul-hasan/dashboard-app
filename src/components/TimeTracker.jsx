import { useEffect, useState, useRef } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa6";

const TimeTracker = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = () => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePause = () => setIsRunning(false);
  const handleResume = () => setIsRunning(true);
  const handleStop = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className="rounded-2xl sm:rounded-3xl w-full h-full p-3 sm:p-4 text-white bg-[url('/timerBg.png')] bg-cover bg-center overflow-hidden min-h-32.5">
      <div className="space-y-2 sm:space-y-3">
        <h2 className="text-xs sm:text-sm font-bold">Time Tracker</h2>

        <h1 className="text-2xl sm:text-3xl text-center font-medium tracking-wider">
          {formatTime()}
        </h1>

        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {/* Pause / Resume */}
          {isRunning ? (
            <button
              className="bg-white text-green-700 p-2.5 sm:p-3 rounded-full hover:scale-105 transition"
              onClick={handlePause}
              aria-label="Pause"
            >
              <FaPause size={14} />
            </button>
          ) : (
            <button
              className="bg-white text-green-700 p-2.5 sm:p-3 rounded-full hover:scale-105 transition"
              onClick={handleResume}
              aria-label="Resume"
            >
              <FaPlay size={14} />
            </button>
          )}

          {/* Stop */}
          <button
            className="bg-red-500 text-white p-2.5 sm:p-3 rounded-full hover:scale-105 transition"
            onClick={handleStop}
            aria-label="Stop"
          >
            <FaStop size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;
