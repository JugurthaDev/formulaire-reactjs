import React, { useState } from 'react';
import logo from './logo.svg';
import './Inscription.css'; 

const Inscription = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    digit: false,
    lowercase: false,
    uppercase: false,
    match: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      validatePassword(value, formData.confirmPassword);
    }
    if (name === 'confirmPassword') {
      validatePassword(formData.password, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      validateEmail(value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email est invalide' }));
    } else {
      setErrors((prevErrors) => {
        const { email, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const validatePassword = (password, confirmPassword) => {
    const criteria = {
      length: password.length >= 8,
      digit: /\d/.test(password),
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      match: password === confirmPassword
    };
    setPasswordCriteria(criteria);
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email est invalide';
      isValid = false;
    }

    if (!passwordCriteria.length || !passwordCriteria.digit || !passwordCriteria.lowercase || !passwordCriteria.uppercase) {
      formErrors.password = 'Le mot de passe doit respecter tous les critères';
      isValid = false;
    }

    if (formData.confirmPassword !== formData.password) {
      formErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      alert('Compte créé avec succès');
    } else {
      alert('Une erreur est survenue');
    }
  };

  return (
      <>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="form-container">
      {submitted ? (
        <h2 className="success-message">Inscription réussie !</h2>
      ) : (
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-field">
            <label>Nom:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`form-input ${errors.firstName ? 'error' : ''}`}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="form-field">
            <label>Prénom:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`form-input ${errors.lastName ? 'error' : ''}`}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>

          <div className="form-field">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur} // Add onBlur event
              className={`form-input ${errors.email ? 'error' : ''}`}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label>Mot de passe:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'error' : ''}`}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-field">
            <label>Confirmation:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <ul className="criteria-list">
            <li className={`criteria-item ${passwordCriteria.length ? 'valid' : 'invalid'}`}>
              {passwordCriteria.length ? '✔️' : '❌'} Au moins 8 caractères
            </li>
            <li className={`criteria-item ${passwordCriteria.digit ? 'valid' : 'invalid'}`}>
              {passwordCriteria.digit ? '✔️' : '❌'} Au moins un chiffre
            </li>
            <li className={`criteria-item ${passwordCriteria.lowercase ? 'valid' : 'invalid'}`}>
              {passwordCriteria.lowercase ? '✔️' : '❌'} Au moins une lettre minuscule
            </li>
            <li className={`criteria-item ${passwordCriteria.uppercase ? 'valid' : 'invalid'}`}>
              {passwordCriteria.uppercase ? '✔️' : '❌'} Au moins une lettre majuscule
            </li>
            <li className={`criteria-item ${passwordCriteria.match ? 'valid' : 'invalid'}`}>
              {passwordCriteria.match ? '✔️' : '❌'} Mot de passe identique
            </li>
          </ul>

          <button type="submit" className="submit-button">Valider</button>
        </form>
      )}
    </div>
      </>
  );
};

export default Inscription;
