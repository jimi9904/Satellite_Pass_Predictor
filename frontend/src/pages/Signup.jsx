import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { t } = useTranslation();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      await signup(form.name, form.email, form.password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || t('app.signup.failed'));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20">
      <h1 className="text-2xl font-bold text-white mb-6">{t('app.signup.title')}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder={t('app.signup.name')}
          className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          required
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder={t('app.signup.email')}
          className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          required
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder={t('app.signup.password')}
          className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          required
          minLength={6}
        />

        {error && <p className="text-red-400">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 rounded-lg text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 backdrop-blur-sm border border-purple-400/30 transition-all"
        >
          {t('app.signup.button')}
        </button>
      </form>

      <p className="text-slate-300 text-sm mt-4">
        {t('app.signup.hasAccount')}{" "}
        <Link to="/login" className="text-cyan-400 hover:underline">
          {t('app.signup.login')}
        </Link>
      </p>
    </div>
  );
};

export default Signup;
