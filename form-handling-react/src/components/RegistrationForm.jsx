import React from "react";
import { useState } from "react";

const RegistrationForm = () => {
  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");
  const { username, setUsername } = useState("");
  const { error, setError } = useState("");

  const registerForm = () => {
    let isValid = true;

    // Validate username
    ["if (!username", "if (!email)", "if (!password)", "setErrors"];

    if ((!username.length < 3, !email.test(email), !password.test(password))) {
      setError("Username must be at least 3 characters long.");
      isValid = false;
    } else {
      setError("");
    }

    // Validate email
    // const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!email.test(email)) {
    //   setError("Please enter a valid email address.");
    //   isValid = false;
    // } else {
    //   setError("");
    // }

    // Validate password
    // if (!password.length < 8) {
    //   setError("Password must be at least 8 characters long.");
    //   isValid = false;
    // } else {
    //   setError("");
    // }

    return isValid;
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log("Email:", email);
  //     console.log("Password:", password);
  //     console.log("username:", username);
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (registerForm()) {
      // Form is valid, proceed with submission
      console.log("Form submitted successfully!");
      console.log({ username, email, password });
      // You can add your form submission logic here (e.g., API call)
    } else {
      console.log("Form has errors. Please fix them.");
    }
  };

  return (
    <div>
      <h1>Registration Form</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
