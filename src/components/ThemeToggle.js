'use client'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) return <div className="w-10 h-10" /> // placeholder

    const isDark = theme === 'dark'

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="relative p-2.5 rounded-xl bg-surface border border-border
        hover:bg-surface-hover transition-all duration-300 cursor-pointer group"
            title={isDark ? 'Modo claro' : 'Modo oscuro'}
        >
            <Sun
                size={18}
                className={`absolute inset-0 m-auto transition-all duration-300 text-amber-500 ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                    }`}
            />
            <Moon
                size={18}
                className={`transition-all duration-300 text-sky-400 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                    }`}
            />
        </button>
    )
}
