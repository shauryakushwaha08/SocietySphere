import "./SocietyCardSkeleton.css";

export default function SocietyCardSkeleton({ viewMode = "grid" }) {
  if (viewMode === "list") {
    return (
      <div className="society-list-row skeleton-row">
        <div className="skeleton-box" style={{ width: 24, height: 16 }} />
        <div className="skeleton-box" style={{ width: 44, height: 44, borderRadius: 10 }} />
        <div className="society-info" style={{ gap: 8, display: "flex", flexDirection: "column" }}>
          <div className="skeleton-box" style={{ width: "40%", height: 20 }} />
          <div className="skeleton-box" style={{ width: "70%", height: 14 }} />
          <div style={{ display: "flex", gap: 6 }}>
            <div className="skeleton-box" style={{ width: 60, height: 18, borderRadius: 12 }} />
            <div className="skeleton-box" style={{ width: 70, height: 18, borderRadius: 12 }} />
          </div>
        </div>
        <div className="society-side-meta" style={{ gap: 8, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div className="skeleton-box" style={{ width: 80, height: 22, borderRadius: 12 }} />
          <div className="skeleton-box" style={{ width: 110, height: 32, borderRadius: 6 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="society-card skeleton-card">
      <div className="society-card-header">
        <div className="skeleton-box" style={{ width: 46, height: 46, borderRadius: 12 }} />
        <div style={{ display: "flex", gap: 8 }}>
          <div className="skeleton-box" style={{ width: 60, height: 20, borderRadius: 12 }} />
          <div className="skeleton-box" style={{ width: 28, height: 28, borderRadius: 6 }} />
        </div>
      </div>
      <div className="society-card-body" style={{ gap: 12, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="skeleton-box" style={{ width: 100, height: 18, borderRadius: 10 }} />
          <div className="skeleton-box" style={{ width: 50, height: 18, borderRadius: 10 }} />
        </div>
        <div className="skeleton-box" style={{ width: "65%", height: 24 }} />
        <div className="skeleton-box" style={{ width: "90%", height: 15 }} />
        <div className="skeleton-box" style={{ width: "75%", height: 15 }} />
        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
          <div className="skeleton-box" style={{ width: 54, height: 18, borderRadius: 10 }} />
          <div className="skeleton-box" style={{ width: 64, height: 18, borderRadius: 10 }} />
          <div className="skeleton-box" style={{ width: 58, height: 18, borderRadius: 10 }} />
        </div>
      </div>
      <div className="society-card-footer" style={{ borderTop: "1px solid var(--border)", paddingTop: 12, marginTop: 12, display: "flex", justifyContent: "space-between" }}>
        <div className="skeleton-box" style={{ width: 90, height: 20 }} />
        <div className="skeleton-box" style={{ width: 70, height: 28, borderRadius: 16 }} />
      </div>
    </div>
  );
}
