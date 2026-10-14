"use client";

import React, { useState } from "react";
import { Calendar, Target, Zap, Activity, Filter, X, Inbox } from "lucide-react";

interface ActivityStreamProps {
  selectedDate: string | null;
  onClearDate: () => void;
}

export default function ActivityStream({ selectedDate, onClearDate }: ActivityStreamProps) {
  const [filter, setFilter] = useState("All");

  const events = [
    {
      group: "Oct 6",
      label: "TUE, OCT 6",
      items: [
        { id: 1, type: "status", icon: Target, iconColor: "text-orange-500", iconBg: "bg-orange-50 dark:bg-orange-950/30", time: "12:27 PM", content: 'Task claimed and moved to "wip" by Ishant Sharma', subtext: "Task claimed via drag-and-drop" },
        { id: 2, type: "status", icon: Target, iconColor: "text-orange-500", iconBg: "bg-orange-50 dark:bg-orange-950/30", time: "12:06 PM", content: 'Task claimed and moved to "wip" by Ishant Sharma', subtext: "Task claimed via drag-and-drop" },
        { id: 3, type: "creation", icon: Zap, iconColor: "text-emerald-500", iconBg: "bg-emerald-50 dark:bg-emerald-950/30", time: "12:06 PM", content: 'Created task "build jahaan"', subtext: null },
      ],
    },
    {
      group: "Oct 1",
      label: "THU, OCT 1",
      items: [
        { id: 4, type: "status", icon: Activity, iconColor: "text-slate-500 dark:text-slate-400", iconBg: "bg-slate-50 dark:bg-slate-800", time: "05:56 PM", content: "Added blocker subtask: deploy", subtext: null },
        { id: 5, type: "creation", icon: Zap, iconColor: "text-emerald-500", iconBg: "bg-emerald-50 dark:bg-emerald-950/30", time: "05:56 PM", content: 'Created task "deploy"', subtext: null },
      ],
    },
  ];

  // Dual Filtering: First by Type, then by Selected Date
  const filteredEvents = events
    .map(group => ({
      ...group,
      items: group.items.filter(item => {
        if (filter === "Creations") return item.type === "creation";
        return true;
      })
    }))
    .filter(group => group.items.length > 0)
    .filter(group => {
      if (!selectedDate) return true;
      return group.group === selectedDate;
    });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs mt-8 pb-12 transition-colors duration-200">
      
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Activity Stream</h2>
          
          {/* Active Date Badge */}
          {selectedDate && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 text-xs font-bold ml-2">
              Showing: {selectedDate}
              <button onClick={onClearDate} className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
        
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 transition-colors">
          <button onClick={() => setFilter("All")} className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${filter === "All" ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-white font-semibold shadow-xs" : "hover:text-slate-900 dark:hover:text-slate-200"}`}>
            <Filter className="w-3 h-3" /> All
          </button>
          <button onClick={() => setFilter("Creations")} className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${filter === "Creations" ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 font-semibold shadow-xs" : "hover:text-slate-900 dark:hover:text-slate-200"}`}>
            <Zap className="w-3 h-3" /> Creations Only
          </button>
        </div>
      </div>

      {/* Stream Content */}
      <div className="pl-4">
        {filteredEvents.length === 0 ? (
          
          /* BEAUTIFUL EMPTY STATE */
          <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/50 text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400 dark:text-slate-500">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">No Activity Found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
              {selectedDate 
                ? `There are no recorded tasks, statuses, or updates for ${selectedDate}.` 
                : "Try adjusting your filters to see more team activity."}
            </p>
            {selectedDate && (
              <button onClick={onClearDate} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
                Clear Date Filter
              </button>
            )}
          </div>

        ) : (
          filteredEvents.map((group, groupIdx) => (
            <div key={group.group} className="relative">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold tracking-wider mb-6 relative z-10 border border-slate-200 dark:border-slate-700 transition-colors">
                {group.label}
              </div>

              {group.items.map((item, itemIdx) => {
                const Icon = item.icon;
                const isLast = groupIdx === filteredEvents.length - 1 && itemIdx === group.items.length - 1;

                return (
                  <div key={item.id} className="relative pl-10 pb-8 hover:-translate-y-0.5 transition-transform">
                    {!isLast && <div className="absolute left-[15px] top-8 bottom-[-24px] w-[2px] bg-slate-100 dark:bg-slate-800 z-0"></div>}

                    <div className={`absolute left-0 top-0 w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center z-10 shadow-sm ${item.iconBg} ${item.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.content}</p>
                        {item.subtext && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 italic border-l-2 border-slate-200 dark:border-slate-700 pl-3">
                            {item.subtext}
                          </p>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-md shrink-0 border border-slate-100 dark:border-slate-800 transition-colors">
                        {item.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
}