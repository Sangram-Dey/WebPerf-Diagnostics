import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { IssueCard } from "./IssueCard";

interface Issue {
  title: string;
  severity: "high" | "medium" | "low";
  description: string;
  whyItHappens: string;
  howToImprove: string;
}

interface CategorySectionProps {
  title: string;
  icon: LucideIcon;
  issues: Issue[];
  delay?: number;
  iconColor?: string;
  criticalIssues?: string[];
}

export function CategorySection({
  title,
  icon: Icon,
  issues,
  delay = 0,
  iconColor = "text-blue-500",
  criticalIssues = [],
}: CategorySectionProps) {
  if (issues.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
        <div className={`p-2 bg-gray-900 rounded-lg ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <span className="ml-auto text-sm text-gray-500">
          {issues.length} {issues.length === 1 ? "issue" : "issues"}
        </span>
      </div>

      <div className="space-y-3">
        {issues.map((issue, index) => (
          <IssueCard
            key={index}
            {...issue}
            delay={delay + 0.2 + index * 0.05}
            isCritical={criticalIssues.includes(issue.title)}
          />
        ))}
      </div>
    </motion.div>
  );
}