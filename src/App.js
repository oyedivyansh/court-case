import React, { useState } from 'react';
import './App.css'; 

const caseTypes = [
  { value: 'CS', label: 'Civil Suit' },
  { value: 'CRLM', label: 'Criminal Misc.' },
  { value: 'WP', label: 'Writ Petition' },
  { value: 'FA', label: 'First Appeal' },
];

function App() {
  const [form, setForm] = useState({
    caseType: '',
    caseNumber: '',
    filingYear: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.caseType) newErrors.caseType = 'Case type is required.';
    if (!form.caseNumber) newErrors.caseNumber = 'Case number is required.';
    if (!form.filingYear || form.filingYear < 1900 || form.filingYear > new Date().getFullYear()) {
      newErrors.filingYear = 'Please enter a valid filing year.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(JSON.stringify(form, null, 2));
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h2 className="form-title">Indian Court Case Lookup ⚖️</h2>
        <p className="form-subtitle">Enter the details below to search for a case.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Case Type</label>
            <select
              name="caseType"
              value={form.caseType}
              onChange={handleChange}
              className={`form-field ${errors.caseType ? 'error' : ''}`}
            >
              <option value="">Select case type</option>
              {caseTypes.map((ct) => (
                <option key={ct.value} value={ct.value}>
                  {ct.label}
                </option>
              ))}
            </select>
            {errors.caseType && <span className="error-message">{errors.caseType}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Case Number</label>
            <input
              type="text"
              name="caseNumber"
              value={form.caseNumber}
              onChange={handleChange}
              placeholder="e.g., 1234"
              className={`form-field ${errors.caseNumber ? 'error' : ''}`}
            />
            {errors.caseNumber && <span className="error-message">{errors.caseNumber}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Filing Year</label>
            <input
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              name="filingYear"
              value={form.filingYear}
              onChange={handleChange}
              placeholder="e.g., 2023"
              className={`form-field ${errors.filingYear ? 'error' : ''}`}
            />
            {errors.filingYear && <span className="error-message">{errors.filingYear}</span>}
          </div>

          <button type="submit" className="submit-button">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;