import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const Auth: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface p-8 rounded-2xl border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Join VectoraX'}</h2>
          <p className="text-gray-400 text-sm">Access your saved vectors and cloud library.</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input type="text" placeholder="Username" className="w-full bg-surfaceHighlight border border-white/10 rounded-lg pl-10 px-4 py-3 text-white focus:border-primary outline-none" />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input type="email" placeholder="Email Address" className="w-full bg-surfaceHighlight border border-white/10 rounded-lg pl-10 px-4 py-3 text-white focus:border-primary outline-none" />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input type="password" placeholder="Password" className="w-full bg-surfaceHighlight border border-white/10 rounded-lg pl-10 px-4 py-3 text-white focus:border-primary outline-none" />
          </div>

          <button className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2">
            {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
