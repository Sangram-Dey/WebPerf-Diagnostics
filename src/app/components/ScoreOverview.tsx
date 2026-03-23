import { motion } from "motion/react";
import { Zap, Users, Shield, Search } from "lucide-react";

interface Score {
  label: string;
  value: number;
  icon: React.ElementType;
}

interface ScoreOverviewProps {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export function ScoreOverview({
  performance,
  accessibility,
  bestPractices,
  seo,
}: ScoreOverviewProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const scores: Score[] = [
    { label: "Accessibility", value: accessibility, icon: Users },
    { label: "Best Practices", value: bestPractices, icon: Shield },
    { label: "SEO", value: seo, icon: Search },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {scores.map((score, index) => {
        const Icon = score.icon;
        return (
          <motion.div
            key={score.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
            className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 flex items-center gap-4"
          >
            <div className="p-3 bg-gray-800 rounded-lg">
              <Icon className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">{score.label}</p>
              <p className={`text-2xl font-bold ${getScoreColor(score.value)}`}>
                {score.value}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
