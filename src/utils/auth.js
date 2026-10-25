const AUTH_USER_KEY = "societysphere_auth_user";
const USERS_DB_KEY = "societysphere_registered_users";

export const NSUT_BRANCHES = [
  "Computer Science and Engineering (Artificial Intelligence) (CSAI)",
  "Computer Science and Engineering (CSE)",
  "Computer Science and Engineering (Data Science) (CSDS)",
  "Information Technology (IT)",
  "Electronics & Communication (ECE)",
  "Instrumentation & Control (ICE)",
  "Mathematics & Computing (MAC)",
  "Electrical Engineering (EE)",
  "Mechanical Engineering (ME)",
  "Biotechnology (BT)",
  "Design (B.Des)",
  "Management Studies (BBA)",
];

export const ACADEMIC_YEARS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
];


// Initialize registered users database if not present
function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    if (!raw) {
      const initial = [];
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveRegisteredUsers(users) {
  try {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  } catch (err) {
    console.error("Failed to save registered users to localStorage", err);
  }
}

// Get the currently logged-in user or null
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Log in with email and password
export function loginUser(email, password) {
  const cleanEmail = (email || "").trim().toLowerCase();
  const users = getRegisteredUsers();

  // Find user by email
  const user = users.find((u) => u.email.toLowerCase() === cleanEmail);

  if (!user) {
    throw new Error("No student account found with this email. Please register first.");
  }

  // Check password if user has one stored
  if (user.password && user.password !== password) {
    throw new Error("Invalid password. Please check your credentials.");
  }

  // Create session object (without password)
  const sessionUser = { ...user };
  delete sessionUser.password;
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(sessionUser));

  // Dispatch global event for reactive UI updates
  window.dispatchEvent(new CustomEvent("societysphere:auth-changed", { detail: sessionUser }));
  return sessionUser;
}

// Register a new student account
export function registerUser(userData) {
  const users = getRegisteredUsers();
  const cleanEmail = (userData.email || "").trim().toLowerCase();

  if (!cleanEmail) {
    throw new Error("Email address is required.");
  }

  if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
    throw new Error("An account with this email already exists. Please log in.");
  }

  // Generate initials for avatar
  const initials = userData.name
    ? userData.name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "ST";

  const newUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: userData.name.trim(),
    email: cleanEmail,
    rollNo: (userData.rollNo || "").trim().toUpperCase(),
    branch: userData.branch || "Computer Engineering (CSE)",
    year: userData.year || "1st Year",
    phone: (userData.phone || "").trim(),
    cgpa: (userData.cgpa || "").trim(),
    bio: (userData.bio || "").trim(),
    portfolio: (userData.portfolio || "").trim(),
    linkedin: (userData.linkedin || "").trim(),
    skills: Array.isArray(userData.skills) ? userData.skills : [],
    password: userData.password,
    avatar: initials,
    role: "student",
    verified: cleanEmail.endsWith("nsut.ac.in"),
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [...users, newUser];
  saveRegisteredUsers(updatedUsers);

  // Auto-login registered user
  const sessionUser = { ...newUser };
  delete sessionUser.password;
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(sessionUser));

  window.dispatchEvent(new CustomEvent("societysphere:auth-changed", { detail: sessionUser }));
  return sessionUser;
}

// Update active student's profile
export function updateProfile(updatedFields) {
  const current = getCurrentUser();
  if (!current) throw new Error("You must be logged in to update your profile.");

  const users = getRegisteredUsers();
  const updatedUser = {
    ...current,
    ...updatedFields,
  };

  // Re-generate initials if name changed
  if (updatedFields.name) {
    updatedUser.avatar = updatedFields.name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  // Update in session
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updatedUser));

  // Update in registered users database
  const updatedUsers = users.map((u) => (u.id === current.id ? { ...u, ...updatedFields } : u));
  saveRegisteredUsers(updatedUsers);

  window.dispatchEvent(new CustomEvent("societysphere:auth-changed", { detail: updatedUser }));
  return updatedUser;
}

// Log out current session
export function logoutUser() {
  localStorage.removeItem(AUTH_USER_KEY);
  window.dispatchEvent(new CustomEvent("societysphere:auth-changed", { detail: null }));
}
