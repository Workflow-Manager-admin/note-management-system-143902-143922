import React, { useState } from "react";

interface AuthFormProps {
  onLogin: (username: string, password: string) => void;
  onSignup: (username: string, password: string) => void;
  loading?: boolean;
  error?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onLogin, onSignup, loading, error }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSignup) {
      onSignup(username, password);
    } else {
      onLogin(username, password);
    }
  }
  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: 390, margin: "8vh auto", background: "#fff",
      padding: "2.7em 2em 2.2em", borderRadius: "var(--border-radius)",
      boxShadow: "0 1px 10px #0001",
      display: "flex", flexDirection: "column"
    }}>
      <h2 style={{ margin: 0, marginBottom: "1.4em" }}>
        {isSignup ? "Sign Up" : "Sign In"}
      </h2>
      <input
        type="text"
        required
        disabled={loading}
        placeholder="Username"
        autoFocus
        autoComplete="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        required
        disabled={loading}
        placeholder="Password"
        autoComplete={isSignup ? "new-password" : "current-password"}
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {error && <div style={{ color: "var(--accent)", marginBottom: 6 }}>{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? (isSignup ? "Signing up..." : "Signing in...") : (isSignup ? "Sign Up" : "Sign In")}
      </button>
      <div style={{ textAlign: "center", marginTop: 18 }}>
        {!isSignup ? (
          <>
            New here?{" "}
            <span style={{ color: "var(--primary)", cursor: "pointer" }} onClick={() => setIsSignup(true)}>
              Create an account
            </span>
          </>
        ) : (
          <>
            Have an account?{" "}
            <span style={{ color: "var(--primary)", cursor: "pointer" }} onClick={() => setIsSignup(false)}>
              Sign In
            </span>
          </>
        )}
      </div>
    </form>
  );
};
