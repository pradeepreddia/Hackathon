import { useState } from "react";
import { getHealth, postJson } from "./api";

const card: React.CSSProperties = { padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 };
const btn: React.CSSProperties  = { padding: "8px 12px", borderRadius: 8, border: "1px solid #111", cursor: "pointer" };
const input: React.CSSProperties= { padding: 8, border: "1px solid #ccc", borderRadius: 6, width: "100%" };
const pre: React.CSSProperties  = { background: "#0b1020", color: "#e5e7eb", padding: 12, borderRadius: 8, overflow: "auto" };

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 16, display: "grid", gap: 16, maxWidth: 840, margin: "0 auto" }}>
      <h1>Interon — Minimal UI</h1>
      <Health />
      <BudgetVersionForm />
      <WorkflowForm />
    </div>
  );
}

function Health() {
  const [out, setOut] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    try {
      setLoading(true);
      const [b, w] = await Promise.all([
        getHealth("http://localhost:8081/health"),
        getHealth("http://localhost:8082/health")
      ]);
      setOut({ budgeting: b, workflow: w });
    } catch (e: any) {
      setOut({ error: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={card}>
      <h2>Health checks</h2>
      <button onClick={check} disabled={loading} style={btn}>
        {loading ? "Checking..." : "Ping APIs"}
      </button>
      <pre style={pre}>{out ? JSON.stringify(out, null, 2) : "—"}</pre>
    </section>
  );
}

function BudgetVersionForm() {
  const [year, setYear] = useState("2026");
  const [scenario, setScenario] = useState("Base");
  const [owner, setOwner] = useState("finance.admin@interon.io");
  const [resp, setResp] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await postJson("http://localhost:8081/budget-versions", {
        fiscal_year: year, scenario, owner
      });
      setResp(r);
    } catch (e: any) {
      setResp({ error: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={card}>
      <h2>Create Budget Version (mock)</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
        <label>Fiscal Year <input value={year} onChange={(e) => setYear(e.target.value)} style={input}/></label>
        <label>Scenario
          <select value={scenario} onChange={(e) => setScenario(e.target.value)} style={input as any}>
            <option>Base</option><option>Forecast</option><option>Reforecast</option>
          </select>
        </label>
        <label>Owner <input value={owner} onChange={(e) => setOwner(e.target.value)} style={input}/></label>
        <button style={btn} disabled={loading}>{loading ? "Submitting..." : "Create"}</button>
      </form>
      <pre style={pre}>{resp ? JSON.stringify(resp, null, 2) : "—"}</pre>
    </section>
  );
}

function WorkflowForm() {
  const [objType, setObjType] = useState("BudgetVersion");
  const [objId, setObjId] = useState("1");
  const [action, setAction] = useState("Submit");
  const [resp, setResp] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      const r = await postJson("http://localhost:8082/transitions", {
        object_type: objType, object_id: objId, action
      });
      setResp(r);
    } catch (e: any) {
      setResp({ error: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={card}>
      <h2>Workflow Transition (mock)</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
        <label>Object Type <input value={objType} onChange={(e) => setObjType(e.target.value)} style={input}/></label>
        <label>Object ID <input value={objId} onChange={(e) => setObjId(e.target.value)} style={input}/></label>
        <label>Action <input value={action} onChange={(e) => setAction(e.target.value)} style={input}/></label>
        <button style={btn} disabled={loading}>{loading ? "Transitioning..." : "Transition"}</button>
      </form>
      <pre style={pre}>{resp ? JSON.stringify(resp, null, 2) : "—"}</pre>
    </section>
  );
}
