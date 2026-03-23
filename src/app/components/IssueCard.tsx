import { motion } from "motion/react";
import { AlertCircle, Info } from "lucide-react";
import { useState } from "react";

interface IssueCardProps {
  title: string;
  severity: "high" | "medium" | "low";
  description: string;
  whyItHappens: string;
  howToImprove: string;
  delay?: number;
  isCritical?: boolean;
}

export function IssueCard({
  title,
  severity,
  description,
  whyItHappens,
  howToImprove,
  delay = 0,
  isCritical = false,
}: IssueCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const severityColors = {
    high: isCritical ? "border-red-500/50 bg-red-500/10 ring-2 ring-red-500/20" : "border-red-500/30 bg-red-500/5",
    medium: "border-yellow-500/30 bg-yellow-500/5",
    low: "border-blue-500/30 bg-blue-500/5",
  };

  const severityDotColors = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-blue-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={`border rounded-lg p-4 transition-all duration-300 cursor-pointer ${severityColors[severity]} hover:border-opacity-50`}
      >
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <AlertCircle className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${severityDotColors[severity]}`} />
              <h3 className="font-medium text-white">{title}</h3>
            </div>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
          <Info className="w-4 h-4 text-gray-500 flex-shrink-0" />
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-10 left-0 right-0 top-full mt-2 p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-xl"
        >
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-1">What this means:</h4>
              <p className="text-gray-300">{description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Why it happens:</h4>
              <p className="text-gray-300">{whyItHappens}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">How to improve:</h4>
              <p className="text-gray-300">{howToImprove}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}