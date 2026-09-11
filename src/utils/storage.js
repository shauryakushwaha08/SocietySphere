const APPLICATIONS_KEY = "societysphere_applications";
const BOOKMARKS_KEY = "societysphere_bookmarks";
const DRAFTS_KEY_PREFIX = "societysphere_draft_";

export function getApplications() {
  try {
    const data = localStorage.getItem(APPLICATIONS_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((app, index) => ({
      id: app.id || `app_${Date.now()}_${index}`,
      societyId: app.societyId || "",
      societyName: app.societyName || "Unknown Society",
      name: app.name || "",
      email: app.email || "",
      phone: app.phone || "",
      year: app.year || "1st Year",
      branch: app.branch || "",
      role: app.role || "Member",
      why: app.why || "",
      portfolio: app.portfolio || "",
      status: app.status || "Submitted",
      submittedAt: app.submittedAt || new Date().toISOString(),
    }));
  } catch {
    return [];
  }
}

export function saveApplication(application) {
  const applications = getApplications();
  const newApp = {
    ...application,
    id: application.id || `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    status: application.status || "Submitted",
    submittedAt: application.submittedAt || new Date().toISOString(),
  };

  const updated = [newApp, ...applications];
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
  return newApp;
}

export function deleteApplication(id) {
  const applications = getApplications();
  const filtered = applications.filter((app) => app.id !== id);
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(filtered));
  return filtered;
}

export function updateApplicationStatus(id, newStatus) {
  const applications = getApplications();
  const updated = applications.map((app) =>
    app.id === id ? { ...app, status: newStatus } : app
  );
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
  return updated;
}

export function getBookmarks() {
  try {
    const data = localStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleBookmark(societyId) {
  const bookmarks = getBookmarks();
  let updated;
  if (bookmarks.includes(societyId)) {
    updated = bookmarks.filter((id) => id !== societyId);
  } else {
    updated = [...bookmarks, societyId];
  }
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent("societysphere:bookmarks-updated", { detail: updated }));
  return updated;
}

export function isBookmarked(societyId) {
  return getBookmarks().includes(societyId);
}

export function saveDraft(societyId, formData) {
  try {
    localStorage.setItem(`${DRAFTS_KEY_PREFIX}${societyId}`, JSON.stringify(formData));
  } catch (e) {
    console.error("Failed to save draft", e);
  }
}

export function getDraft(societyId) {
  try {
    const data = localStorage.getItem(`${DRAFTS_KEY_PREFIX}${societyId}`);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function clearDraft(societyId) {
  try {
    localStorage.removeItem(`${DRAFTS_KEY_PREFIX}${societyId}`);
  } catch (e) {
    console.error("Failed to clear draft", e);
  }
}
