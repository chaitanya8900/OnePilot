'use client'

import { useState } from 'react'
import { login } from './actions'
import { motion } from 'framer-motion'
import { Mail, Lock, LayoutDashboard, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    
    const result = await login(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-canvas flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] bg-surface-1 border border-hairline rounded-[24px] shadow-xl overflow-hidden p-8"
      >
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-surface-2 rounded-full flex items-center justify-center border border-hairline-strong text-ink">
            <LayoutDashboard size={24} />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-[24px] font-semibold tracking-tight text-ink">Admin Login</h1>
          <p className="text-[14px] text-ink-muted mt-2">Sign in to manage your CRM.</p>
        </div>

        <form action={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-[13px] font-medium text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[13px] font-medium text-ink-subtle mb-1.5 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" size={18} />
              <input 
                id="email" 
                name="email" 
                type="email" 
                required 
                placeholder="admin@onepilot.in"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-hairline bg-surface-2 text-[14px] text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-ink-subtle mb-1.5 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" size={18} />
              <input 
                id="password" 
                name="password" 
                type="password" 
                required 
                placeholder="••••••••"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-hairline bg-surface-2 text-[14px] text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-11 bg-primary text-white font-medium text-[14px] rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Sign In <ArrowRight size={16} /></>
            )}
          </button>
        </form>
      </motion.div>
    </main>
  )
}
