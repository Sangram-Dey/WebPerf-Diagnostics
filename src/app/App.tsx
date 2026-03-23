import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, Loader2, ArrowRight, Zap, Users, Shield, Search } from "lucide-react";
import { PerformanceScore } from "./components/PerformanceScore";
import { IssueCard } from "./components/IssueCard";
import { ScoreOverview } from "./components/ScoreOverview";
import { CategorySection } from "./components/CategorySection";
import { DecisionSection } from "./components/DecisionSection";
import { ContactForm } from "./components/ContactForm";
import { RecommendationSummary, type RecommendationType } from "./components/RecommendationSummary";
import { CriticalMetricBanner } from "./components/CriticalMetricBanner";

type AppState = "initial" | "analyzing" | "results";

interface PerformanceIssue {
  title: string;
  severity: "high" | "medium" | "low";
  description: string;
  whyItHappens: string;
  howToImprove: string;
  category: "performance" | "accessibility" | "bestPractices" | "seo";
}

const mockIssues: PerformanceIssue[] = [
  {
    title: "Slow Server Response Time",
    severity: "high",
    category: "performance",
    description: "Your server takes over 2 seconds to respond to requests",
    whyItHappens:
      "This usually happens when your server is under heavy load, has inefficient database queries, or is located far from your users geographically.",
    howToImprove:
      "Consider upgrading your hosting plan, optimizing database queries, or using a Content Delivery Network (CDN) to serve content closer to your users.",
  },
  {
    title: "Unoptimized Images",
    severity: "high",
    category: "performance",
    description: "Large image files are slowing down page load by 3.2 seconds",
    whyItHappens:
      "Images are often uploaded at full resolution without compression. A 5MB photo loads much slower than a 200KB optimized version.",
    howToImprove:
      "Use modern image formats like WebP, compress images before uploading, and implement lazy loading so images only load when needed.",
  },
  {
    title: "No Browser Caching",
    severity: "medium",
    category: "performance",
    description: "Static resources aren't being cached by browsers",
    whyItHappens:
      "Your server isn't telling browsers to save copies of CSS, JavaScript, and images locally. Every visit downloads everything again.",
    howToImprove:
      "Configure cache headers on your server to tell browsers they can store static files. This makes repeat visits much faster.",
  },
  {
    title: "Render-Blocking Resources",
    severity: "medium",
    category: "performance",
    description: "CSS and JavaScript files are blocking page rendering",
    whyItHappens:
      "Browsers must download and process all CSS and JavaScript before showing content. Large or many files create delays.",
    howToImprove:
      "Minify and bundle files, load non-critical JavaScript asynchronously, and inline critical CSS to get content visible faster.",
  },
  {
    title: "No Content Compression",
    severity: "low",
    category: "performance",
    description: "Text-based resources aren't compressed during transfer",
    whyItHappens:
      "Without compression (like Gzip or Brotli), HTML, CSS, and JavaScript files are sent at full size, wasting bandwidth.",
    howToImprove:
      "Enable compression on your web server. This can reduce file sizes by 70-90% during transfer with minimal CPU overhead.",
  },
  {
    title: "Missing Alt Text on Images",
    severity: "high",
    category: "accessibility",
    description: "12 images are missing descriptive alt text",
    whyItHappens:
      "Alt text is often forgotten during content creation. Developers and content creators may not realize its importance for screen readers.",
    howToImprove:
      "Add descriptive alt attributes to all images. Describe what the image shows for users who can't see it. Leave alt empty for purely decorative images.",
  },
  {
    title: "Low Contrast Text",
    severity: "medium",
    category: "accessibility",
    description: "Text color doesn't have sufficient contrast against background",
    whyItHappens:
      "Design choices sometimes prioritize aesthetics over readability. Light gray text on white backgrounds is hard for many people to read.",
    howToImprove:
      "Ensure text has a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. Use online contrast checkers to verify.",
  },
  {
    title: "Missing Form Labels",
    severity: "medium",
    category: "accessibility",
    description: "Form inputs lack proper label associations",
    whyItHappens:
      "Forms are sometimes styled with placeholder text instead of proper labels, making them inaccessible to screen reader users.",
    howToImprove:
      "Associate every form input with a <label> element using the 'for' and 'id' attributes. This helps all users understand what to enter.",
  },
  {
    title: "Insecure HTTP Connection",
    severity: "high",
    category: "bestPractices",
    description: "Site is served over HTTP instead of HTTPS",
    whyItHappens:
      "HTTPS requires an SSL certificate, which some sites haven't set up yet. HTTP connections expose user data during transmission.",
    howToImprove:
      "Install an SSL certificate (often free with modern hosting) and redirect all HTTP traffic to HTTPS. This encrypts data and improves user trust.",
  },
  {
    title: "Browser Errors in Console",
    severity: "medium",
    category: "bestPractices",
    description: "JavaScript errors detected in browser console",
    whyItHappens:
      "Broken scripts, incompatible libraries, or coding mistakes can cause errors that degrade user experience or break functionality.",
    howToImprove:
      "Review browser console logs regularly during development. Fix errors before deployment and implement error monitoring in production.",
  },
  {
    title: "Missing Meta Description",
    severity: "medium",
    category: "seo",
    description: "Page lacks a meta description tag",
    whyItHappens:
      "Meta descriptions are sometimes overlooked during site setup. Without them, search engines create their own snippets from page content.",
    howToImprove:
      "Add a unique, compelling meta description to each page. Keep it under 160 characters and include relevant keywords naturally.",
  },
  {
    title: "Non-Crawlable Links",
    severity: "low",
    category: "seo",
    description: "Some navigation uses JavaScript-only links",
    whyItHappens:
      "Single-page apps and dynamic sites sometimes use onclick handlers or div elements instead of proper anchor tags for navigation.",
    howToImprove:
      "Use standard <a> tags with href attributes for all navigation. This ensures search engines can discover and index all pages.",
  },
];

export default function App() {
  const [appState, setAppState] = useState<AppState>("initial");
  const [url, setUrl] = useState("");
  const [performanceScore] = useState(42);
  const [accessibilityScore] = useState(67);
  const [bestPracticesScore] = useState(58);
  const [seoScore] = useState(75);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const handleAnalyze = () => {
    if (!url) return;
    
    setAppState("analyzing");
    
    // Simulate analysis
    setTimeout(() => {
      setAppState("results");
    }, 2500);
  };

  const handleReset = () => {
    setAppState("initial");
    setUrl("");
  };

  // Determine recommendation based on performance score and issues
  const getRecommendation = (): RecommendationType => {
    const performanceIssues = mockIssues.filter(issue => issue.category === "performance");
    const highSeverityCount = performanceIssues.filter(issue => issue.severity === "high").length;
    
    if (performanceScore >= 50 && highSeverityCount <= 1) {
      return "minor";
    } else if (performanceScore < 30 || highSeverityCount >= 3) {
      return "rebuild";
    } else {
      return "major";
    }
  };

  const recommendation = getRecommendation();

  // Determine critical issues (LCP, INP, etc.)
  const criticalIssues = ["Slow Server Response Time", "Unoptimized Images"];
  
  // Check if Core Web Vitals are failing (performance < 50 and multiple high severity issues)
  const coreWebVitalsFailing = performanceScore < 50 && 
    mockIssues.filter(issue => issue.category === "performance" && issue.severity === "high").length >= 2;

  // Dynamic CTA text based on recommendation
  const getCtaText = () => {
    switch (recommendation) {
      case "minor":
        return "Fine-tune performance";
      case "major":
        return "Discuss optimization plan";
      case "rebuild":
        return "Discuss rebuild strategy";
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        {/* Header - Always visible but transforms */}
        <motion.div
          layout
          className={`mb-12 ${appState === "results" ? "text-center" : ""}`}
        >
          <motion.div
            layout
            className="flex items-center gap-3 mb-4"
            style={{ justifyContent: appState === "results" ? "center" : "flex-start" }}
          >
            <Activity className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold">WebPerf Diagnostics</h1>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Initial State */}
          {appState === "initial" && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Understand Why Your
                <br />
                <span className="text-blue-500">Website Is Slow</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12">
                Get a plain-English breakdown of performance issues affecting your site.
                No jargon, just clear explanations of what's wrong and why.
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-6 py-4 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-lg"
                  />
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={!url}
                  className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors text-lg flex items-center justify-center gap-2 mx-auto"
                >
                  Analyze Website
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Analyzing State */}
          {appState === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="mb-8">
                <input
                  type="url"
                  value={url}
                  disabled
                  className="w-full px-6 py-4 bg-gray-900 border border-gray-800 rounded-lg text-gray-500 text-lg"
                />
              </div>

              <div className="flex flex-col items-center gap-6">
                <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
                <div className="space-y-2">
                  <p className="text-xl font-medium">Analyzing website performance...</p>
                  <p className="text-gray-400">This may take a few seconds</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results State */}
          {appState === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* URL Display */}
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Analysis for:</p>
                <p className="text-lg text-gray-300 font-mono">{url}</p>
                <button
                  onClick={handleReset}
                  className="mt-4 text-sm text-blue-500 hover:text-blue-400 transition-colors"
                >
                  Analyze a different site
                </button>
              </div>

              {/* Score Overview (Above Performance Meter) */}
              <ScoreOverview
                performance={performanceScore}
                accessibility={accessibilityScore}
                bestPractices={bestPracticesScore}
                seo={seoScore}
              />

              {/* Performance Score */}
              <div className="flex justify-center">
                <PerformanceScore score={performanceScore} />
              </div>

              {/* Core Web Vitals Failing Banner */}
              {coreWebVitalsFailing && <CriticalMetricBanner delay={0.8} />}
              
              {/* Issues Section */}
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Diagnostic Report</h3>
                  <p className="text-sm text-gray-400">
                    Hover over each issue to understand what affects your website and how to fix it
                  </p>
                </div>

                <div className="space-y-8">
                  <CategorySection
                    title="Performance"
                    icon={Zap}
                    iconColor="text-blue-500"
                    issues={mockIssues.filter((issue) => issue.category === "performance")}
                    criticalIssues={criticalIssues}
                    delay={1.2}
                  />

                  <CategorySection
                    title="Accessibility"
                    icon={Users}
                    iconColor="text-purple-500"
                    issues={mockIssues.filter((issue) => issue.category === "accessibility")}
                    delay={1.4}
                  />

                  <CategorySection
                    title="Best Practices"
                    icon={Shield}
                    iconColor="text-green-500"
                    issues={mockIssues.filter((issue) => issue.category === "bestPractices")}
                    delay={1.6}
                  />

                  <CategorySection
                    title="SEO"
                    icon={Search}
                    iconColor="text-yellow-500"
                    issues={mockIssues.filter((issue) => issue.category === "seo")}
                    delay={1.8}
                  />
                </div>
              </div>

              {/* Overall Assessment / Recommendation Summary */}
              <RecommendationSummary recommendation={recommendation} delay={1.9} />

              {/* Decision Section */}
              <DecisionSection recommendation={recommendation} delay={2.0} />

              {/* Conversion Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.5 }}
                className="border border-gray-800 rounded-lg p-8 bg-gray-900/50 text-center"
              >
                <h3 className="text-2xl font-bold mb-4">Ready to Take Action?</h3>
                <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                  Tools can show you what's wrong, but fixing performance issues depends on your
                  hosting environment, technology stack, and deployment setup. Our experts can
                  analyze your specific situation and implement the right solutions.
                </p>
                <button 
                  onClick={() => setIsContactFormOpen(true)}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors text-lg flex items-center justify-center gap-2 mx-auto"
                >
                  {getCtaText()}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>

              {/* Trust Disclaimer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-xs text-gray-500">
                  Recommendations are based on industry-standard diagnostics and do not replace a full technical audit.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Form Modal */}
        <ContactForm 
          isOpen={isContactFormOpen} 
          onClose={() => setIsContactFormOpen(false)}
          websiteUrl={url}
        />
      </div>
    </div>
  );
}