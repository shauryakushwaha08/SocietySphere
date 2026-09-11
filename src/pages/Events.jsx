import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  ArrowRight,
  CheckCircle2,
  CalendarPlus,
} from "lucide-react";
import { campusEvents } from "../data/events";
import { categoryColors } from "../utils/categoryStyles";
import societies from "../data/societies";
import "./Events.css";

const eventTypes = ["All", "Deadline", "Orientation", "Workshop", "Competition"];

export default function Events() {
  const [activeType, setActiveType] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [interestedEvents, setInterestedEvents] = useState(() => {
    try {
      const saved = localStorage.getItem("societysphere_interested_events");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleInterest = (eventId) => {
    let updated;
    if (interestedEvents.includes(eventId)) {
      updated = interestedEvents.filter((id) => id !== eventId);
    } else {
      updated = [...interestedEvents, eventId];
    }
    setInterestedEvents(updated);
    localStorage.setItem("societysphere_interested_events", JSON.stringify(updated));
  };

  const filteredEvents = campusEvents.filter((event) => {
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

  // Helper to generate Google Calendar link
  const createGoogleCalendarUrl = (event) => {
    const title = encodeURIComponent(`${event.title} (${event.societyName})`);
    const details = encodeURIComponent(`${event.description}\n\nOrganized by: ${event.societyName}\nPlatform: SocietySphere`);
    const location = encodeURIComponent(event.venue);
    // Rough date format for Google Calendar (YYYYMMDD)
    const cleanDate = event.date.replace(/-/g, "");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${cleanDate}T100000Z/${cleanDate}T120000Z`;
  };

  return (
    <main className="events-page-container">
      <div className="events-hero-header">
        <div className="section-kicker">
          <Calendar size={14} /> CAMPUS HAPPENINGS
        </div>
        <h1>Events &amp; Deadlines</h1>
        <p className="events-sub">
          Keep tabs on society orientations, open study jams, recruitment deadlines, and athletic trials across NSUT.
        </p>
      </div>

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
                className={`type-pill ${activeType === t ? "active" : ""}`}
                onClick={() => setActiveType(t)}
              >
                {t === "Deadline" ? "Deadlines ⏳" : t}
              </button>
            ))}
          </div>

          <div className="category-pills">
            <span className="filter-title">Focus:</span>
            {["All", "Tech", "Literary", "Sports"].map((cat) => (
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

      {/* Events timeline list */}
      <div className="events-results-header">
        <span>Showing {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}</span>
        {interestedEvents.length > 0 && (
          <span className="interested-counter">
            <CheckCircle2 size={14} /> {interestedEvents.length} Saved to My Schedule
          </span>
        )}
      </div>

      {filteredEvents.length === 0 ? (
        <div className="events-empty-state">
          <Calendar size={32} />
          <h3>No matching events found</h3>
          <p>Try clearing your search query or selecting &ldquo;All&rdquo; types.</p>
          <button
            type="button"
            className="reset-filters-btn"
            onClick={() => {
              setActiveType("All");
              setActiveCategory("All");
              setSearchQuery("");
            }}
          >
            Reset Filters
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
                  <span className="event-type-badge">{event.type}</span>
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
                    onClick={() => toggleInterest(event.id)}
                    aria-label={isSaved ? "Remove from my schedule" : "Save to my schedule"}
                  >
                    <CheckCircle2 size={16} />
                    <span>{isSaved ? "Saved" : "Save Date"}</span>
                  </button>

                  <a
                    href={createGoogleCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="calendar-btn"
                    title="Add to Google Calendar"
                  >
                    <CalendarPlus size={16} />
                    <span>Add to Cal</span>
                  </a>

                  {isDeadline && society?.recruitmentOpen && (
                    <Link to={`/apply/${society.id}`} className="event-apply-btn">
                      Apply Now <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
