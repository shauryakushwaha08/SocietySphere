import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calendar as CalendarIcon,
  Star,
  ExternalLink,
  Flame,
  RotateCcw,
} from "lucide-react";
import { categoryColors } from "../utils/categoryStyles";
import societies from "../data/societies";
import {
  getInterestedEvents,
  toggleInterestedEvent,
} from "../utils/storage";
import "./CampusCalendar.css";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const formatDateKey = (y, m, d) => {
  const mm = String(m).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return `${y}-${mm}-${dd}`;
};

export default function CampusCalendar({
  events = [],
  onToast = () => {},
}) {
  // NSUT Campus reference anchor is September 2026
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 15)); // Sep 15, 2026
  const [selectedDateStr, setSelectedDateStr] = useState("2026-09-25"); // default to a high-profile deadline day
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'deadlines' | 'events' | 'saved'
  const [activeCategory, setActiveCategory] = useState("All");
  const [savedIds, setSavedIds] = useState(getInterestedEvents);

  useEffect(() => {
    const handleStorageUpdate = (e) => {
      if (e.detail) {
        setSavedIds(e.detail);
      } else {
        setSavedIds(getInterestedEvents());
      }
    };
    window.addEventListener("societysphere:saved-events-updated", handleStorageUpdate);
    window.addEventListener("storage", handleStorageUpdate);
    return () => {
      window.removeEventListener("societysphere:saved-events-updated", handleStorageUpdate);
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, []);

  const handleToggleSave = (event) => {
    const updated = toggleInterestedEvent(event.id);
    setSavedIds(updated);
    const isNowSaved = updated.includes(event.id);
    onToast(
      isNowSaved
        ? `Saved "${event.title}" to your schedule!`
        : `Removed "${event.title}" from your schedule.`
    );
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    setCurrentDate(newDate);
    const newY = newDate.getFullYear();
    const newM = newDate.getMonth() + 1;
    const [selY, selM] = (selectedDateStr || "").split("-").map(Number);
    if (selY !== newY || selM !== newM) {
      setSelectedDateStr(formatDateKey(newY, newM, 1));
    }
  };

  const handleNextMonth = () => {
    const newDate = new Date(year, month + 1, 1);
    setCurrentDate(newDate);
    const newY = newDate.getFullYear();
    const newM = newDate.getMonth() + 1;
    const [selY, selM] = (selectedDateStr || "").split("-").map(Number);
    if (selY !== newY || selM !== newM) {
      setSelectedDateStr(formatDateKey(newY, newM, 1));
    }
  };

  const handleToday = () => {
    const today = new Date(2026, 8, 15);
    setCurrentDate(today);
    handleSelectDate("2026-09-15");
  };

  const handleSelectDate = (dateStr) => {
    setSelectedDateStr(dateStr);
    const [y, m] = dateStr.split("-").map(Number);
    if (y !== year || m !== month + 1) {
      setCurrentDate(new Date(y, m - 1, 1));
    }
    if (typeof window !== "undefined" && window.innerWidth < 960) {
      const el = document.getElementById("calendar-day-lineup");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 50);
      }
    }
  };

  // Pre-filter events based on category and type
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchesCategory =
        activeCategory === "All" || ev.category === activeCategory;
      if (!matchesCategory) return false;

      if (activeFilter === "deadlines") return ev.type === "Deadline";
      if (activeFilter === "events") return ev.type !== "Deadline";
      if (activeFilter === "saved") return savedIds.includes(ev.id);
      return true;
    });
  }, [events, activeCategory, activeFilter, savedIds]);

  // Index events by date string (YYYY-MM-DD)
  const eventsByDate = useMemo(() => {
    const map = {};
    filteredEvents.forEach((ev) => {
      if (!map[ev.date]) {
        map[ev.date] = [];
      }
      map[ev.date].push(ev);
    });
    return map;
  }, [filteredEvents]);

  // Calendar cells generation (Monday-indexed)
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // getDay() gives 0 for Sunday, 1 for Monday... Convert to 0 for Monday, 6 for Sunday
    const startDayIndex = (firstDayOfMonth.getDay() + 6) % 7;

    const days = [];

    // Leading padding days from previous month
    const prevMonthDate = new Date(year, month, 0); // last day of prev month
    const prevYear = prevMonthDate.getFullYear();
    const prevMonthNum = prevMonthDate.getMonth() + 1; // 1-12
    const prevMonthDaysCount = prevMonthDate.getDate();

    for (let i = startDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthDaysCount - i;
      const dateStr = formatDateKey(prevYear, prevMonthNum, dayNum);
      days.push({
        date: new Date(prevYear, prevMonthNum - 1, dayNum),
        dateStr,
        dayNum,
        isCurrentMonth: false,
      });
    }

    // Days in current month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = formatDateKey(year, month + 1, d);
      days.push({
        date: new Date(year, month, d),
        dateStr,
        dayNum: d,
        isCurrentMonth: true,
      });
    }

    // Trailing padding days to fill 5 or 6 weeks (up to multiple of 7)
    const remaining = (7 - (days.length % 7)) % 7;
    const nextMonthDate = new Date(year, month + 1, 1);
    const nextYear = nextMonthDate.getFullYear();
    const nextMonthNum = nextMonthDate.getMonth() + 1; // 1-12

    for (let n = 1; n <= remaining; n++) {
      const dateStr = formatDateKey(nextYear, nextMonthNum, n);
      days.push({
        date: new Date(nextYear, nextMonthNum - 1, n),
        dateStr,
        dayNum: n,
        isCurrentMonth: false,
      });
    }

    return days;
  }, [year, month]);

  // Items for the currently selected date
  const selectedDateItems = eventsByDate[selectedDateStr] || [];

  // Key dates in the currently displayed month for quick navigation
  const currentMonthKeyDates = useMemo(() => {
    return filteredEvents
      .filter((ev) => {
        const [y, m] = (ev.date || "").split("-").map(Number);
        return y === year && m === month + 1;
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredEvents, year, month]);

  // Formatted date string for lineup header
  const formattedSelectedDate = useMemo(() => {
    if (!selectedDateStr) return "";
    const [y, m, d] = selectedDateStr.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [selectedDateStr]);

  // Overall monthly stats
  const monthlyStats = useMemo(() => {
    let count = 0;
    let deadlines = 0;
    let saved = 0;
    events.forEach((ev) => {
      const [y, m] = ev.date.split("-").map(Number);
      if (y === year && m === month + 1) {
        count++;
        if (ev.type === "Deadline") deadlines++;
        if (savedIds.includes(ev.id)) saved++;
      }
    });
    return { count, deadlines, saved };
  }, [events, year, month, savedIds]);

  const isToday = (dateStr) => dateStr === "2026-09-15";

  return (
    <div className="campus-calendar-root" id="campus-calendar">
      {/* Calendar Header Controls */}
      <div className="calendar-top-bar">
        <div className="calendar-nav-group">
          <div className="month-selector">
            <button
              type="button"
              className="calendar-nav-btn"
              onClick={handlePrevMonth}
              aria-label="Previous Month"
              title="Previous Month"
            >
              <ChevronLeft size={18} />
            </button>
            <h2 className="month-heading">
              {MONTH_NAMES[month]} <span className="year-sub">{year}</span>
            </h2>
            <button
              type="button"
              className="calendar-nav-btn"
              onClick={handleNextMonth}
              aria-label="Next Month"
              title="Next Month"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <button
            type="button"
            className="calendar-today-btn"
            onClick={handleToday}
            title="Jump to Today (Sep 15, 2026)"
          >
            Today
          </button>
        </div>

        {/* Month High-Level Metrics */}
        <div className="calendar-metrics">
          <span className="cal-metric">
            <strong>{monthlyStats.count}</strong> in {MONTH_NAMES[month].slice(0, 3)}
          </span>
          <span className="cal-metric danger">
            <Flame size={13} />
            <strong>{monthlyStats.deadlines}</strong> Deadlines
          </span>
          {monthlyStats.saved > 0 && (
            <span className="cal-metric saved">
              <Star size={13} />
              <strong>{monthlyStats.saved}</strong> Saved
            </span>
          )}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="calendar-filter-toolbar">
        <div className="cal-type-filters">
          <button
            type="button"
            className={`cal-filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All Lineup
          </button>
          <button
            type="button"
            className={`cal-filter-btn deadline ${activeFilter === "deadlines" ? "active" : ""}`}
            onClick={() => setActiveFilter("deadlines")}
          >
            ⏳ Deadlines Only
          </button>
          <button
            type="button"
            className={`cal-filter-btn events ${activeFilter === "events" ? "active" : ""}`}
            onClick={() => setActiveFilter("events")}
          >
            🎪 Events &amp; Workshops
          </button>
          <button
            type="button"
            className={`cal-filter-btn saved ${activeFilter === "saved" ? "active" : ""}`}
            onClick={() => setActiveFilter("saved")}
          >
            <Star size={13} /> My Saved ({savedIds.length})
          </button>
        </div>

        <div className="cal-cat-filters">
          <span className="cal-filter-label">Focus:</span>
          {["All", "Tech", "Cultural", "Sports", "Literary"].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cal-cat-pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Bar */}
      {(activeFilter !== "all" || activeCategory !== "All") && (
        <div className="active-filters-bar" style={{ marginTop: "0.75rem", marginBottom: "0.75rem" }}>
          <span>Active Filters:</span>
          {activeCategory !== "All" && (
            <span className="filter-tag">
              Focus: {activeCategory}
              <button
                type="button"
                onClick={() => setActiveCategory("All")}
                aria-label="Remove focus filter"
              >
                ×
              </button>
            </span>
          )}
          {activeFilter !== "all" && (
            <span className="filter-tag">
              Type: {activeFilter === "deadlines" ? "Deadlines Only" : activeFilter === "events" ? "Events & Workshops" : "My Saved"}
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                aria-label="Remove type filter"
              >
                ×
              </button>
            </span>
          )}
          <button
            type="button"
            className="reset-all-btn"
            onClick={() => {
              setActiveFilter("all");
              setActiveCategory("All");
            }}
          >
            <RotateCcw size={12} /> Clear filters
          </button>
        </div>
      )}

      {/* Main Dual-Column Workspace: Left Calendar Grid, Right Day Lineup */}
      <div className="calendar-grid-layout">
        {/* Left Column: Interactive Month Grid */}
        <div className="calendar-table-card">
          <div className="calendar-weekdays-row">
            {WEEKDAYS.map((day) => (
              <div key={day} className="weekday-cell">
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-days-grid" role="grid">
            {calendarDays.map((cell, index) => {
              const dayEvents = eventsByDate[cell.dateStr] || [];
              const hasEvents = dayEvents.length > 0;
              const hasDeadline = dayEvents.some((e) => e.type === "Deadline");
              const hasSaved = dayEvents.some((e) => savedIds.includes(e.id));
              const isSelected = cell.dateStr === selectedDateStr;
              const cellIsToday = isToday(cell.dateStr);

              return (
                <div
                  key={`${year}-${month}-${cell.dateStr}-${cell.isCurrentMonth ? "c" : "p"}-${index}`}
                  role="gridcell"
                  tabIndex={0}
                  className={`calendar-day-cell ${
                    !cell.isCurrentMonth ? "other-month" : ""
                  } ${isSelected ? "selected" : ""} ${
                    cellIsToday ? "today" : ""
                  } ${hasEvents ? "has-events" : ""} ${
                    hasDeadline ? "has-deadline" : ""
                  }`}
                  onClick={() => handleSelectDate(cell.dateStr)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelectDate(cell.dateStr);
                    }
                  }}
                  aria-label={`${cell.dateStr}, ${dayEvents.length} events`}
                >
                  <div className="day-number-row">
                    <span className="day-number">{cell.dayNum}</span>
                    {cellIsToday && (
                      <>
                        <span className="today-badge desktop-only">Today</span>
                        <span className="today-dot-mobile mobile-only" title="Today" />
                      </>
                    )}
                    {hasSaved && (
                      <span className="saved-star-indicator" title="Contains saved event">
                        <Star size={11} />
                      </span>
                    )}
                  </div>

                  {/* Badges / Dots for Events on this Day */}
                  {hasEvents && (
                    <div className="day-indicators">
                      {/* Desktop / Tablet: Full Named Chips */}
                      <div className="day-chips-desktop">
                        {dayEvents.slice(0, 2).map((ev) => {
                          const isDead = ev.type === "Deadline";
                          const catColor = categoryColors[ev.category] || "var(--theme)";
                          return (
                            <div
                              key={ev.id}
                              className={`day-event-chip ${isDead ? "deadline" : ""}`}
                              style={{
                                borderLeftColor: isDead ? "var(--danger)" : catColor,
                              }}
                              title={`${ev.title} (${ev.societyName})`}
                            >
                              <span className="chip-text">
                                {isDead ? "⏳ " : ""}
                                {ev.societyName}
                              </span>
                            </div>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <span className="day-more-chip">
                            +{dayEvents.length - 2} more
                          </span>
                        )}
                      </div>

                      {/* Mobile: Colored Status Dot Indicators */}
                      <div className="day-dots-mobile" aria-hidden="true">
                        {dayEvents.slice(0, 3).map((ev) => {
                          const isDead = ev.type === "Deadline";
                          const catColor = isDead
                            ? "var(--danger)"
                            : categoryColors[ev.category] || "var(--theme)";
                          return (
                            <span
                              key={ev.id}
                              className={`calendar-dot ${isDead ? "deadline-dot" : ""}`}
                              style={{ backgroundColor: catColor }}
                            />
                          );
                        })}
                        {dayEvents.length > 3 && (
                          <span className="calendar-dot-more">+{dayEvents.length - 3}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Date Lineup Inspector */}
        <div className="calendar-lineup-card" id="calendar-day-lineup">
          <div className="lineup-header">
            <div>
              <span className="lineup-kicker">
                <CalendarIcon size={14} /> DAY LINEUP
              </span>
              <h3 className="lineup-date-title">{formattedSelectedDate}</h3>
            </div>
            <span className="lineup-count-pill">
              {selectedDateItems.length}{" "}
              {selectedDateItems.length === 1 ? "Item" : "Items"}
            </span>
          </div>

          {selectedDateItems.length === 0 ? (
            <div className="lineup-empty">
              <Sparkles size={28} className="empty-sparkle" />
              <h4>No events or deadlines scheduled</h4>
              <p>
                There are no activities matching your current filters for this date.
                Click on any highlighted day in the calendar to view its lineup.
              </p>

              {/* Quick Jump Suggestions */}
              <div className="quick-lineup-prompt">
                <span className="quick-prompt-label">
                  {currentMonthKeyDates.length > 0
                    ? `Key Dates in ${MONTH_NAMES[month]}:`
                    : `No scheduled dates in ${MONTH_NAMES[month]}`}
                </span>
                {currentMonthKeyDates.length > 0 && (
                  <div className="quick-dates-list">
                    {currentMonthKeyDates.slice(0, 4).map((ev) => (
                      <button
                        key={ev.id}
                        type="button"
                        className={`quick-date-btn ${ev.type === "Deadline" ? "deadline" : ""}`}
                        onClick={() => setSelectedDateStr(ev.date)}
                      >
                        {new Date(ev.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        · {ev.title.length > 20 ? `${ev.title.slice(0, 18)}...` : ev.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="lineup-items-list">
              {selectedDateItems.map((event) => {
                const society = societies.find((s) => s.id === event.societyId);
                const isDeadline = event.type === "Deadline";
                const isSaved = savedIds.includes(event.id);
                const color = categoryColors[event.category] || "var(--theme)";

                return (
                  <article
                    key={event.id}
                    className={`lineup-item-card ${isDeadline ? "deadline-item" : ""}`}
                    style={{ borderLeftColor: isDeadline ? "var(--danger)" : color }}
                  >
                    <div className="lineup-item-top">
                      <Link
                        to={`/society/${event.societyId}`}
                        className="lineup-society-badge"
                      >
                        {society?.logo && (
                          <img
                            src={society.logo}
                            alt=""
                            className="lineup-soc-logo"
                          />
                        )}
                        <span>{event.societyName}</span>
                      </Link>

                      <div className="lineup-badges">
                        <span
                          className={`lineup-type-badge ${
                            isDeadline ? "deadline" : ""
                          }`}
                        >
                          {isDeadline ? "⏳ Deadline" : event.type}
                        </span>
                        <span
                          className="lineup-cat-badge"
                          style={{ color }}
                        >
                          {event.category}
                        </span>
                      </div>
                    </div>

                    <h4 className="lineup-item-title">{event.title}</h4>
                    <p className="lineup-item-desc">{event.description}</p>

                    <div className="lineup-item-meta">
                      <span className="meta-point">
                        <Clock size={13} /> {event.time}
                      </span>
                      <span className="meta-point">
                        <MapPin size={13} /> {event.venue}
                      </span>
                    </div>

                    <div className="lineup-actions-bar">
                      <button
                        type="button"
                        className={`lineup-save-btn ${isSaved ? "saved" : ""}`}
                        onClick={() => handleToggleSave(event)}
                        aria-label={
                          isSaved
                            ? "Remove from saved schedule"
                            : "Save to my schedule"
                        }
                      >
                        <CheckCircle2 size={14} />
                        <span>{isSaved ? "Saved to Schedule" : "Save Date"}</span>
                      </button>

                      {isDeadline && society?.recruitmentOpen ? (
                        <Link
                          to={`/apply/${society.id}`}
                          className="lineup-apply-btn"
                        >
                          Apply Now <ArrowRight size={14} />
                        </Link>
                      ) : (
                        <Link
                          to={`/society/${event.societyId}`}
                          className="lineup-details-link"
                        >
                          Society Info <ExternalLink size={13} />
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
