import { useState, useEffect } from "react";
import { Clock, AlertCircle } from "lucide-react";
import "./DeadlineCountdown.css";

export default function DeadlineCountdown({ deadline, compact = false, showLabel = true }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(deadline));

  function calculateTimeLeft(targetDate) {
    if (!targetDate || typeof targetDate !== "string") {
      return null;
    }

    // Try parsing date string
    // If format is YYYY-MM-DD, set to end of that day (23:59:59)
    let parsed = new Date(targetDate);
    if (targetDate.length === 10 && /^\d{4}-\d{2}-\d{2}$/.test(targetDate)) {
      parsed = new Date(`${targetDate}T23:59:59`);
    }

    const difference = parsed.getTime() - Date.now();

    if (isNaN(difference)) {
      return null;
    }

    if (difference <= 0) {
      return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      expired: false,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    if (!deadline) return;

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft(deadline);
      setTimeLeft(remaining);
      if (remaining && remaining.expired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  if (!timeLeft) {
    return (
      <div className="countdown-static-text">
        <Clock size={compact ? 12 : 14} />
        <span>{deadline}</span>
      </div>
    );
  }

  if (timeLeft.expired) {
    return (
      <div className={`countdown-box expired ${compact ? "compact" : ""}`}>
        <AlertCircle size={compact ? 12 : 15} />
        <span>Recruitment Cycle Ended</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="countdown-compact" title={`Closes in ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}>
        <Clock size={12} className="countdown-pulse-icon" />
        <span className="countdown-compact-time">
          {timeLeft.days > 0 ? `${timeLeft.days}d ` : ""}
          {String(timeLeft.hours).padStart(2, "0")}h:
          {String(timeLeft.minutes).padStart(2, "0")}m:
          {String(timeLeft.seconds).padStart(2, "0")}s
        </span>
      </div>
    );
  }

  return (
    <div className="deadline-countdown-container">
      {showLabel && (
        <div className="countdown-header-label">
          <Clock size={14} className="countdown-pulse-icon" />
          <span>RECRUITMENT APPLICATION CLOSES IN</span>
        </div>
      )}
      <div className="countdown-digits-grid">
        <div className="countdown-digit-cell">
          <span className="digit-val">{String(timeLeft.days).padStart(2, "0")}</span>
          <span className="digit-sub">DAYS</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-digit-cell">
          <span className="digit-val">{String(timeLeft.hours).padStart(2, "0")}</span>
          <span className="digit-sub">HOURS</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-digit-cell">
          <span className="digit-val">{String(timeLeft.minutes).padStart(2, "0")}</span>
          <span className="digit-sub">MINS</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-digit-cell">
          <span className="digit-val seconds">{String(timeLeft.seconds).padStart(2, "0")}</span>
          <span className="digit-sub">SECS</span>
        </div>
      </div>
    </div>
  );
}
