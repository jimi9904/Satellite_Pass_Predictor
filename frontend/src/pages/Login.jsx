import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form.email, form.password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || t('app.login.invalidCredentials'));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20">
      <h1 className="text-2xl font-bold text-white mb-6">{t('app.login.title')}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder={t('app.login.email')}
          className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          required
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder={t('app.login.password')}
          className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          required
        />

        {error && <p className="text-red-400">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 rounded-lg text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 backdrop-blur-sm border border-purple-400/30 transition-all"
        >
          {t('app.login.button')}
        </button>
      </form>

      <p className="text-slate-300 text-sm mt-4">
        {t('app.login.noAccount')}{" "}
        <Link to="/signup" className="text-cyan-400 hover:underline">
          {t('app.login.signUp')}
        </Link>
      </p>
    </div>
  );
};

export default Login;
