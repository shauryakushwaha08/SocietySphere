export const categoryColors = {
  Technical: "var(--tech)",
  Tech: "var(--tech)",
  Cultural: "var(--cultural)",
  Entrepreneurship: "var(--entrepreneurship)",
  Literary: "var(--literary)",
  Social: "var(--social)",
  Sports: "var(--sports)",
  Automotive: "var(--automotive)",
  All: "var(--theme)",
};

export const categoryBgColors = {
  Technical: "var(--tech-subtle)",
  Tech: "var(--tech-subtle)",
  Cultural: "var(--cultural-subtle)",
  Entrepreneurship: "var(--entrepreneurship-subtle)",
  Literary: "var(--literary-subtle)",
  Social: "var(--social-subtle)",
  Sports: "var(--sports-subtle)",
  Automotive: "var(--automotive-subtle)",
  All: "var(--theme-subtle)",
};

export const categoryCodes = {
  Technical: "TECH",
  Tech: "TECH",
  Cultural: "CULT",
  Entrepreneurship: "ENTR",
  Literary: "LIT",
  Social: "SOC",
  Sports: "SPRT",
  Automotive: "AUTO",
  All: "ALL",
};

export const categoryPillClasses = {
  Technical: "bg-sky-500/10 text-sky-400 border-sky-500/30",
  Tech: "bg-sky-500/10 text-sky-400 border-sky-500/30",
  Cultural: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  Entrepreneurship: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  Literary: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Social: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  Sports: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  Automotive: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
  All: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
};

export function getCategoryColor(category) {
  return categoryColors[category] || "var(--theme)";
}

export function getCategoryBg(category) {
  return categoryBgColors[category] || "var(--theme-subtle)";
}

export function getCategoryCode(category) {
  return categoryCodes[category] || category?.slice(0, 4)?.toUpperCase() || "CLUB";
}

export function getStatusColor(status) {
  switch (status) {
    case "Submitted":
      return "var(--tech)";
    case "Under Review":
      return "var(--literary)";
    case "Interview Scheduled":
      return "var(--sports)";
    case "Accepted":
      return "var(--success)";
    default:
      return "var(--text-soft)";
  }
}
