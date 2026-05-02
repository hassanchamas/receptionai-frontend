"use client";
import { useState } from "react";

const ACCENT = "#00C896";
const ACCENT2 = "#0EA5E9";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@600;700;800&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'DM Sans', sans-serif;
  background: #0B0F1A;
  color: #E2E8F0;
}

:root {
  --accent: #00C896;
  --accent2: #0EA5E9;
  --bg: #0B0F1A;
  --surface: #131825;
  --surface2: #1A2035;
  --surface3: #222840;
  --border: rgba(255,255,255,0.07);
  --border2: rgba(255,255,255,0.12);
  --text: #E2E8F0;
  --muted: #6B7A99;
  --muted2: #8B97B5;
}

.sidebar {
  width: 240px;
  min-height: 100vh;
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 0;
  position: fixed;
  top: 0; left: 0;
}

.logo-area {
  padding: 24px 20px 20px;
  border-bottom: 1px solid var(--border);
}

.logo {
  font-family: 'Syne', sans-serif;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.logo span {
  color: var(--accent);
}

.logo-tag {
  font-size: 11px;
  color: var(--muted);
  margin-top: 2px;
  font-weight: 400;
}

.nav-section {
  padding: 16px 12px 0;
  flex: 1;
}

.nav-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--muted);
  padding: 0 8px;
  margin-bottom: 6px;
  margin-top: 16px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13.5px;
  font-weight: 400;
  color: var(--muted2);
  transition: all 0.15s;
  margin-bottom: 2px;
  border: 1px solid transparent;
}

.nav-item:hover {
  background: var(--surface2);
  color: var(--text);
}

.nav-item.active {
  background: rgba(0,200,150,0.1);
  border-color: rgba(0,200,150,0.2);
  color: var(--accent);
  font-weight: 500;
}

.nav-icon {
  width: 16px;
  height: 16px;
  opacity: 0.8;
}

.nav-badge {
  margin-left: auto;
  background: var(--accent);
  color: #0B0F1A;
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 20px;
}

.sidebar-bottom {
  padding: 16px 12px;
  border-top: 1px solid var(--border);
}

.user-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  background: var(--surface2);
  cursor: pointer;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #0B0F1A;
  flex-shrink: 0;
}

.user-info { flex: 1; min-width: 0; }
.user-name { font-size: 12.5px; font-weight: 500; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-plan { font-size: 11px; color: var(--accent); }

.main {
  margin-left: 240px;
  min-height: 100vh;
  background: var(--bg);
}

.topbar {
  height: 60px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  background: var(--bg);
  position: sticky;
  top: 0;
  z-index: 10;
}

.page-title {
  font-family: 'Syne', sans-serif;
  font-size: 17px;
  font-weight: 700;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.15s;
  font-family: 'DM Sans', sans-serif;
}

.btn-primary {
  background: var(--accent);
  color: #0B0F1A;
}

.btn-primary:hover { background: #00e0aa; }

.btn-secondary {
  background: var(--surface2);
  color: var(--text);
  border: 1px solid var(--border2);
}

.btn-secondary:hover { background: var(--surface3); }

.btn-ghost {
  background: transparent;
  color: var(--muted2);
  border: 1px solid var(--border);
}

.btn-ghost:hover { color: var(--text); border-color: var(--border2); }

.content {
  padding: 28px;
}

/* STATS GRID */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 24px;
}

.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  opacity: 0;
  transition: opacity 0.2s;
}

.stat-card:hover::before { opacity: 1; }

.stat-label {
  font-size: 12px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 10px;
}

.stat-value {
  font-family: 'Syne', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--text);
  line-height: 1;
  margin-bottom: 8px;
}

.stat-change {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-change.up { color: var(--accent); }
.stat-change.down { color: #F87171; }

.stat-icon {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(0,200,150,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

/* TWO COL LAYOUT */
.two-col {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 16px;
  margin-bottom: 16px;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
}

.card-title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text);
}

.card-body { padding: 20px; }

/* CALL LOG TABLE */
.call-table { width: 100%; border-collapse: collapse; }
.call-table th {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--muted);
  text-align: left;
  padding: 0 0 12px 0;
  border-bottom: 1px solid var(--border);
  font-weight: 500;
}

.call-table td {
  padding: 12px 0;
  font-size: 13px;
  border-bottom: 1px solid var(--border);
  color: var(--muted2);
}

.call-table td:first-child { color: var(--text); }

.call-table tr:last-child td { border-bottom: none; }

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11.5px;
  font-weight: 500;
}

.status-pill.handled {
  background: rgba(0,200,150,0.1);
  color: var(--accent);
}

.status-pill.missed {
  background: rgba(248,113,113,0.1);
  color: #F87171;
}

.status-pill.transferred {
  background: rgba(14,165,233,0.1);
  color: var(--accent2);
}

.status-pill.booked {
  background: rgba(168,85,247,0.1);
  color: #A855F7;
}

/* AGENT CONFIG */
.agent-card {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  transition: all 0.15s;
}

.agent-card:hover { border-color: var(--border2); }
.agent-card.selected { border-color: var(--accent); background: rgba(0,200,150,0.05); }

.agent-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.agent-info { flex: 1; }
.agent-name { font-size: 13.5px; font-weight: 600; margin-bottom: 3px; }
.agent-desc { font-size: 12px; color: var(--muted); }

.toggle {
  position: relative;
  width: 36px;
  height: 20px;
  flex-shrink: 0;
}

.toggle input { opacity: 0; width: 0; height: 0; }

.toggle-track {
  position: absolute;
  inset: 0;
  background: var(--surface3);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle input:checked + .toggle-track { background: var(--accent); }

.toggle-thumb {
  position: absolute;
  top: 3px; left: 3px;
  width: 14px; height: 14px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
}

.toggle input:checked ~ .toggle-thumb { transform: translateX(16px); }

/* ACTIVITY FEED */
.activity-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}

.activity-item:last-child { border-bottom: none; }

.activity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 5px;
  flex-shrink: 0;
}

.activity-text { font-size: 13px; color: var(--muted2); line-height: 1.5; }
.activity-text strong { color: var(--text); font-weight: 500; }
.activity-time { font-size: 11px; color: var(--muted); margin-top: 3px; }

/* TEAMS INTEGRATION */
.integration-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
}

.integration-row:last-child { border-bottom: none; }

.int-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background: var(--surface2);
  flex-shrink: 0;
}

.int-info { flex: 1; }
.int-name { font-size: 13.5px; font-weight: 500; margin-bottom: 2px; }
.int-desc { font-size: 12px; color: var(--muted); }

/* FORM */
.form-group { margin-bottom: 18px; }
.form-label { font-size: 12.5px; font-weight: 500; margin-bottom: 7px; display: block; color: var(--muted2); }
.form-input {
  width: 100%;
  background: var(--surface2);
  border: 1px solid var(--border2);
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 13.5px;
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  transition: border-color 0.15s;
  outline: none;
}
.form-input:focus { border-color: var(--accent); }
.form-textarea { min-height: 80px; resize: vertical; }
.form-select {
  width: 100%;
  background: var(--surface2);
  border: 1px solid var(--border2);
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 13.5px;
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  outline: none;
  cursor: pointer;
}

/* CHART BAR */
.mini-chart {
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 64px;
  padding-top: 8px;
}

.chart-bar {
  flex: 1;
  background: rgba(0,200,150,0.15);
  border-radius: 4px 4px 0 0;
  transition: background 0.15s;
  cursor: pointer;
  min-height: 4px;
}

.chart-bar:hover { background: rgba(0,200,150,0.4); }
.chart-bar.today { background: var(--accent); }

/* TABS */
.tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border);
  padding: 0 20px;
}

.tab {
  padding: 11px 16px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  color: var(--muted);
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: all 0.15s;
}

.tab:hover { color: var(--text); }
.tab.active { color: var(--accent); border-bottom-color: var(--accent); }

/* CALL DETAIL PANEL */
.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
  font-size: 13px;
}

.detail-row:last-child { border-bottom: none; }
.detail-key { color: var(--muted); }
.detail-val { color: var(--text); font-weight: 500; }

/* NOTIFICATION DOT */
.notif-dot {
  width: 8px; height: 8px;
  background: var(--accent);
  border-radius: 50%;
  display: inline-block;
}

/* PHONE NUMBER CARD */
.phone-card {
  background: linear-gradient(135deg, rgba(0,200,150,0.1), rgba(14,165,233,0.05));
  border: 1px solid rgba(0,200,150,0.2);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.phone-number {
  font-family: 'Syne', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 1px;
}

/* EMPTY STATE */
.empty {
  text-align: center;
  padding: 40px 20px;
  color: var(--muted);
  font-size: 13px;
}
`;

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "⊞", section: "main" },
  { id: "agents", label: "AI Agents", icon: "◈", section: "main" },
  { id: "calls", label: "Call Logs", icon: "◷", section: "main", badge: "3" },
  { id: "chat", label: "Live Chat", icon: "◻", section: "main" },
  { id: "bookings", label: "Bookings", icon: "⊡", section: "main" },
  { id: "teams", label: "MS Teams", icon: "⬡", section: "integrations" },
  { id: "phone", label: "Phone Numbers", icon: "◎", section: "integrations" },
  { id: "settings", label: "Settings", icon: "◫", section: "settings" },
];

const CALLS = [
  { id: 1, caller: "+1 (416) 555-0192", time: "2 min ago", duration: "3:42", status: "handled", intent: "Booking enquiry" },
  { id: 2, caller: "+1 (647) 555-0871", time: "18 min ago", duration: "1:15", status: "transferred", intent: "Billing question" },
  { id: 3, caller: "+1 (905) 555-0344", time: "34 min ago", duration: "2:08", status: "booked", intent: "Appointment booked" },
  { id: 4, caller: "+1 (416) 555-0550", time: "1h ago", duration: "0:45", status: "missed", intent: "Unknown" },
  { id: 5, caller: "+1 (289) 555-0663", time: "2h ago", duration: "4:21", status: "handled", intent: "Product info" },
  { id: 6, caller: "+1 (416) 555-0129", time: "3h ago", duration: "2:55", status: "booked", intent: "Service booking" },
];

const AGENTS = [
  { id: 1, name: "Nova", role: "General Receptionist", emoji: "🤖", color: "#00C896", active: true, calls: 142 },
  { id: 2, name: "Aria", role: "Appointment Specialist", emoji: "📅", color: "#A855F7", active: true, calls: 87 },
  { id: 3, name: "Rex", role: "Sales Qualifier", emoji: "💼", color: "#0EA5E9", active: false, calls: 34 },
];

const ACTIVITY = [
  { color: "#00C896", text: <><strong>Nova</strong> handled a call from +1 (416) 555-0192 — booking enquiry resolved</>, time: "2 min ago" },
  { color: "#A855F7", text: <><strong>Aria</strong> booked an appointment for Dr. Patel on May 5th at 2pm</>, time: "18 min ago" },
  { color: "#0EA5E9", text: <>Teams notification sent to <strong>#front-desk</strong> — call transferred</>, time: "34 min ago" },
  { color: "#F87171", text: <>Missed call from +1 (416) 555-0550 — voicemail recorded</>, time: "1h ago" },
  { color: "#00C896", text: <><strong>Nova</strong> answered 5 calls today without human intervention</>, time: "2h ago" },
];

const BAR_HEIGHTS = [30, 45, 25, 60, 80, 55, 90, 70, 85, 65, 95, 75, 100, 45];

export default function App() {
  const [page, setPage] = useState("overview");
  const [agentTab, setAgentTab] = useState(0);
  const [agents, setAgents] = useState(AGENTS);
  const [selectedCall, setSelectedCall] = useState(null);
  const [showNewAgent, setShowNewAgent] = useState(false);

  const toggleAgent = (id) => {
    setAgents(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  return (
    <>
      <style>{styles}</style>
      <div style={{ display: "flex" }}>

        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="logo-area">
            <div className="logo">Reception<span>AI</span></div>
            <div className="logo-tag">AI Receptionist Platform</div>
          </div>

          <div className="nav-section">
            <div className="nav-label">Main</div>
            {NAV_ITEMS.filter(n => n.section === "main").map(item => (
              <div
                key={item.id}
                className={`nav-item ${page === item.id ? "active" : ""}`}
                onClick={() => setPage(item.id)}
              >
                <span style={{ fontSize: 15 }}>{item.icon}</span>
                {item.label}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}

            <div className="nav-label">Integrations</div>
            {NAV_ITEMS.filter(n => n.section === "integrations").map(item => (
              <div
                key={item.id}
                className={`nav-item ${page === item.id ? "active" : ""}`}
                onClick={() => setPage(item.id)}
              >
                <span style={{ fontSize: 15 }}>{item.icon}</span>
                {item.label}
              </div>
            ))}

            <div className="nav-label">Account</div>
            {NAV_ITEMS.filter(n => n.section === "settings").map(item => (
              <div
                key={item.id}
                className={`nav-item ${page === item.id ? "active" : ""}`}
                onClick={() => setPage(item.id)}
              >
                <span style={{ fontSize: 15 }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>

          <div className="sidebar-bottom">
            <div className="user-card">
              <div className="avatar">HQ</div>
              <div className="user-info">
                <div className="user-name">Hassan's Business</div>
                <div className="user-plan">Pro Plan</div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="main">
          <div className="topbar">
            <div className="page-title">
              {page === "overview" && "Dashboard"}
              {page === "agents" && "AI Agents"}
              {page === "calls" && "Call Logs"}
              {page === "chat" && "Live Chat"}
              {page === "bookings" && "Bookings"}
              {page === "teams" && "Microsoft Teams"}
              {page === "phone" && "Phone Numbers"}
              {page === "settings" && "Settings"}
            </div>
            <div className="topbar-actions">
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00C896", boxShadow: "0 0 8px #00C896" }} />
              <span style={{ fontSize: 12, color: "var(--muted)", marginRight: 8 }}>System live</span>
              {page === "agents" && (
                <button className="btn btn-primary" onClick={() => setShowNewAgent(true)}>+ New Agent</button>
              )}
              {page === "overview" && (
                <button className="btn btn-secondary">↓ Export report</button>
              )}
            </div>
          </div>

          <div className="content">

            {/* ---- OVERVIEW PAGE ---- */}
            {page === "overview" && (
              <>
                <div className="stats-grid">
                  {[
                    { label: "Calls today", value: "47", change: "+12%", up: true, icon: "📞" },
                    { label: "AI handled", value: "91%", change: "+3%", up: true, icon: "🤖" },
                    { label: "Appointments", value: "12", change: "+5", up: true, icon: "📅" },
                    { label: "Avg call time", value: "2:34", change: "-0:18", up: true, icon: "⏱" },
                  ].map((s, i) => (
                    <div className="stat-card" key={i}>
                      <div className="stat-icon">{s.icon}</div>
                      <div className="stat-label">{s.label}</div>
                      <div className="stat-value">{s.value}</div>
                      <div className={`stat-change ${s.up ? "up" : "down"}`}>
                        {s.up ? "▲" : "▼"} {s.change} vs yesterday
                      </div>
                    </div>
                  ))}
                </div>

                <div className="two-col">
                  {/* Call volume chart */}
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title">Call volume — today</div>
                      <span style={{ fontSize: 12, color: "var(--muted)" }}>47 total calls</span>
                    </div>
                    <div className="card-body">
                      <div className="mini-chart">
                        {BAR_HEIGHTS.map((h, i) => (
                          <div
                            key={i}
                            className={`chart-bar ${i === BAR_HEIGHTS.length - 1 ? "today" : ""}`}
                            style={{ height: `${h}%` }}
                            title={`${h > 80 ? "Peak" : "Normal"} hour`}
                          />
                        ))}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "var(--muted)" }}>
                        <span>8am</span><span>10am</span><span>12pm</span><span>2pm</span><span>4pm</span><span>6pm</span>
                      </div>

                      <div style={{ marginTop: 20 }}>
                        <div className="call-table" style={{ marginTop: 0 }}>
                          <table className="call-table">
                            <thead>
                              <tr>
                                <th>Caller</th>
                                <th>Intent</th>
                                <th>Duration</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {CALLS.slice(0, 4).map(c => (
                                <tr key={c.id} style={{ cursor: "pointer" }} onClick={() => { setSelectedCall(c); setPage("calls"); }}>
                                  <td>{c.caller}</td>
                                  <td>{c.intent}</td>
                                  <td>{c.duration}</td>
                                  <td>
                                    <span className={`status-pill ${c.status}`}>
                                      {c.status === "handled" ? "✓" : c.status === "missed" ? "✕" : c.status === "transferred" ? "→" : "📅"} {c.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Activity feed */}
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title">Live activity</div>
                      <span className="notif-dot" />
                    </div>
                    <div className="card-body">
                      {ACTIVITY.map((a, i) => (
                        <div className="activity-item" key={i}>
                          <div className="activity-dot" style={{ background: a.color }} />
                          <div>
                            <div className="activity-text">{a.text}</div>
                            <div className="activity-time">{a.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Active agents strip */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Active agents</div>
                    <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => setPage("agents")}>Manage →</button>
                  </div>
                  <div className="card-body" style={{ display: "flex", gap: 12 }}>
                    {agents.filter(a => a.active).map(a => (
                      <div key={a.id} style={{ flex: 1, background: "var(--surface2)", borderRadius: 10, padding: "14px 16px", border: "1px solid var(--border)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                          <span style={{ fontSize: 22 }}>{a.emoji}</span>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 600 }}>{a.name}</div>
                            <div style={{ fontSize: 12, color: "var(--muted)" }}>{a.role}</div>
                          </div>
                          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00C896" }} />
                            <span style={{ fontSize: 11, color: "#00C896" }}>Live</span>
                          </div>
                        </div>
                        <div style={{ fontSize: 12, color: "var(--muted)" }}>{a.calls} calls handled total</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ---- AGENTS PAGE ---- */}
            {page === "agents" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 16 }}>
                <div>
                  <div className="card" style={{ marginBottom: 16 }}>
                    <div className="card-header">
                      <div className="card-title">Your AI Agents</div>
                      <span style={{ fontSize: 12, color: "var(--muted)" }}>{agents.filter(a => a.active).length} active</span>
                    </div>
                    <div className="card-body">
                      {agents.map(a => (
                        <div key={a.id} className={`agent-card ${agentTab === a.id ? "selected" : ""}`} onClick={() => setAgentTab(a.id)}>
                          <div className="agent-avatar" style={{ background: `${a.color}22` }}>
                            {a.emoji}
                          </div>
                          <div className="agent-info">
                            <div className="agent-name">{a.name}</div>
                            <div className="agent-desc">{a.role} · {a.calls} calls</div>
                          </div>
                          <label className="toggle" onClick={e => e.stopPropagation()}>
                            <input type="checkbox" checked={a.active} onChange={() => toggleAgent(a.id)} />
                            <div className="toggle-track" />
                            <div className="toggle-thumb" />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Agent Config Panel */}
                <div className="card">
                  {agentTab === 0 ? (
                    <div className="empty">
                      <div style={{ fontSize: 32, marginBottom: 12 }}>◈</div>
                      <div>Select an agent to configure</div>
                    </div>
                  ) : (
                    <>
                      <div className="tabs">
                        {["Persona", "Behaviour", "Routing", "Voice"].map((t, i) => (
                          <div key={t} className={`tab ${showNewAgent === i ? "active" : ""}`} onClick={() => setShowNewAgent(i)}
                            style={{ borderBottomColor: showNewAgent === i ? ACCENT : "transparent", color: showNewAgent === i ? ACCENT : "var(--muted)" }}>
                            {t}
                          </div>
                        ))}
                      </div>
                      <div className="card-body">
                        {(() => {
                          const agent = agents.find(a => a.id === agentTab);
                          return (
                            <>
                              <div className="form-group">
                                <label className="form-label">Agent name</label>
                                <input className="form-input" defaultValue={agent.name} />
                              </div>
                              <div className="form-group">
                                <label className="form-label">Role / purpose</label>
                                <input className="form-input" defaultValue={agent.role} />
                              </div>
                              <div className="form-group">
                                <label className="form-label">System prompt</label>
                                <textarea className="form-input form-textarea" defaultValue={`You are ${agent.name}, a friendly AI receptionist for this business. Always greet callers warmly, gather their intent, and either resolve it or route them to the right person.`} />
                              </div>
                              <div className="form-group">
                                <label className="form-label">Fallback action</label>
                                <select className="form-select">
                                  <option>Transfer to human</option>
                                  <option>Take a message</option>
                                  <option>Book a callback</option>
                                  <option>Send Teams notification</option>
                                </select>
                              </div>
                              <button className="btn btn-primary" style={{ width: "100%" }}>Save changes</button>
                            </>
                          );
                        })()}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* ---- CALLS PAGE ---- */}
            {page === "calls" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">All calls</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn btn-ghost" style={{ fontSize: 12 }}>↓ Export</button>
                      <select className="form-select" style={{ width: "auto", fontSize: 12, padding: "5px 10px" }}>
                        <option>Today</option>
                        <option>This week</option>
                        <option>This month</option>
                      </select>
                    </div>
                  </div>
                  <div className="card-body">
                    <table className="call-table">
                      <thead>
                        <tr>
                          <th>Caller</th>
                          <th>Intent</th>
                          <th>Time</th>
                          <th>Duration</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CALLS.map(c => (
                          <tr key={c.id} style={{ cursor: "pointer", background: selectedCall?.id === c.id ? "rgba(0,200,150,0.04)" : "transparent" }} onClick={() => setSelectedCall(c)}>
                            <td style={{ fontFamily: "monospace", fontSize: 13 }}>{c.caller}</td>
                            <td>{c.intent}</td>
                            <td style={{ color: "var(--muted)", fontSize: 12 }}>{c.time}</td>
                            <td>{c.duration}</td>
                            <td>
                              <span className={`status-pill ${c.status}`}>
                                {c.status === "handled" ? "✓" : c.status === "missed" ? "✕" : c.status === "transferred" ? "→" : "📅"} {c.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Call detail */}
                <div className="card">
                  {!selectedCall ? (
                    <div className="empty">
                      <div style={{ fontSize: 32, marginBottom: 12 }}>◷</div>
                      <div>Select a call to see details</div>
                    </div>
                  ) : (
                    <>
                      <div className="card-header">
                        <div className="card-title">Call detail</div>
                        <span className={`status-pill ${selectedCall.status}`}>{selectedCall.status}</span>
                      </div>
                      <div className="card-body">
                        <div className="detail-row"><span className="detail-key">Caller</span><span className="detail-val" style={{ fontFamily: "monospace", fontSize: 13 }}>{selectedCall.caller}</span></div>
                        <div className="detail-row"><span className="detail-key">Time</span><span className="detail-val">{selectedCall.time}</span></div>
                        <div className="detail-row"><span className="detail-key">Duration</span><span className="detail-val">{selectedCall.duration}</span></div>
                        <div className="detail-row"><span className="detail-key">Intent</span><span className="detail-val">{selectedCall.intent}</span></div>
                        <div className="detail-row"><span className="detail-key">Agent</span><span className="detail-val">Nova</span></div>
                        <div className="detail-row"><span className="detail-key">Teams notified</span><span className="detail-val" style={{ color: ACCENT }}>✓ Yes</span></div>

                        <div style={{ marginTop: 16, marginBottom: 8, fontSize: 12, color: "var(--muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.8px" }}>Transcript</div>
                        <div style={{ background: "var(--surface2)", borderRadius: 8, padding: 12, fontSize: 12.5, color: "var(--muted2)", lineHeight: 1.7, border: "1px solid var(--border)" }}>
                          <div><strong style={{ color: ACCENT }}>Nova:</strong> Good afternoon! Thank you for calling. How can I help you today?</div>
                          <div style={{ marginTop: 8 }}><strong style={{ color: "var(--muted2)" }}>Caller:</strong> Hi, I'd like to book an appointment.</div>
                          <div style={{ marginTop: 8 }}><strong style={{ color: ACCENT }}>Nova:</strong> Of course! I'd be happy to help with that. What date works best for you?</div>
                        </div>

                        <button className="btn btn-secondary" style={{ width: "100%", marginTop: 14, fontSize: 13 }}>▶ Play recording</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* ---- CHAT PAGE ---- */}
            {page === "chat" && (
              <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16 }}>
                <div className="card">
                  <div className="card-header"><div className="card-title">Active chats</div></div>
                  {[
                    { name: "Visitor #1821", msg: "Do you offer weekend appointments?", time: "now", unread: true },
                    { name: "Visitor #1820", msg: "What are your prices?", time: "3m", unread: false },
                    { name: "Visitor #1819", msg: "Thanks for your help!", time: "12m", unread: false },
                  ].map((c, i) => (
                    <div key={i} style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", cursor: "pointer", background: i === 0 ? "rgba(0,200,150,0.04)" : "transparent" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</span>
                        <span style={{ fontSize: 11, color: "var(--muted)" }}>{c.time}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "var(--muted)", display: "flex", justifyContent: "space-between" }}>
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{c.msg}</span>
                        {c.unread && <span style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, display: "inline-block", flexShrink: 0, marginLeft: 6, marginTop: 3 }} />}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card" style={{ display: "flex", flexDirection: "column" }}>
                  <div className="card-header">
                    <div>
                      <div className="card-title">Visitor #1821</div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>Chatting now · AI handling</div>
                    </div>
                    <button className="btn btn-secondary" style={{ fontSize: 12 }}>Take over chat</button>
                  </div>
                  <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", gap: 12, minHeight: 300 }}>
                    {[
                      { from: "visitor", text: "Hi, do you offer weekend appointments?" },
                      { from: "ai", text: "Hello! Yes, we do offer weekend appointments on Saturdays from 9am to 3pm. Would you like to book one?" },
                      { from: "visitor", text: "Yes please, Saturday morning works." },
                      { from: "ai", text: "Great! I have Saturday 10am or 11am available. Which works best for you?" },
                    ].map((m, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: m.from === "visitor" ? "flex-start" : "flex-end" }}>
                        <div style={{
                          maxWidth: "70%",
                          padding: "10px 14px",
                          borderRadius: m.from === "visitor" ? "4px 12px 12px 12px" : "12px 4px 12px 12px",
                          background: m.from === "visitor" ? "var(--surface2)" : `rgba(0,200,150,0.15)`,
                          color: m.from === "visitor" ? "var(--text)" : "var(--text)",
                          fontSize: 13.5,
                          lineHeight: 1.5,
                          border: `1px solid ${m.from === "visitor" ? "var(--border)" : "rgba(0,200,150,0.2)"}`,
                        }}>
                          {m.from === "ai" && <div style={{ fontSize: 11, color: ACCENT, marginBottom: 4, fontWeight: 500 }}>◈ Nova (AI)</div>}
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "14px 20px", borderTop: "1px solid var(--border)", display: "flex", gap: 10 }}>
                    <input className="form-input" placeholder="AI is handling this conversation…" disabled style={{ opacity: 0.5 }} />
                    <button className="btn btn-primary">Send</button>
                  </div>
                </div>
              </div>
            )}

            {/* ---- BOOKINGS PAGE ---- */}
            {page === "bookings" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16 }}>
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Upcoming appointments</div>
                    <button className="btn btn-secondary" style={{ fontSize: 12 }}>+ Manual booking</button>
                  </div>
                  <div className="card-body">
                    {[
                      { name: "Sarah Mitchell", date: "Today, 2:00 PM", type: "Consultation", agent: "Aria" },
                      { name: "James Park", date: "Today, 4:30 PM", type: "Follow-up", agent: "Aria" },
                      { name: "Emma Thompson", date: "Tomorrow, 10:00 AM", type: "New client", agent: "Nova" },
                      { name: "Michael Chen", date: "Tomorrow, 1:15 PM", type: "Consultation", agent: "Aria" },
                      { name: "Priya Sharma", date: "Sat, May 3 · 10:00 AM", type: "Assessment", agent: "Nova" },
                    ].map((b, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(168,85,247,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>📅</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 2 }}>{b.name}</div>
                          <div style={{ fontSize: 12, color: "var(--muted)" }}>{b.date} · {b.type}</div>
                        </div>
                        <span style={{ fontSize: 11, color: ACCENT, background: "rgba(0,200,150,0.1)", padding: "3px 8px", borderRadius: 20 }}>via {b.agent}</span>
                        <button className="btn btn-ghost" style={{ fontSize: 12, padding: "5px 10px" }}>Manage</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <div className="card-header"><div className="card-title">Booking settings</div></div>
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Calendar provider</label>
                      <select className="form-select">
                        <option>Cal.com</option>
                        <option>Google Calendar</option>
                        <option>Outlook Calendar</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Appointment duration</label>
                      <select className="form-select">
                        <option>30 minutes</option>
                        <option>45 minutes</option>
                        <option>60 minutes</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Availability</label>
                      <select className="form-select">
                        <option>Mon–Fri, 9am–5pm</option>
                        <option>Mon–Sat, 9am–3pm</option>
                        <option>Custom</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Confirmation email</label>
                      <select className="form-select">
                        <option>Send via SendGrid</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                    <button className="btn btn-primary" style={{ width: "100%" }}>Save settings</button>
                  </div>
                </div>
              </div>
            )}

            {/* ---- TEAMS PAGE ---- */}
            {page === "teams" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
                <div>
                  <div className="phone-card" style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 28 }}>⬡</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>Microsoft Teams — Connected</div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>hassan@yourbusiness.com</div>
                    </div>
                    <span style={{ background: "rgba(0,200,150,0.1)", color: ACCENT, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 500 }}>✓ Active</span>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <div className="card-title">Notification rules</div>
                      <button className="btn btn-primary" style={{ fontSize: 12 }}>+ Add rule</button>
                    </div>
                    <div className="card-body">
                      {[
                        { trigger: "Call transferred", channel: "#front-desk", who: "Any agent", active: true },
                        { trigger: "Missed call", channel: "#alerts", who: "Any agent", active: true },
                        { trigger: "Appointment booked", channel: "#bookings", who: "Aria only", active: true },
                        { trigger: "New voicemail", channel: "#front-desk", who: "Any agent", active: false },
                      ].map((r, i) => (
                        <div key={i} className="integration-row">
                          <div className="int-icon">🔔</div>
                          <div className="int-info">
                            <div className="int-name">{r.trigger}</div>
                            <div className="int-desc">→ {r.channel} · {r.who}</div>
                          </div>
                          <label className="toggle">
                            <input type="checkbox" defaultChecked={r.active} />
                            <div className="toggle-track" />
                            <div className="toggle-thumb" />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header"><div className="card-title">Teams config</div></div>
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Default channel</label>
                      <input className="form-input" defaultValue="#front-desk" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Notification format</label>
                      <select className="form-select">
                        <option>Adaptive card (rich)</option>
                        <option>Plain text</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Escalation contact</label>
                      <input className="form-input" defaultValue="@hassan" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Tenant ID</label>
                      <input className="form-input" defaultValue="••••••••-••••-••••" type="password" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Bot app ID</label>
                      <input className="form-input" placeholder="From Azure portal" />
                    </div>
                    <button className="btn btn-primary" style={{ width: "100%" }}>Save Teams config</button>
                    <button className="btn btn-ghost" style={{ width: "100%", marginTop: 8 }}>Send test notification</button>
                  </div>
                </div>
              </div>
            )}

            {/* ---- PHONE NUMBERS PAGE ---- */}
            {page === "phone" && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                  {[
                    { number: "+1 (416) 555-0100", label: "Main line", agent: "Nova", status: "active" },
                    { number: "+1 (647) 555-0200", label: "Bookings line", agent: "Aria", status: "active" },
                  ].map((p, i) => (
                    <div key={i} className="phone-card">
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>{p.label} · routed to {p.agent}</div>
                        <div className="phone-number">{p.number}</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <button className="btn btn-ghost" style={{ fontSize: 11 }}>Edit</button>
                        <button className="btn btn-ghost" style={{ fontSize: 11 }}>Copy</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Add a phone number</div>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>Powered by Twilio</span>
                  </div>
                  <div className="card-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 12, alignItems: "end" }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Area code</label>
                      <input className="form-input" placeholder="e.g. 416" />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Country</label>
                      <select className="form-select">
                        <option>Canada (+1)</option>
                        <option>USA (+1)</option>
                        <option>UK (+44)</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Assign to agent</label>
                      <select className="form-select">
                        {agents.map(a => <option key={a.id}>{a.name}</option>)}
                      </select>
                    </div>
                    <button className="btn btn-primary">Search numbers</button>
                  </div>
                </div>
              </div>
            )}

            {/* ---- SETTINGS PAGE ---- */}
            {page === "settings" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="card">
                  <div className="card-header"><div className="card-title">Business profile</div></div>
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Business name</label>
                      <input className="form-input" defaultValue="Hassan's Business" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Industry</label>
                      <select className="form-select">
                        <option>Healthcare</option>
                        <option>Legal</option>
                        <option>Real Estate</option>
                        <option>Retail</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Business hours</label>
                      <input className="form-input" defaultValue="Mon–Fri, 9:00 AM – 5:00 PM" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">After-hours message</label>
                      <textarea className="form-input form-textarea" defaultValue="Thanks for calling! We're currently closed. Our hours are Mon–Fri 9am to 5pm. Please leave a message or call back then." />
                    </div>
                    <button className="btn btn-primary">Save profile</button>
                  </div>
                </div>

                <div>
                  <div className="card" style={{ marginBottom: 16 }}>
                    <div className="card-header"><div className="card-title">API keys</div></div>
                    <div className="card-body">
                      {[
                        { name: "Vapi.ai API key", placeholder: "vapi_live_••••••••", connected: true },
                        { name: "OpenAI API key", placeholder: "sk-••••••••", connected: true },
                        { name: "Twilio Auth token", placeholder: "AC••••••••", connected: true },
                        { name: "SendGrid API key", placeholder: "SG.••••••••", connected: false },
                      ].map((k, i) => (
                        <div key={i} className="form-group">
                          <label className="form-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            {k.name}
                            <span style={{ color: k.connected ? ACCENT : "var(--muted)", fontSize: 11 }}>{k.connected ? "✓ connected" : "not set"}</span>
                          </label>
                          <input className="form-input" type="password" defaultValue={k.connected ? k.placeholder : ""} placeholder={k.placeholder} />
                        </div>
                      ))}
                      <button className="btn btn-primary">Save keys</button>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header"><div className="card-title">Plan & billing</div></div>
                    <div className="card-body">
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 3 }}>Pro Plan</div>
                          <div style={{ fontSize: 12, color: "var(--muted)" }}>$79 / month · renews June 1</div>
                        </div>
                        <span style={{ background: "rgba(0,200,150,0.1)", color: ACCENT, padding: "4px 12px", borderRadius: 20, fontSize: 12, height: "fit-content" }}>Active</span>
                      </div>
                      {[
                        { label: "AI minutes used", value: "342 / 1,000 min" },
                        { label: "Agents", value: "3 / 5" },
                        { label: "Phone numbers", value: "2 / 3" },
                      ].map((u, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                          <span style={{ color: "var(--muted)" }}>{u.label}</span>
                          <span style={{ fontWeight: 500 }}>{u.value}</span>
                        </div>
                      ))}
                      <button className="btn btn-secondary" style={{ marginTop: 14, fontSize: 13 }}>Upgrade plan</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
