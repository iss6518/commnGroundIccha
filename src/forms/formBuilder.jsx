import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../constants'; // Adjust this import based on where you store your constants

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFormStructure = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/form-structure`);
        const fields = response.data.fields;
        setFormFields(fields);
        
        // Initialize formData state with field names and default values
        const initialData = fields.reduce((obj, field) => ({
          ...obj,
          [field.fld_nm]: field.default || ''
        }), {});
        setFormData(initialData);
      } catch (err) {
        setError('Failed to fetch form structure');
      }
    };

    fetchFormStructure();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit formData to your backend or handle it as needed
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {formFields.map(field => (
        <div key={field.fld_nm} className="form-group">
          <label htmlFor={field.fld_nm}>{field.qstn}</label>
          {field.type === 'dropdown' ? (
            <select
              id={field.fld_nm}
              name={field.fld_nm}
              value={formData[field.fld_nm]}
              onChange={handleInputChange}
            >
              {field.choices.map(choice => (
                <option key={choice} value={choice}>{choice}</option>
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
      {error && <p className="error">{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormBuilder;