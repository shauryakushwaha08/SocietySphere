import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
  updateProfile as updateProfileUtil,
  loginAsDemoStudent,
} from "../utils/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());
  const [authModalState, setAuthModalState] = useState({
    isOpen: false,
    mode: "login",
    onSuccessCallback: null,
  });

  useEffect(() => {
    const handleAuthChange = (e) => {
      setUser(e.detail || null);
    };

    window.addEventListener("societysphere:auth-changed", handleAuthChange);
    return () => {
      window.removeEventListener("societysphere:auth-changed", handleAuthChange);
    };
  }, []);

  const openAuthModal = (mode = "login", onSuccessCallback = null) => {
    setAuthModalState({
      isOpen: true,
      mode,
      onSuccessCallback,
    });
  };

  const closeAuthModal = () => {
    setAuthModalState((prev) => ({
      ...prev,
      isOpen: false,
      onSuccessCallback: null,
    }));
  };

  const login = async (email, password) => {
    const loggedUser = loginUser(email, password);
    setUser(loggedUser);
    if (authModalState.onSuccessCallback) {
      authModalState.onSuccessCallback(loggedUser);
    }
    closeAuthModal();
    return loggedUser;
  };

  const loginDemo = async () => {
    const demoUser = loginAsDemoStudent();
    setUser(demoUser);
    if (authModalState.onSuccessCallback) {
      authModalState.onSuccessCallback(demoUser);
    }
    closeAuthModal();
    return demoUser;
  };

  const register = async (userData) => {
    const registeredUser = registerUser(userData);
    setUser(registeredUser);
    if (authModalState.onSuccessCallback) {
      authModalState.onSuccessCallback(registeredUser);
    }
    closeAuthModal();
    return registeredUser;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const updateUser = (updates) => {
    const updated = updateProfileUtil(updates);
    setUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        loginDemo,
        register,
        logout,
        updateUser,
        authModal: authModalState,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
