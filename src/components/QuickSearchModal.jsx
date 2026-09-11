import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Search, X, ArrowRight, Compass, Calendar, Tag } from "lucide-react";
import societies from "../data/societies";
import { campusEvents } from "../data/events";
import "./QuickSearchModal.css";

export default function QuickSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setQuery("");
    }
  }

  // Focus input and lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 60);
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(true);
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedSocieties = q
    ? societies.filter((s) =>
        `${s.name} ${s.fullName} ${s.tagline} ${s.category} ${s.roles.join(" ")} ${s.tags?.join(" ") || ""}`
          .toLowerCase()
          .includes(q)
      )
    : societies.slice(0, 4);

  const matchedEvents = q
    ? campusEvents.filter((ev) =>
        `${ev.title} ${ev.societyName} ${ev.venue} ${ev.type}`.toLowerCase().includes(q)
      )
    : [];

  const handleSelectSociety = (id) => {
    navigate(`/society/${id}`);
    onClose();
  };

  const handleSelectEvent = () => {
    navigate(`/events`);
    onClose();
  };

  return createPortal(
    <div className="search-modal-backdrop" onClick={onClose}>
      <div
        className="search-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Quick Search"
      >
        <div className="search-modal-header">
          <Search size={20} className="modal-search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search societies, roles, open recruitments, events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-modal-input"
          />
          {query && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close search"
          >
            Esc
          </button>
        </div>

        <div className="search-modal-body">
          {q === "" && (
            <div className="search-suggestions-hint">
              <span>Popular searches:</span>
              <button type="button" onClick={() => setQuery("Tech")}>Tech</button>
              <button type="button" onClick={() => setQuery("Development")}>Development</button>
              <button type="button" onClick={() => setQuery("Design")}>Design</button>
              <button type="button" onClick={() => setQuery("Debate")}>Debate</button>
              <button type="button" onClick={() => setQuery("Deadline")}>Deadlines</button>
            </div>
          )}

          <div className="search-results-group">
            <div className="search-group-title">
              <Compass size={14} /> Societies ({matchedSocieties.length})
            </div>
            {matchedSocieties.length === 0 ? (
              <p className="no-search-match">No societies matching &ldquo;{query}&rdquo;</p>
            ) : (
              matchedSocieties.map((s) => (
                <div
                  key={s.id}
                  className="search-result-item"
                  onClick={() => handleSelectSociety(s.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleSelectSociety(s.id)}
                >
                  <img src={s.logo} alt="" className="search-item-logo" />
                  <div className="search-item-details">
                    <div className="search-item-title-row">
                      <strong>{s.name}</strong>
                      <span className="search-badge category">{s.category}</span>
                      {s.recruitmentOpen && <span className="search-badge open">Recruiting</span>}
                    </div>
                    <span className="search-item-tagline">{s.tagline}</span>
                  </div>
                  <ArrowRight size={15} className="search-item-arrow" />
                </div>
              ))
            )}
          </div>

          {matchedEvents.length > 0 && (
            <div className="search-results-group">
              <div className="search-group-title">
                <Calendar size={14} /> Campus Events & Deadlines ({matchedEvents.length})
              </div>
              {matchedEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="search-result-item"
                  onClick={handleSelectEvent}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleSelectEvent()}
                >
                  <div className="search-item-event-pill">
                    <Tag size={13} />
                  </div>
                  <div className="search-item-details">
                    <div className="search-item-title-row">
                      <strong>{ev.title}</strong>
                      <span className="search-badge date">{ev.date}</span>
                    </div>
                    <span className="search-item-tagline">{ev.societyName} · {ev.venue}</span>
                  </div>
                  <ArrowRight size={15} className="search-item-arrow" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="search-modal-footer">
          <span>Tip: Press <strong>Esc</strong> to close</span>
          <button
            type="button"
            className="view-all-results-link"
            onClick={() => {
              navigate(`/societies?q=${encodeURIComponent(query)}`);
              onClose();
            }}
          >
            Explore all matching societies <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
