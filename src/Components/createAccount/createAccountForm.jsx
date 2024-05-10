import axios from "axios";
import React, { useState, useEffect } from "react";
import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `${BACKEND_URL}/users`;

function CreateAccountForm() {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  useEffect(() => {
    // Fetch form structure from backend
    const fetchFormStructure = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/form-structure`);
        if (Array.isArray(data.data.fields)) {
          setFormFields(data.data.fields);
          initializeFormData(data.data.fields);
        } else {
          throw new Error('Form structure is not an array.');
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch form structure.");
      }
    };

  fetchFormStructure();
}, []);

  // Initialize form data based on fetched form structure
  const initializeFormData = (fields) => {
    const initialData = {};
    fields.forEach(field => {
      initialData[field.fld_nm] = field.default || '';
    });
    //setFormData(initialData);
    return initialData;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(USERS_ENDPOINT, formData);
      if (response.status === 200) {
        setSuccess("Account created successfully!");
        setFormData(initializeFormData(formFields)); // Reset form data to initial state
        setError(""); // Clear any previous errors

        // Optional: Redirect to login page after a delay
        setTimeout(() => {
          window.location.href = '/login'; // Adjust the URL to your login route
        }, 3000); // Redirect after 3 seconds
      } else {
        throw new Error('Failed to create account');
      }
    } catch (error) {
      setError("Failed to submit form.");
      setSuccess(""); // Clear any previous success messages
    }
  };

  return (
    <div className="login-container">
      <h2>Member Registration</h2>
      <form onSubmit={handleSubmit}>
        {Array.isArray(formFields) && formFields.map(field => (
          <div key={field.fld_nm} className="form-group">
            <label htmlFor={field.fld_nm}>{field.qstn}</label>
            {field.type === 'select' ? (
            <select
              id={field.fld_nm}
              name={field.fld_nm}
              value={formData[field.fld_nm]}
              onChange={handleInputChange}
            >
              <option value="">Select {field.qstn}</option> {/* Placeholder option */}
              {field.choices && field.choices.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              id={field.fld_nm}
              name={field.fld_nm}
              value={formData[field.fld_nm]}
              onChange={handleInputChange}
            />
          )}
        </div>
      ))}
      <button type="submit">Create Account</button>
    </form>
    {success && <div className="success">{success}</div>}
    {error && <div className="error">{error}</div>}
  </div>
);
}

export default CreateAccountForm;