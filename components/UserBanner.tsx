"use client";

import React, { useState } from "react";
import { BarChart3, Users, User, Briefcase, Loader2 } from "lucide-react";

const TIME_RANGES = ["Today", "7 Days", "30 Days", "Custom"] as const;

export default function UserBanner() {
  const [selectedRange, setSelectedRange] = useState<string>("7 Days");
  const [isLoading, setIsLoading] = useState(false);

  const handleRangeChange = (tab: string) => {
    if (tab === selectedRange) return;
    setSelectedRange(tab);
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="space-y-4">
      {/* Top Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 px-6 flex items-center justify-between shadow-xs transition-colors duration-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 relative overflow-hidden transition-colors">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <BarChart3 className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                {isLoading ? "Updating Data..." : "My Performance"}
              </h2>
              <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider transition-colors">
                USER
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your individual velocity, completed tasks, work time, and activity history
            </p>
          </div>
        </div>

        {/* Time Tabs */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 relative transition-colors">
          {TIME_RANGES.map((tab) => (
            <button
              key={tab}
              onClick={() => handleRangeChange(tab)}
              disabled={isLoading}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                selectedRange === tab
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-white font-semibold shadow-xs"
                  : "hover:text-slate-900 dark:hover:text-slate-200"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Blue Gradient Identity Card */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 p-6 text-white shadow-lg shadow-indigo-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-white/20 ring-4 ring-white/30 flex items-center justify-center text-xl font-bold tracking-wider shrink-0 hover:scale-105 transition-transform cursor-pointer">
            IS
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Ishant Sharma</h2>
            <p className="text-blue-100 text-xs font-normal">ishant.sharma@lunaredgeit.com</p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/15 text-[11px] font-medium backdrop-blur-xs">
                <User className="w-3 h-3" />
                User
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/15 text-[11px] font-medium backdrop-blur-xs">
                <Briefcase className="w-3 h-3" />
                Full Stack Engineer Jr.
              </span>
            </div>
          </div>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur-xs transition-colors border border-white/20 shrink-0">
          <Users className="w-4 h-4" />
          All Members Directory
        </button>
      </div>
    </div>
  );
}