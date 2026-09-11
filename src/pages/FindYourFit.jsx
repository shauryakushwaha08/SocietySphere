import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle,
  Compass,
  Zap,
  BookOpen,
  Trophy,
  Code,
  Mic,
  Activity,
  Award,
} from "lucide-react";
import societies from "../data/societies";
import { categoryColors } from "../utils/categoryStyles";
import BookmarkButton from "../components/BookmarkButton";
import "./FindYourFit.css";

const questions = [
  {
    id: "interest",
    title: "What are you most excited to explore at campus?",
    subtitle: "Select the domain that naturally catches your curiosity.",
    options: [
      {
        id: "coding",
        label: "Software & Web Development",
        desc: "Building web apps, cloud tech, open-source projects, and collaborating on code.",
        icon: Code,
        categoryWeight: { Tech: 3, Literary: 0, Sports: 0 },
        tags: ["WebDev", "Cloud", "OpenSource", "FullStack"],
      },
      {
        id: "algorithms",
        label: "Algorithms & Problem Solving",
        desc: "Competitive programming contests, DSA puzzles, and algorithmic thinking.",
        icon: Zap,
        categoryWeight: { Tech: 3, Literary: 0, Sports: 0 },
        tags: ["DSA", "CompetitiveCoding", "Algorithms"],
      },
      {
        id: "creative",
        label: "Creative Writing, Debates & Public Speaking",
        desc: "Oratory battles, spoken word poetry, writing campus magazines, and intellectual discourse.",
        icon: Mic,
        categoryWeight: { Tech: 0, Literary: 3, Sports: 0 },
        tags: ["Debate", "Writing", "PublicSpeaking", "Poetry"],
      },
      {
        id: "athletics",
        label: "Sports, Athletics & Event Operations",
        desc: "Competitive sports tournaments, campus leagues, fitness events, and operations.",
        icon: Activity,
        categoryWeight: { Tech: 0, Literary: 0, Sports: 3 },
        tags: ["Athletics", "Football", "Cricket", "Operations"],
      },
    ],
  },
  {
    id: "commitment",
    title: "How many hours weekly can you comfortably dedicate?",
    subtitle: "Be realistic with your academic schedule and lab hours.",
    options: [
      {
        id: "light",
        label: "Light (2 to 4 hours/week)",
        desc: "Attend weekend workshops, occasional meetups, and learn at your own pace.",
        scoreModifier: 1,
      },
      {
        id: "moderate",
        label: "Moderate (5 to 8 hours/week)",
        desc: "Participate in collaborative team projects, regular hackathons, or event preparations.",
        scoreModifier: 2,
      },
      {
        id: "core",
        label: "Enthusiastic Core Contributor (8+ hours/week)",
        desc: "Leading initiatives, organizing flagship fests, and building community infrastructure.",
        scoreModifier: 3,
      },
    ],
  },
  {
    id: "goal",
    title: "What is your #1 goal this semester?",
    subtitle: "Choose the milestone you care about the most right now.",
    options: [
      {
        id: "learn",
        label: "Learn new skills from scratch with peer mentorship",
        desc: "Beginner-friendly cohorts, seniors guiding you step-by-step.",
        icon: BookOpen,
        preferredSocieties: ["gdg", "dcode", "literary"],
      },
      {
        id: "compete",
        label: "Win hackathons, contests, and inter-college tournaments",
        desc: "High competitive spirit, trophy hunting, and representing the institute.",
        icon: Trophy,
        preferredSocieties: ["tds", "ieee", "sports"],
      },
      {
        id: "portfolio",
        label: "Build a solid portfolio & leadership resume",
        desc: "Real-world shipped projects, leading teams, and corporate sponsorships.",
        icon: Award,
        preferredSocieties: ["gdg", "ieee", "sports", "literary"],
      },
    ],
  },
];

export default function FindYourFit() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId, optionId) => {
    const nextAnswers = { ...answers, [questionId]: optionId };
    setAnswers(nextAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
  };

  // Scoring algorithm
  const calculateMatches = () => {
    const selectedInterest = questions[0].options.find((o) => o.id === answers.interest);
    const selectedGoal = questions[2].options.find((o) => o.id === answers.goal);

    return societies.map((soc) => {
      let score = 50; // base score

      // Category matching
      if (selectedInterest?.categoryWeight) {
        const catWeight = selectedInterest.categoryWeight[soc.category] || 0;
        score += catWeight * 14;
      }

      // Tag matching
      if (selectedInterest?.tags && soc.tags) {
        const matchingTags = soc.tags.filter((t) => selectedInterest.tags.includes(t));
        score += matchingTags.length * 6;
      }

      // Goal matching
      if (selectedGoal?.preferredSocieties?.includes(soc.id)) {
        score += 15;
      }

      // Recruitment open bonus
      if (soc.recruitmentOpen) {
        score += 5;
      }

      const matchPercentage = Math.min(Math.round(score), 98);
      return {
        ...soc,
        matchScore: matchPercentage,
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  const rankedSocieties = showResults ? calculateMatches() : [];

  return (
    <main className="find-fit-container">
      <div className="find-fit-header">
        <div className="section-kicker">
          <Sparkles size={14} /> CAMPUS COMPASS
        </div>
        <h1>Find Your Fit</h1>
        <p className="find-fit-sub">
          Answer 3 quick questions about your passions and availability. We&apos;ll match you with the campus societies that align with your goals.
        </p>
      </div>

      {!showResults ? (
        <div className="quiz-card">
          {/* Progress Bar */}
          <div className="quiz-progress-wrapper">
            <div className="quiz-steps-info">
              <span>Question {currentStep + 1} of {questions.length}</span>
              <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% Completed</span>
            </div>
            <div className="quiz-progress-bar">
              <div
                className="quiz-progress-fill"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Question */}
          <div className="question-block">
            <h2>{questions[currentStep].title}</h2>
            <p className="question-sub">{questions[currentStep].subtitle}</p>

            <div className="options-grid">
              {questions[currentStep].options.map((option) => {
                const isSelected = answers[questions[currentStep].id] === option.id;
                const IconComponent = option.icon;

                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`quiz-option-card ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelectOption(questions[currentStep].id, option.id)}
                  >
                    <div className="option-top-row">
                      {IconComponent ? (
                        <div className="option-icon-wrap">
                          <IconComponent size={20} />
                        </div>
                      ) : (
                        <div className="option-bullet" />
                      )}
                      <span className="select-check">
                        {isSelected && <CheckCircle size={18} />}
                      </span>
                    </div>
                    <strong>{option.label}</strong>
                    <p>{option.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {currentStep > 0 && (
            <div className="quiz-nav-row">
              <button
                type="button"
                className="quiz-back-btn"
                onClick={() => setCurrentStep((prev) => prev - 1)}
              >
                Previous question
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="quiz-results-view">
          <div className="results-intro-banner">
            <div className="results-badge">
              <Sparkles size={16} /> MATCH RESULTS
            </div>
            <h2>Here are your top recommended societies:</h2>
            <p>Based on your curiosity, weekly availability, and goals for this semester.</p>
            <button type="button" className="retake-btn" onClick={resetQuiz}>
              <RotateCcw size={15} /> Retake Quiz
            </button>
          </div>

          <div className="ranked-societies-list">
            {rankedSocieties.map((soc, index) => {
              const color = categoryColors[soc.category] || "var(--theme)";
              return (
                <div key={soc.id} className="match-card" style={{ borderLeftColor: color }}>
                  <div className="match-rank-badge">#{index + 1} Best Fit</div>
                  <div className="match-main-content">
                    <div className="match-logo-wrap">
                      <img src={soc.logo} alt={soc.name} />
                    </div>
                    <div className="match-info">
                      <div className="match-title-row">
                        <Link to={`/society/${soc.id}`} className="match-title-link">
                          <h3>{soc.name}</h3>
                        </Link>
                        <span className="match-category-pill" style={{ color }}>
                          {soc.category}
                        </span>
                        <div className="match-score-badge">
                          <strong>{soc.matchScore}%</strong> match
                        </div>
                      </div>
                      <p className="match-tagline">{soc.tagline}</p>
                      <p className="match-desc">{soc.description}</p>
                      <div className="match-tags">
                        {soc.tags?.map((t) => (
                          <span key={t} className="match-tag">#{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="match-card-actions">
                    <BookmarkButton societyId={soc.id} showLabel />
                    <Link to={`/society/${soc.id}`} className="match-details-btn">
                      <Compass size={15} /> View Society
                    </Link>
                    {soc.recruitmentOpen && (
                      <Link to={`/apply/${soc.id}`} className="match-apply-btn">
                        Apply Now <ArrowRight size={15} />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
