import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  ArrowRight,
  CheckCircle2,
  Star,
  Layers,
} from "lucide-react";
import { campusEvents } from "../data/events";
import { categoryColors } from "../utils/categoryStyles";
import societies from "../data/societies";
import CampusCalendar from "../components/CampusCalendar";
import {
  getInterestedEvents,
  toggleInterestedEvent,
} from "../utils/storage";
import "./Events.css";

const eventTypes = ["All", "Deadline", "Orientation", "Workshop", "Competition"];

export default function Events({ initialView }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialViewMode =
    initialView || searchParams.get("view") || "calendar";

  const [viewMode, setViewMode] = useState(initialViewMode); // 'calendar' | 'list'
  const [activeType, setActiveType] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showOnlySaved, setShowOnlySaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const [interestedEvents, setInterestedEvents] = useState(getInterestedEvents);

  useEffect(() => {
    const handleStorageUpdate = (e) => {
      if (e.detail) {
        setInterestedEvents(e.detail);
      } else {
        setInterestedEvents(getInterestedEvents());
      }
    };
    window.addEventListener("societysphere:saved-events-updated", handleStorageUpdate);
    window.addEventListener("storage", handleStorageUpdate);
    return () => {
      window.removeEventListener("societysphere:saved-events-updated", handleStorageUpdate);
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const toggleInterest = (event) => {
    const updated = toggleInterestedEvent(event.id);
    setInterestedEvents(updated);
    const isNowSaved = updated.includes(event.id);
    triggerToast(
      isNowSaved
        ? `Saved "${event.title}" to your schedule!`
        : `Removed "${event.title}" from your schedule.`
    );
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("view", mode);
      return next;
    });
  };

  const filteredEvents = campusEvents.filter((event) => {
    if (showOnlySaved && !interestedEvents.includes(event.id)) {
      return false;
    }
    const matchesType = activeType === "All" || event.type === activeType;
    const matchesCategory = activeCategory === "All" || event.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      event.title.toLowerCase().includes(q) ||
      event.societyName.toLowerCase().includes(q) ||
      event.venue.toLowerCase().includes(q) ||
      event.description.toLowerCase().includes(q);

    return matchesType && matchesCategory && matchesSearch;
  });

  return (
    <main className="events-page-container">
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="schedule-toast-banner" role="status">
          <div className="toast-inner">
            <CheckCircle2 size={16} className="toast-icon" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="events-hero-header">
        <div className="section-kicker">
          <Calendar size={14} /> CAMPUS HAPPENINGS
        </div>
        <h1>Events &amp; Deadlines Lineup</h1>
        <p className="events-sub">
          Explore society orientations, workshops, hackathons, and recruitment deadlines all lined up across the semester.
        </p>

        {/* View Switcher: Calendar vs Timeline List */}
        <div className="events-view-switcher" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "calendar"}
            className={`view-toggle-btn ${viewMode === "calendar" ? "active" : ""}`}
            onClick={() => handleViewChange("calendar")}
          >
            <Calendar size={15} />
            <span>Calendar</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "list"}
            className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => handleViewChange("list")}
          >
            <Layers size={15} />
            <span>List ({campusEvents.length})</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Interactive Custom Calendar */}
      {viewMode === "calendar" ? (
        <CampusCalendar
          events={campusEvents}
          onToast={triggerToast}
        />
      ) : (
        /* Mode 2: Timeline List View */
        <div className="events-list-section">
          {/* Filter and Search Toolbar */}
          <div className="events-toolbar-card">
            <div className="events-search-bar">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search events, workshops, orientations, societies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search events"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery("")} className="clear-btn">
                  Clear
                </button>
              )}
            </div>

            <div className="events-filter-row">
              <div className="type-pills">
                <span className="filter-title">Type:</span>
                {eventTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`type-pill ${activeType === t && !showOnlySaved ? "active" : ""}`}
                    onClick={() => {
                      setActiveType(t);
                      setShowOnlySaved(false);
                    }}
                  >
                    {t === "Deadline" ? "Deadlines ⏳" : t}
                  </button>
                ))}

                {/* Direct Saved Schedule Filter */}
                <button
                  type="button"
                  className={`type-pill saved-filter ${showOnlySaved ? "active" : ""}`}
                  onClick={() => setShowOnlySaved((prev) => !prev)}
                >
                  <Star size={13} />
                  <span>My Saved Schedule ({interestedEvents.length})</span>
                </button>
              </div>

              <div className="category-pills">
                <span className="filter-title">Focus:</span>
                {["All", "Tech", "Cultural", "Sports", "Literary"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`category-pill ${activeCategory === cat ? "active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Events timeline results header */}
          <div className="events-results-header">
            <span>
              Showing {filteredEvents.length} {filteredEvents.length === 1 ? "item" : "items"}
              {showOnlySaved ? " in your saved schedule" : ""}
            </span>
            {interestedEvents.length > 0 && !showOnlySaved && (
              <button
                type="button"
                className="saved-quick-jump-btn"
                onClick={() => setShowOnlySaved(true)}
              >
                <CheckCircle2 size={14} /> {interestedEvents.length} Saved to My Schedule (Click to view)
              </button>
            )}
          </div>

          {filteredEvents.length === 0 ? (
            <div className="events-empty-state">
              <Calendar size={32} />
              <h3>
                {showOnlySaved
                  ? "No saved events in your schedule yet"
                  : "No matching events found"}
              </h3>
              <p>
                {showOnlySaved
                  ? "Click 'Save Date' on any workshop, orientation, or deadline to create your custom lineup."
                  : "Try clearing your search query or switching to 'All' categories."}
              </p>
              <button
                type="button"
                className="reset-filters-btn"
                onClick={() => {
                  setActiveType("All");
                  setActiveCategory("All");
                  setShowOnlySaved(false);
                  setSearchQuery("");
                }}
              >
                {showOnlySaved ? "Show All Campus Events" : "Reset Filters"}
              </button>
            </div>
          ) : (
            <div className="events-timeline">
              {filteredEvents.map((event) => {
                const society = societies.find((s) => s.id === event.societyId);
                const color = categoryColors[event.category] || "var(--theme)";
                const isSaved = interestedEvents.includes(event.id);
                const isDeadline = event.type === "Deadline";

                return (
                  <article
                    key={event.id}
                    className={`event-card ${isDeadline ? "deadline-card" : ""}`}
                    style={{ borderLeftColor: isDeadline ? "var(--danger)" : color }}
                  >
                    <div className="event-date-column">
                      <span className="event-month">
                        {new Date(event.date).toLocaleString("default", { month: "short" })}
                      </span>
                      <span className="event-day">
                        {new Date(event.date).getDate()}
                      </span>
                      <span className="event-type-badge">
                        {isDeadline ? "⏳ Deadline" : event.type}
                      </span>
                    </div>

                    <div className="event-content">
                      <div className="event-topline">
                        <Link to={`/society/${event.societyId}`} className="event-society-link">
                          {society && <img src={society.logo} alt="" className="event-society-logo" />}
                          <span>{event.societyName}</span>
                        </Link>
                        <span className="event-category-tag" style={{ color }}>
                          {event.category}
                        </span>
                      </div>

                      <h3 className="event-title">{event.title}</h3>
                      <p className="event-description">{event.description}</p>

                      <div className="event-meta-row">
                        <span className="event-meta-item">
                          <Clock size={14} /> {event.time}
                        </span>
                        <span className="event-meta-item">
                          <MapPin size={14} /> {event.venue}
                        </span>
                      </div>

                      <div className="event-tags-row">
                        {event.tags.map((t) => (
                          <span key={t} className="event-tag">#{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="event-actions-column">
                      <button
                        type="button"
                        className={`rsvp-btn ${isSaved ? "saved" : ""}`}
                        onClick={() => toggleInterest(event)}
                        aria-label={isSaved ? "Remove from my schedule" : "Save to my schedule"}
                      >
                        <CheckCircle2 size={16} />
                        <span>{isSaved ? "Saved" : "Save Date"}</span>
                      </button>

                      {isDeadline && society?.recruitmentOpen && (
                        <Link to={`/apply/${society.id}`} className="event-apply-btn">
                          Apply Now <ArrowRight size={14} />
                        </Link>
                      )}

                      {!isDeadline && (
                        <Link to={`/society/${event.societyId}`} className="event-society-sublink">
                          View Society <ArrowRight size={13} />
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
