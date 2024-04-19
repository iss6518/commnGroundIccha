
import React, { useState } from 'react';
import propTypes from 'prop-types';

function Form({ fields, handleSubmit }) {
  const [answers, setAnswers] = useState(fields.reduce((acc, field) => {
    acc[field.fieldName] = '';
    return acc;
  }, {}));

  const answerQuestion = (fieldName, value) => {
    setAnswers({ ...answers, [fieldName]: value });
  };

  const renderField = ({ prompt, fieldName, type, options }) => {
    switch (type) {
      case 'dropdown':
        return (
          <div key={fieldName}>
            <label>{prompt}</label>
            <select
              value={answers[fieldName]}
              onChange={(e) => answerQuestion(fieldName, e.target.value)}
            >
              {options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      case 'text':
      case 'password':
      default:
        return (
          <div key={fieldName}>
            <label>{prompt}</label>
            <input
              type={type}
              value={answers[fieldName]}
              onChange={(e) => answerQuestion(fieldName, e.target.value)}
            />
          </div>
        );
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(answers);
  };

  return (
    <form onSubmit={onSubmit}>
      {fields.map(renderField)}
      <button type="submit">Create Account</button>
    </form>
  );
}

Form.propTypes = {
  fields: propTypes.arrayOf(propTypes.shape({
    prompt: propTypes.string.isRequired,
    fieldName: propTypes.string.isRequired,
    type: propTypes.string,
    options: propTypes.arrayOf(propTypes.string),
  })).isRequired,
  handleSubmit: propTypes.func.isRequired,
};

export default Form;