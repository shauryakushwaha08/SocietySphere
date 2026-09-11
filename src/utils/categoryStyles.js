export const categoryColors = {
  Tech: "var(--tech)",
  Literary: "var(--literary)",
  Sports: "var(--sports)",
  All: "var(--theme)",
};

export const categoryBgColors = {
  Tech: "rgba(79, 168, 232, 0.12)",
  Literary: "rgba(232, 115, 90, 0.12)",
  Sports: "rgba(232, 179, 57, 0.12)",
  All: "rgba(61, 220, 151, 0.12)",
};

export function getStatusColor(status) {
  switch (status) {
    case "Submitted":
      return "var(--tech)";
    case "Under Review":
      return "var(--sports)";
    case "Interview Scheduled":
      return "var(--theme)";
    case "Accepted":
      return "var(--success)";
    default:
      return "var(--text-soft)";
  }
}
