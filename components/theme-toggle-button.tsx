"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const wave1Ref = useRef<HTMLDivElement>(null)
  const wave2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    if (wave1Ref.current) {
      wave1Ref.current.style.left = `${x}px`
      wave1Ref.current.style.top = `${y}px`
      wave1Ref.current.classList.remove("theme-wave-1-active")
      void wave1Ref.current.offsetWidth
      wave1Ref.current.classList.add("theme-wave-1-active")
    }

    if (wave2Ref.current) {
      wave2Ref.current.style.left = `${x}px`
      wave2Ref.current.style.top = `${y}px`
      wave2Ref.current.classList.remove("theme-wave-2-active")
      void wave2Ref.current.offsetWidth
      wave2Ref.current.classList.add("theme-wave-2-active")
    }

    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) return null

  return (
    <>
      <div ref={wave1Ref} className="theme-wave-1" />
      <div ref={wave2Ref} className="theme-wave-2" />

      <button
        onClick={handleThemeToggle}
        className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-chart-5/20 text-chart-5 transition-all duration-300"
        aria-label="Toggle theme"
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 transition-transform duration-300 fill-current" />
        ) : (
          <Moon className="w-5 h-5 transition-transform duration-300 fill-current" />
        )}
      </button>
    </>
  )
}
