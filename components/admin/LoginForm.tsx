"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === "AccessDenied" || result.error?.includes("disabled")) {
          setError("This account has been disabled. Contact your administrator.");
        } else {
          setError("Invalid email or password. Please try again.");
        }
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="lf-form" noValidate>
      <style>{`
        .lf-form { display: flex; flex-direction: column; gap: 22px; }

        .lf-error {
          border: 1px solid rgba(160, 40, 40, 0.3);
          background: rgba(160, 40, 40, 0.06);
          padding: 12px 16px;
          color: #a02828;
          font-family: "Montserrat", sans-serif;
          font-size: 13px;
        }

        .lf-field { display: flex; flex-direction: column; gap: 8px; }

        .lf-label {
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #bf8f38;
        }

        .lf-input {
          width: 100%;
          padding: 14px 16px;
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          color: #182849;
          background: #ffffff;
          border: 1px solid rgba(24, 40, 73, 0.18);
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .lf-input::placeholder { color: rgba(24, 40, 73, 0.4); }
        .lf-input:focus {
          border-color: #bf8f38;
          box-shadow: 0 0 0 3px rgba(191, 143, 56, 0.12);
        }

        .lf-input-wrap { position: relative; }
        .lf-input-wrap .lf-input { padding-right: 48px; }
        .lf-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: rgba(24, 40, 73, 0.5);
          cursor: pointer;
          transition: color 0.25s ease;
        }
        .lf-toggle:hover, .lf-toggle:focus-visible {
          color: #bf8f38;
          outline: none;
        }
        .lf-toggle svg { width: 18px; height: 18px; stroke-width: 1.5; }

        .lf-submit {
          margin-top: 10px;
          padding: 16px 24px;
          background: #bf8f38;
          color: #182849;
          font-family: "Montserrat", sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.3s ease;
        }
        .lf-submit:hover:not(:disabled) { background: #d4a85c; }
        .lf-submit:disabled { opacity: 0.55; cursor: not-allowed; }
      `}</style>

      {error && <div className="lf-error">{error}</div>}

      <div className="lf-field">
        <label htmlFor="email" className="lf-label">Email Address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@radiance.com"
          required
          className="lf-input"
        />
      </div>

      <div className="lf-field">
        <label htmlFor="password" className="lf-label">Password</label>
        <div className="lf-input-wrap">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="lf-input"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="lf-toggle"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>

      <button type="submit" disabled={loading} className="lf-submit">
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Signing In
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}
