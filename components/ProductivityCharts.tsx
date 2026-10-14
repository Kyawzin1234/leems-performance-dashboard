"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { BarChart2 } from "lucide-react";

interface ProductivityChartsProps {
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
}

const tasksTouchedData = [
  { date: "Oct 5", value: 0 },
  { date: "Oct 6", value: 2 },
  { date: "Oct 7", value: 0 },
  { date: "Oct 8", value: 0 },
  { date: "Oct 9", value: 0 },
  { date: "Oct 10", value: 0 },
  { date: "Oct 11", value: 0 },
];

export default function ProductivityCharts({ selectedDate, onDateSelect }: ProductivityChartsProps) {
  
  // Helper to handle bar chart clicks
  const handleChartClick = (state: any) => {
    if (state && state.activeLabel) {
      onDateSelect(state.activeLabel);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs mt-8 transition-colors duration-200">
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Productivity & Activity Timeline</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks Completed Per Day */}
        <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Tasks Completed Per Day</h3>
          <div className="flex justify-between items-center gap-2">
            {[5, 6, 7, 8, 9, 10, 11].map((day) => {
              const dateStr = `Oct ${day}`;
              const isSelected = selectedDate === dateStr;
              return (
                <div key={day} onClick={() => onDateSelect(dateStr)} className="flex flex-col items-center gap-2 hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center font-semibold text-sm sm:text-lg transition-colors ${
                    isSelected 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-900" 
                      : "bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}>
                    0
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-medium ${isSelected ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`}>
                    {dateStr}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center mt-4 text-[10px] font-medium text-slate-400">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-800"></div>
              <div className="w-3 h-3 rounded-sm bg-emerald-200 dark:bg-emerald-900/50"></div>
              <div className="w-3 h-3 rounded-sm bg-emerald-400 dark:bg-emerald-600/50"></div>
              <div className="w-3 h-3 rounded-sm bg-emerald-600 dark:bg-emerald-500"></div>
            </div>
            <span>High Velocity</span>
          </div>
        </div>

        {/* Work Hours Per Day */}
        <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Work Hours Per Day</h3>
          <div className="flex justify-between items-center gap-2">
            {[5, 6, 7, 8, 9, 10, 11].map((day) => {
              const dateStr = `Oct ${day}`;
              const isSelected = selectedDate === dateStr;
              return (
                <div key={day} onClick={() => onDateSelect(dateStr)} className="flex flex-col items-center gap-2 hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center font-medium text-[10px] sm:text-xs border transition-colors ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-900"
                      : "bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/50 text-rose-500 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40"
                  }`}>
                    0h
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-medium ${isSelected ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`}>
                    {dateStr}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center mt-4 text-[10px] font-medium text-slate-400">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-800"></div>
              <div className="w-3 h-3 rounded-sm bg-blue-200 dark:bg-blue-900/50"></div>
              <div className="w-3 h-3 rounded-sm bg-blue-400 dark:bg-blue-700/50"></div>
              <div className="w-3 h-3 rounded-sm bg-blue-600 dark:bg-blue-500"></div>
            </div>
            <span>High Effort</span>
          </div>
        </div>

        {/* Tasks Touched Daily Chart */}
        <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-5 shadow-sm h-64">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Tasks Touched Daily</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tasksTouchedData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} onClick={handleChartClick}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} allowDecimals={false} />
              <Tooltip cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#1e293b', color: '#f1f5f9' }} />
              <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={40} className="cursor-pointer hover:opacity-80 transition-opacity" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Transitions Volume */}
        <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-5 shadow-sm h-64">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Status Transitions Volume</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tasksTouchedData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} onClick={handleChartClick}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} allowDecimals={false} domain={[0, 4]} />
              <Tooltip cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#1e293b', color: '#f1f5f9' }} />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} className="cursor-pointer hover:opacity-80 transition-opacity" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}