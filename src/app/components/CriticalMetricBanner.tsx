import { motion } from "motion/react";
import { AlertTriangle } from "lucide-react";

interface CriticalMetricBannerProps {
  delay?: number;
}

export function CriticalMetricBanner({ delay = 0 }: CriticalMetricBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="border border-red-500/20 rounded-lg p-4 bg-red-500/5 flex items-center gap-3"
    >
      <div className="p-2 bg-red-500/10 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-red-500" />
      </div>
      <div>
        <p className="text-sm font-semibold text-red-400">Core Web Vitals Failing</p>
        <p className="text-xs text-gray-400 mt-1">
          Multiple critical performance metrics are below acceptable thresholds
        </p>
      </div>
    </motion.div>
  );
}
