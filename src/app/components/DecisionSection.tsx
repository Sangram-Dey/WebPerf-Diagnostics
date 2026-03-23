import { motion } from "motion/react";
import { Wrench, RefreshCw, ArrowRight } from "lucide-react";
import type { RecommendationType } from "./RecommendationSummary";

interface DecisionSectionProps {
  delay?: number;
  recommendation: RecommendationType;
}

export function DecisionSection({ delay = 0, recommendation }: DecisionSectionProps) {
  // Determine emphasis based on recommendation
  const optimizeEmphasis = recommendation === "minor" ? "ring-2 ring-blue-500/30 border-blue-500/50" : "";
  const rebuildEmphasis = recommendation === "rebuild" ? "ring-2 ring-purple-500/30 border-purple-500/50" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Fix or Rebuild?</h3>
        <p className="text-gray-400 max-w-2xl mx-auto mb-3">
          Our recommendation is based on technical complexity, cost-to-fix, long-term maintainability, and your business goals.
        </p>
        <p className="text-sm text-gray-400 max-w-2xl mx-auto">
          Here's a framework to help you decide the best approach
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Optimize Path */}
        <div className={`border border-gray-800 rounded-lg p-6 bg-gray-900/30 hover:border-gray-700 transition-colors ${optimizeEmphasis}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Wrench className="w-6 h-6 text-blue-500" />
            </div>
            <h4 className="text-xl font-bold text-white">Optimize Existing Site</h4>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-300 mb-2">Consider this if:</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                  <span>Your site architecture is fundamentally sound</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                  <span>Issues are primarily configuration-based (caching, compression, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                  <span>You have access to hosting and server settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                  <span>Most issues are medium or low severity</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <p className="text-sm font-semibold text-gray-300 mb-2">Typical timeline:</p>
              <p className="text-sm text-gray-400">2-4 weeks for incremental improvements</p>
            </div>
          </div>
        </div>

        {/* Rebuild Path */}
        <div className={`border border-gray-800 rounded-lg p-6 bg-gray-900/30 hover:border-gray-700 transition-colors ${rebuildEmphasis}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <RefreshCw className="w-6 h-6 text-purple-500" />
            </div>
            <h4 className="text-xl font-bold text-white">Rebuild for Long-Term Performance</h4>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-300 mb-2">Consider this if:</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-500" />
                  <span>You're on an outdated or inflexible platform (legacy CMS, heavy themes, or plugin-based sites)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-500" />
                  <span>Many high-severity structural issues exist</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-500" />
                  <span>You need to modernize design alongside performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-500" />
                  <span>Long-term maintainability is a concern</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <p className="text-sm font-semibold text-gray-300 mb-2">Typical timeline:</p>
              <p className="text-sm text-gray-400">6-12 weeks for ground-up rebuild</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-400">
          We'll always recommend the approach that gives you the best value — not the biggest project.
        </p>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-400">
          <span className="font-semibold text-gray-300">Not sure which path is right?</span> An expert
          can review your specific situation, tech stack, and business goals to recommend the most
          cost-effective approach.
        </p>
      </div>
    </motion.div>
  );
}