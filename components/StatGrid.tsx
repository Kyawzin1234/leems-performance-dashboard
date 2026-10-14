"use client";

import React from "react";
import { TrendingUp, CheckCircle2, Flame, Clock, Timer, RotateCcw, Activity, AlertTriangle, ArrowRight } from "lucide-react";

export default function StatGrid() {
  const stats = [
    { title: "TOTAL TASKS", value: "4", sub: null, icon: TrendingUp, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10", hasWarning: false },
    { title: "COMPLETED", value: "0", sub: "High work time, 0 completed", icon: CheckCircle2, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", hasWarning: true },
    { title: "WORKED ON", value: "2", sub: "in period", icon: Flame, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", hasWarning: false },
    { title: "WORK TIME", value: "118h 29m", sub: "118.5 hrs", icon: Clock, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10", hasWarning: false },
    { title: "AVG TIME", value: "0m", sub: "per task", icon: Timer, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10", hasWarning: false },
    { title: "REVERTED", value: "0", sub: "from done", icon: RotateCcw, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10", hasWarning: false },
  ];

  return (
    <div className="space-y-6">
      {/* 6 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.hasWarning ? AlertTriangle : item.icon;
          const bgClass = item.hasWarning ? "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50" : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800";
          const iconColorClass = item.hasWarning ? "text-rose-600 dark:text-rose-400" : item.color;
          const iconBgClass = item.hasWarning ? "bg-rose-100 dark:bg-rose-900/50" : item.bg;
          const titleColor = item.hasWarning ? "text-rose-600 dark:text-rose-400" : "text-slate-500 dark:text-slate-400";
          const valColor = item.hasWarning ? "text-rose-700 dark:text-rose-200" : "text-slate-900 dark:text-slate-100";
          const subColor = item.hasWarning ? "text-rose-500 dark:text-rose-400/80 font-semibold" : "text-slate-400 dark:text-slate-500 font-medium";

          return (
            <div key={idx} className={`${bgClass} rounded-2xl border p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-sm transition-all min-h-[140px]`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${iconBgClass} ${iconColorClass} flex items-center justify-center`}>
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className={`text-[10px] sm:text-[11px] font-bold tracking-wider ${titleColor}`}>{item.title}</span>
                </div>
              </div>
              <div className="mt-3">
                <p className={`text-xl sm:text-2xl font-bold leading-tight ${valColor}`}>{item.value}</p>
                {item.sub && <p className={`text-[10px] sm:text-[11px] mt-1 ${subColor}`}>{item.sub}</p>}
                
                {/* ACTIONABILITY BUTTON */}
                {item.hasWarning && (
                  <button className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg bg-rose-100 dark:bg-rose-900/60 border border-rose-200 dark:border-rose-800 text-[9px] sm:text-[10px] font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-800 transition-colors">
                    REVIEW BLOCKED <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3 Progress Bars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Current Status */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-blue-500" />
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">Current Status</h3>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex mb-4">
            <div className="bg-emerald-500 h-full" style={{ width: "0%" }} />
            <div className="bg-purple-500 h-full" style={{ width: "0%" }} />
            <div className="bg-blue-500 h-full" style={{ width: "25%" }} />
            <div className="bg-amber-400 h-full" style={{ width: "25%" }} />
            <div className="bg-slate-400 dark:bg-slate-600 h-full" style={{ width: "50%" }} />
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Done <b className="dark:text-slate-300">(0)</b></span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" /> Review <b className="dark:text-slate-300">(0)</b></span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> WIP <b className="dark:text-slate-300">(1)</b></span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Hold <b className="dark:text-slate-300">(1)</b></span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600" /> To Do <b className="dark:text-slate-300">(2)</b></span>
          </div>
        </div>

        {/* Task Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-3">Task Breakdown</h3>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex mb-4">
            <div className="bg-blue-500 h-full" style={{ width: "50%" }} />
            <div className="bg-emerald-500 h-full" style={{ width: "50%" }} />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Discussion</span>
            <b className="text-slate-800 dark:text-slate-200">2</b>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Documentation</span>
            <b className="text-slate-800 dark:text-slate-200">2</b>
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-3">Priority Breakdown</h3>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex mb-4">
            <div className="bg-blue-500 h-full" style={{ width: "100%" }} />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Medium</span>
            <b className="text-slate-800 dark:text-slate-200">4</b>
          </div>
        </div>
      </div>
    </div>
  );
}