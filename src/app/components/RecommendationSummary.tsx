import { motion } from "motion/react";
import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";

export type RecommendationType = "minor" | "major" | "rebuild";

interface RecommendationSummaryProps {
  recommendation: RecommendationType;
  delay?: number;
}

const recommendationConfig = {
  minor: {
    title: "Your website can be improved with targeted optimizations.",
    badge: "Low Complexity",
    badgeColor: "bg-green-500/10 text-green-500 border-green-500/20",
    borderColor: "border-green-500/20",
    bgColor: "bg-green-500/5",
    icon: CheckCircle,
    iconColor: "text-green-500",
    confidence: "High",
    confidenceColor: "text-green-400",
  },
  major: {
    title: "Your website requires structured performance improvements.",
    badge: "Moderate Complexity",
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    borderColor: "border-amber-500/20",
    bgColor: "bg-amber-500/5",
    icon: AlertTriangle,
    iconColor: "text-amber-500",
    confidence: "High",
    confidenceColor: "text-amber-400",
  },
  rebuild: {
    title: "Based on issue complexity, rebuilding may be more cost-effective long term.",
    badge: "High Complexity",
    badgeColor: "bg-red-500/10 text-red-500 border-red-500/20",
    borderColor: "border-red-500/20",
    bgColor: "bg-red-500/5",
    icon: AlertCircle,
    iconColor: "text-red-500",
    confidence: "Medium",
    confidenceColor: "text-red-400",
  },
};

export function RecommendationSummary({ recommendation, delay = 0 }: RecommendationSummaryProps) {
  const config = recommendationConfig[recommendation];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`border ${config.borderColor} rounded-lg p-6 ${config.bgColor}`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-2 rounded-lg ${config.badgeColor}`}>
            <Icon className={`w-6 h-6 ${config.iconColor}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-white">Overall Assessment</h3>
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${config.badgeColor}`}>
                {config.badge}
              </span>
            </div>
            <p className="text-gray-300">{config.title}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-end">
        <p className="text-sm text-gray-400">
          Confidence: <span className={`font-semibold ${config.confidenceColor}`}>{config.confidence}</span>
        </p>
      </div>
    </motion.div>
  );
}
