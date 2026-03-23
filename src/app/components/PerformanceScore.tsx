import { motion } from "motion/react";

interface PerformanceScoreProps {
  score: number;
}

export function PerformanceScore({ score }: PerformanceScoreProps) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getScoreLabel = (score: number) => {
    if (score >= 90) return { label: "Good", color: "text-green-400" };
    if (score >= 50) return { label: "Needs Improvement", color: "text-yellow-400" };
    return { label: "Poor", color: "text-red-400" };
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "#4ade80";
    if (score >= 50) return "#facc15";
    return "#f87171";
  };

  const { label, color } = getScoreLabel(score);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full -rotate-90">
          {/* Background circle */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="96"
            cy="96"
            r={radius}
            stroke={getScoreColor(score)}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-6xl font-bold text-white"
          >
            {score}
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className={`text-xl font-medium ${color}`}
      >
        {label}
      </motion.div>
    </div>
  );
}
