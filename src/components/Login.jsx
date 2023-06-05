import React, { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          onChange={handleEmail}
          className="auth__form-input"
          placeholder="Email"
          name="email"
          type="email"
          required
          value={email || ""}
        ></input>
        <input
          onChange={handlePassword}
          className="auth__form-input"
          placeholder="Пароль"
          name="password"
          type="password"
          required
          value={password || ""}
        ></input>

        <button className="auth__submit-button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
