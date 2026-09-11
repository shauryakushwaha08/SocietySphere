import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { isBookmarked, toggleBookmark } from "../utils/storage";

export default function BookmarkButton({ societyId, showLabel = false, className = "" }) {
  const [bookmarked, setBookmarked] = useState(() => isBookmarked(societyId));

  useEffect(() => {
    function handleSync(e) {
      if (e.detail) {
        setBookmarked(e.detail.includes(societyId));
      }
    }
    window.addEventListener("societysphere:bookmarks-updated", handleSync);
    return () => window.removeEventListener("societysphere:bookmarks-updated", handleSync);
  }, [societyId]);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = toggleBookmark(societyId);
    setBookmarked(updated.includes(societyId));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={bookmarked ? "Remove from saved societies" : "Save society to bookmarks"}
      title={bookmarked ? "Remove from bookmarks" : "Bookmark this society"}
      className={`bookmark-btn ${bookmarked ? "bookmarked" : ""} ${className}`}
    >
      <Bookmark
        size={16}
        className="bookmark-icon"
        fill={bookmarked ? "currentColor" : "none"}
      />
      {showLabel && <span>{bookmarked ? "Saved" : "Save"}</span>}
    </button>
  );
}
