'use client';
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const S = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#040D1E;
  --surface:rgba(7,27,59,0.7);
  --border:rgba(99,184,255,0.15);
  --border2:rgba(99,184,255,0.28);
  --bright:#1E88FF;
  --soft:#63B8FF;
  --ice:#D9F1FF;
  --text:#E8F4FF;
  --muted:#7BA7C9;
  --error:#F87171;
  --success:#4ADE80;
}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
.auth-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;position:relative;overflow:hidden}
.auth-blob{position:fixed;border-radius:50%;filter:blur(120px);pointer-events:none;z-index:0}
.auth-grid{position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:linear-gradient(rgba(30,136,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(30,136,255,0.03) 1px,transparent 1px);
  background-size:60px 60px}
.auth-card{background:rgba(7,20,38,0.85);border:1px solid var(--border2);border-radius:24px;padding:48px;width:100%;max-width:460px;position:relative;z-index:2;backdrop-filter:blur(24px);box-shadow:0 32px 80px rgba(0,0,0,0.5),0 0 60px rgba(30,136,255,0.06)}
.logo{font-size:22px;font-weight:800;color:var(--text);margin-bottom:32px;display:block;text-align:center}
.logo span{background:linear-gradient(135deg,#1E88FF,#63B8FF);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.auth-title{font-size:26px;font-weight:700;letter-spacing:-0.8px;color:#fff;margin-bottom:8px;text-align:center}
.auth-sub{font-size:14px;color:var(--muted);text-align:center;margin-bottom:36px;line-height:1.6}
.auth-sub a{color:var(--bright);text-decoration:none;font-weight:500}
.auth-sub a:hover{text-decoration:underline}
.form-group{margin-bottom:18px}
.form-label{font-size:13px;font-weight:500;color:var(--muted);display:block;margin-bottom:7px}
.form-input{width:100%;background:rgba(30,136,255,0.06);border:1px solid var(--border);border-radius:12px;padding:13px 16px;font-size:14.5px;color:var(--text);font-family:'Plus Jakarta Sans',sans-serif;outline:none;transition:all 0.2s}
.form-input:focus{border-color:var(--bright);background:rgba(30,136,255,0.1);box-shadow:0 0 0 3px rgba(30,136,255,0.12)}
.form-input::placeholder{color:rgba(99,184,255,0.3)}
.form-input.error{border-color:var(--error)}
.field-error{font-size:12px;color:var(--error);margin-top:5px}
.btn-submit{width:100%;background:linear-gradient(135deg,var(--bright),#1565C0);color:white;padding:14px;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;border:none;transition:all 0.2s;font-family:'Plus Jakarta Sans',sans-serif;box-shadow:0 4px 24px rgba(30,136,255,0.3);margin-top:8px}
.btn-submit:hover{transform:translateY(-1px);box-shadow:0 8px 40px rgba(30,136,255,0.45)}
.btn-submit:disabled{opacity:0.6;cursor:not-allowed;transform:none}
.divider{display:flex;align-items:center;gap:12px;margin:24px 0;color:var(--muted);font-size:12.5px}
.divider::before,.divider::after{content:'';flex:1;height:1px;background:var(--border)}
.alert{padding:12px 16px;border-radius:10px;font-size:13.5px;margin-bottom:20px;display:flex;align-items:center;gap:10px}
.alert-error{background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.25);color:var(--error)}
.alert-success{background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.25);color:var(--success)}
.plan-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px}
.plan-card{background:rgba(30,136,255,0.05);border:1px solid var(--border);border-radius:12px;padding:14px;cursor:pointer;transition:all 0.2s;text-align:center}
.plan-card:hover{border-color:var(--border2)}
.plan-card.selected{border-color:var(--bright);background:rgba(30,136,255,0.1)}
.plan-name{font-size:14px;font-weight:600;color:#fff;margin-bottom:4px}
.plan-price{font-size:20px;font-weight:700;color:var(--bright);letter-spacing:-0.5px}
.plan-price span{font-size:12px;color:var(--muted);font-weight:400}
.step-indicator{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:32px}
.step-dot{width:8px;height:8px;border-radius:50%;background:var(--border2);transition:all 0.3s}
.step-dot.active{background:var(--bright);box-shadow:0 0 10px rgba(30,136,255,0.5);width:24px;border-radius:4px}
.step-dot.done{background:var(--success)}
.onboard-icon{font-size:48px;text-align:center;display:block;margin-bottom:16px}
.voice-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px}
.voice-card{background:rgba(30,136,255,0.05);border:1px solid var(--border);border-radius:10px;padding:12px 14px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:10px}
.voice-card:hover{border-color:var(--border2)}
.voice-card.selected{border-color:var(--bright);background:rgba(30,136,255,0.1)}
.voice-emoji{font-size:20px;flex-shrink:0}
.voice-name{font-size:13.5px;font-weight:600;color:#fff}
.voice-desc{font-size:11.5px;color:var(--muted)}
.btn-back{background:transparent;border:1px solid var(--border);color:var(--muted);padding:12px;border-radius:12px;font-size:14px;font-weight:500;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;transition:all 0.2s;flex:1}
.btn-back:hover{border-color:var(--border2);color:var(--text)}
.btn-row{display:flex;gap:10px}
.btn-row .btn-submit{flex:2;margin-top:0}
.success-circle{width:72px;height:72px;border-radius:50%;background:rgba(74,222,128,0.15);border:2px solid var(--success);display:flex;align-items:center;justify-content:center;font-size:32px;margin:0 auto 24px}
.info-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);font-size:13.5px}
.info-row:last-child{border-bottom:none}
.info-key{color:var(--muted)}
.info-val{color:#fff;font-weight:500;font-family:monospace;font-size:13px}
`;

const VOICES = [
  { id: "jennifer", name: "Jennifer", desc: "Warm & professional", emoji: "👩‍💼" },
  { id: "mike",     name: "Mike",     desc: "Calm & confident",    emoji: "👨‍💼" },
  { id: "aria",     name: "Aria",     desc: "Friendly & bright",   emoji: "🌟" },
  { id: "james",    name: "James",    desc: "Deep & authoritative", emoji: "🎙️" },
];

const INDUSTRIES = ["Healthcare","Legal","Real Estate","Finance","Retail","Hospitality","Technology","Other"];

// ---------- SIGN UP PAGE ----------
function SignUpPage({ onSuccess, onLogin }) {
  const [form, setForm] = useState({ name:"", email:"", password:"", confirm:"", industry:"Healthcare" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())          e.name     = "Business name is required";
    if (!form.email.includes("@"))  e.email    = "Enter a valid email";
    if (form.password.length < 8)   e.password = "At least 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setApiError("");
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password, industry: form.industry }),
      });
      const data = await res.json();
      if (!res.ok) { setApiError(data.error || "Registration failed."); return; }
      localStorage.setItem("token", data.token);
      localStorage.setItem("business", JSON.stringify(data.business));
      onSuccess(data.business);
    } catch {
      setApiError("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const set = (k, v) => { setForm(p => ({...p,[k]:v})); setErrors(p => ({...p,[k]:""})); };

  return (
    <div className="auth-wrap">
      <style>{S}</style>
      <div className="auth-blob" style={{width:500,height:500,background:"radial-gradient(circle,rgba(30,136,255,0.1),transparent)",top:-100,left:-100}} />
      <div className="auth-blob" style={{width:400,height:400,background:"radial-gradient(circle,rgba(13,71,161,0.08),transparent)",bottom:-100,right:-100}} />
      <div className="auth-grid" />
      <div className="auth-card">
        <span className="logo">Reception<span>AI</span></span>
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-sub">Start your 14-day free trial — no credit card needed.<br/>Already have an account? <a href="#" onClick={e=>{e.preventDefault();onLogin()}}>Sign in</a></p>

        {apiError && <div className="alert alert-error">⚠ {apiError}</div>}

        <div className="form-group">
          <label className="form-label">Business name</label>
          <input className={`form-input${errors.name?" error":""}`} placeholder="Acme Corp" value={form.name} onChange={e=>set("name",e.target.value)} />
          {errors.name && <div className="field-error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label className="form-label">Industry</label>
          <select className="form-input" value={form.industry} onChange={e=>set("industry",e.target.value)}
            style={{cursor:"pointer",appearance:"none"}}>
            {INDUSTRIES.map(i=><option key={i}>{i}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Work email</label>
          <input className={`form-input${errors.email?" error":""}`} type="email" placeholder="you@company.com" value={form.email} onChange={e=>set("email",e.target.value)} />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className={`form-input${errors.password?" error":""}`} type="password" placeholder="Min. 8 characters" value={form.password} onChange={e=>set("password",e.target.value)} />
          {errors.password && <div className="field-error">{errors.password}</div>}
        </div>
        <div className="form-group">
          <label className="form-label">Confirm password</label>
          <input className={`form-input${errors.confirm?" error":""}`} type="password" placeholder="Repeat password" value={form.confirm} onChange={e=>set("confirm",e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&handleSubmit()} />
          {errors.confirm && <div className="field-error">{errors.confirm}</div>}
        </div>

        <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating account…" : "Create free account →"}
        </button>

        <p style={{fontSize:12,color:"var(--muted)",textAlign:"center",marginTop:16,lineHeight:1.6}}>
          By signing up you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

// ---------- LOGIN PAGE ----------
function LoginPage({ onSuccess, onSignUp }) {
  const [form, setForm]     = useState({ email:"", password:"" });
  const [apiError, setApiError] = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async () => {
    if (!form.email || !form.password) { setApiError("Please fill in all fields."); return; }
    setLoading(true); setApiError("");
    try {
      const res  = await fetch(`${API}/api/auth/login`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setApiError(data.error || "Login failed."); return; }
      localStorage.setItem("token", data.token);
      localStorage.setItem("business", JSON.stringify(data.business));
      onSuccess(data.business, false);
    } catch { setApiError("Network error."); }
    finally { setLoading(false); }
  };

  const set = (k,v) => { setForm(p=>({...p,[k]:v})); setApiError(""); };

  return (
    <div className="auth-wrap">
      <style>{S}</style>
      <div className="auth-blob" style={{width:500,height:500,background:"radial-gradient(circle,rgba(30,136,255,0.1),transparent)",top:-100,right:-100}} />
      <div className="auth-grid" />
      <div className="auth-card">
        <span className="logo">Reception<span>AI</span></span>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to your dashboard.<br/>No account yet? <a href="#" onClick={e=>{e.preventDefault();onSignUp()}}>Start free trial</a></p>

        {apiError && <div className="alert alert-error">⚠ {apiError}</div>}

        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" placeholder="you@company.com" value={form.email} onChange={e=>set("email",e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="Your password" value={form.password} onChange={e=>set("password",e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&handleSubmit()} />
        </div>

        <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
          {loading ? "Signing in…" : "Sign in →"}
        </button>

        <div className="divider">or</div>
        <button className="btn-submit" style={{background:"rgba(30,136,255,0.08)",boxShadow:"none",border:"1px solid var(--border2)",color:"var(--soft)"}}
          onClick={onSignUp}>
          Create a new account
        </button>
      </div>
    </div>
  );
}

// ---------- ONBOARDING WIZARD ----------
function Onboarding({ business, onDone }) {
  const [step, setStep]           = useState(0);
  const [agentName, setAgentName] = useState("Nova");
  const [industry]                = useState(business?.industry || "your industry");
  const [voice, setVoice]         = useState("jennifer");
  const [hours, setHours]         = useState("Mon–Fri, 9am–5pm");
  const [prompt, setPrompt]       = useState(`You are ${agentName}, a professional AI receptionist for ${business?.name}. Greet callers warmly, identify their needs, and either help them directly, book an appointment, or take a message.`);
  const [plan, setPlan]           = useState("enterprise");
  const [loading, setLoading]     = useState(false);
  const [apiError, setApiError]   = useState("");
  const STEPS = 4;

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const createAgent = async () => {
    setLoading(true); setApiError("");
    try {
      const res = await fetch(`${API}/api/agents`, {
        method:"POST",
        headers:{"Content-Type":"application/json","Authorization":`Bearer ${token}`},
        body: JSON.stringify({ name:agentName, role:"General Receptionist", emoji:"🤖", system_prompt:prompt, voice_id:voice, fallback:"transfer" }),
      });
      const data = await res.json();
      if (!res.ok) { setApiError(data.error||"Could not create agent."); setLoading(false); return; }
      setStep(s=>s+1);
    } catch { setApiError("Network error."); }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-wrap">
      <style>{S}</style>
      <div className="auth-blob" style={{width:600,height:600,background:"radial-gradient(circle,rgba(30,136,255,0.08),transparent)",top:-150,left:-150}} />
      <div className="auth-grid" />
      <div className="auth-card" style={{maxWidth:500}}>
        <span className="logo">Reception<span>AI</span></span>

        {/* Step indicators */}
        <div className="step-indicator">
          {Array.from({length:STEPS}).map((_,i)=>(
            <div key={i} className={`step-dot ${i<step?"done":""} ${i===step?"active":""}`} />
          ))}
        </div>

        {/* STEP 0 — Welcome */}
        {step===0 && (
          <>
            <span className="onboard-icon">🎉</span>
            <h1 className="auth-title">Welcome, {business?.name}!</h1>
            <p className="auth-sub" style={{marginBottom:28}}>Let's set up your AI receptionist in 3 quick steps. It takes less than 2 minutes.</p>
            <div style={{background:"rgba(30,136,255,0.06)",border:"1px solid var(--border)",borderRadius:12,padding:16,marginBottom:24}}>
              {[["Your AI agent","Answers every call automatically"],["Phone number","Get a real number in seconds"],["Dashboard","Manage everything in one place"]].map(([t,d])=>(
                <div key={t} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0",borderBottom:"1px solid var(--border)",fontSize:13.5}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:"var(--success)",flexShrink:0}} />
                  <div><span style={{color:"#fff",fontWeight:500}}>{t}</span><span style={{color:"var(--muted)"}}> — {d}</span></div>
                </div>
              ))}
            </div>
            <button className="btn-submit" onClick={()=>setStep(1)}>Let's get started →</button>
          </>
        )}

        {/* STEP 1 — Agent persona */}
        {step===1 && (
          <>
            <h1 className="auth-title">Name your AI agent</h1>
            <p className="auth-sub" style={{marginBottom:24}}>This is the name callers will hear when they call your business.</p>

            {apiError && <div className="alert alert-error">⚠ {apiError}</div>}

            <div className="form-group">
              <label className="form-label">Agent name</label>
              <input className="form-input" value={agentName} onChange={e=>{setAgentName(e.target.value);setPrompt(`You are ${e.target.value}, a professional AI receptionist for ${business?.name}. Greet callers warmly, identify their needs, and either help them directly, book an appointment, or take a message.`)}} placeholder="e.g. Nova, Aria, Alex" />
            </div>

            <div className="form-group">
              <label className="form-label">Choose a voice</label>
              <div className="voice-grid">
                {VOICES.map(v=>(
                  <div key={v.id} className={`voice-card ${voice===v.id?"selected":""}`} onClick={()=>setVoice(v.id)}>
                    <span className="voice-emoji">{v.emoji}</span>
                    <div><div className="voice-name">{v.name}</div><div className="voice-desc">{v.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Business hours</label>
              <input className="form-input" value={hours} onChange={e=>setHours(e.target.value)} placeholder="Mon–Fri, 9am–5pm" />
            </div>

            <div className="form-group">
              <label className="form-label">Agent instructions</label>
              <textarea className="form-input" rows={4} value={prompt} onChange={e=>setPrompt(e.target.value)} style={{resize:"vertical",lineHeight:1.6}} />
            </div>

            <div className="btn-row">
              <button className="btn-back" onClick={()=>setStep(0)}>← Back</button>
              <button className="btn-submit" onClick={createAgent} disabled={loading}>
                {loading ? "Creating agent…" : "Create agent →"}
              </button>
            </div>
          </>
        )}

        {/* STEP 2 — Choose plan */}
        {step===2 && (
          <>
            <h1 className="auth-title">Choose your plan</h1>
            <p className="auth-sub" style={{marginBottom:24}}>You're on a free trial — no charge until it ends.</p>

            <div className="plan-row">
              <div className={`plan-card ${plan==="starter"?"selected":""}`} onClick={()=>setPlan("starter")}>
                <div className="plan-name">Starter</div>
                <div className="plan-price">$299<span>/mo</span></div>
                <div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>+ $0.08/min</div>
              </div>
              <div className={`plan-card ${plan==="enterprise"?"selected":""}`} onClick={()=>setPlan("enterprise")}
                style={plan==="enterprise"?{borderColor:"var(--bright)"}:{}}>
                <div style={{fontSize:10,color:"var(--bright)",fontWeight:600,marginBottom:4,letterSpacing:1}}>POPULAR</div>
                <div className="plan-name">Enterprise</div>
                <div className="plan-price">$799<span>/mo</span></div>
                <div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>+ $0.06/min</div>
              </div>
            </div>

            <div style={{background:"rgba(74,222,128,0.07)",border:"1px solid rgba(74,222,128,0.2)",borderRadius:10,padding:12,marginBottom:20,fontSize:13,color:"var(--success)",display:"flex",gap:10,alignItems:"center"}}>
              <span>✓</span> 14-day free trial — cancel anytime. We'll remind you before charging.
            </div>

            <div className="btn-row">
              <button className="btn-back" onClick={()=>setStep(1)}>← Back</button>
              <button className="btn-submit" style={{flex:2,marginTop:0}} onClick={()=>setStep(3)}>
                Continue with {plan==="starter"?"Starter":"Enterprise"} →
              </button>
            </div>
          </>
        )}

        {/* STEP 3 — All done */}
        {step===3 && (
          <>
            <div className="success-circle">🚀</div>
            <h1 className="auth-title">You're all set!</h1>
            <p className="auth-sub" style={{marginBottom:24}}>Your AI receptionist is ready. Here's your setup summary:</p>

            <div style={{background:"rgba(30,136,255,0.05)",border:"1px solid var(--border)",borderRadius:12,padding:"4px 16px",marginBottom:24}}>
              <div className="info-row"><span className="info-key">Business</span><span className="info-val">{business?.name}</span></div>
              <div className="info-row"><span className="info-key">AI agent</span><span className="info-val">{agentName}</span></div>
              <div className="info-row"><span className="info-key">Voice</span><span className="info-val">{VOICES.find(v=>v.id===voice)?.name}</span></div>
              <div className="info-row"><span className="info-key">Plan</span><span className="info-val">{plan==="starter"?"Starter — $299/mo":"Enterprise — $799/mo"}</span></div>
              <div className="info-row"><span className="info-key">Trial ends</span><span className="info-val">{new Date(Date.now()+14*86400000).toLocaleDateString()}</span></div>
            </div>

            <div style={{background:"rgba(74,222,128,0.07)",border:"1px solid rgba(74,222,128,0.2)",borderRadius:10,padding:12,marginBottom:24,fontSize:13,color:"var(--success)"}}>
              ✓ Agent created · ✓ Dashboard ready · ✓ Free trial active
            </div>

            <button className="btn-submit" onClick={onDone}>
              Go to my dashboard →
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ---------- MAIN EXPORT — AuthFlow ----------
export default function AuthFlow({ onAuthenticated }) {
  const [screen, setScreen] = useState("signup"); // signup | login | onboard
  const [business, setBusiness] = useState(null);

  const handleSignUpSuccess = (biz) => {
    setBusiness(biz);
    setScreen("onboard");
  };

  const handleLoginSuccess = (biz, isNew = false) => {
    if (isNew) { setBusiness(biz); setScreen("onboard"); }
    else { onAuthenticated && onAuthenticated(biz); }
  };

  const handleOnboardDone = () => {
    onAuthenticated && onAuthenticated(business);
  };

  if (screen === "login")   return <LoginPage  onSuccess={handleLoginSuccess} onSignUp={()=>setScreen("signup")} />;
  if (screen === "onboard") return <Onboarding business={business} onDone={handleOnboardDone} />;
  return <SignUpPage onSuccess={handleSignUpSuccess} onLogin={()=>setScreen("login")} />;
}
