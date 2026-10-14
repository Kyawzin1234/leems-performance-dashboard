"use client";

import React from "react";
import { Sparkles, Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="h-16 border-b border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200">
      
      {/* Title + Mobile Menu Button */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-1.5 -ml-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight hidden sm:block">Performance</h1>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 text-xs font-medium transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
          <span>LEEMS <span className="hidden sm:inline">Enterprise</span></span>
        </div>
      </div>

      {/* Right User Status */}
      <div className="flex items-center gap-3 md:gap-4">
        <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Full Stack Engineer Jr.
        </div>
        <div className="flex items-center gap-2.5 md:pl-2 md:border-l border-slate-200 dark:border-slate-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight">Ishant Sharma</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium leading-tight">
              Full Stack Engineer Jr.
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center transition-colors">
            IS
          </div>
        </div>
      </div>
    </header>
  );
}