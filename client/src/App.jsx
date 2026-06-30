import { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import './App.css';

const DEFAULT_CODE = `vector<int> v;
for(int i=0;i<n;i++){
  v.push_back(arr[i]);
  if(v.back()>maxVal) maxVal=v.back();
}`;

function App() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [findings, setFindings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('http://localhost:5000/api/analyze', { code });
      setFindings(res.data.findings || []);
    } catch (err) {
      console.error(err);
      setError('Analysis failed. Check that the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>C++ Optimizer</h1>
        <button onClick={handleAnalyze} disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Code'}
        </button>
      </header>

      <div className="main-content">
        <div className="editor-panel">
          <Editor
            height="80vh"
            language="cpp"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
          />
        </div>

        <div className="findings-panel">
          <h2>Findings</h2>
          {error && <p className="error">{error}</p>}
          {!error && findings.length === 0 && !loading && (
            <p className="empty">No findings yet. Paste your code and click Analyze.</p>
          )}
          {findings.map((f, i) => (
            <div key={i} className={`finding ${f.severity || ''}`}>
              <div className="finding-header">
                <span className="line-badge">Line {f.line}</span>
                <span className="rule-name">{f.rule}</span>
              </div>
              <p className="explanation">{f.explanation}</p>
              {f.fixExample && (
                <pre className="fix-example">{f.fixExample}</pre>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;