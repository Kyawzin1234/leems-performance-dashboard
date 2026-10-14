"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { TrendingUp, Moon, Sun, LogOut, LayoutDashboard, Folder } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ isOpen, onToggle, isMobileOpen, onMobileClose }: SidebarProps) {
  const [activeTab, setActiveTab] = useState("Performance");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navItems = [
    { id: "My Board", icon: LayoutDashboard },
    { id: "My Projects", icon: Folder },
    { id: "Performance", icon: TrendingUp },
  ];

  // Determine if sidebar content should show labels
  const showLabels = isMobileOpen || isOpen;

  return (
    <>
      {/* Mobile Dark Overlay Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={onMobileClose}
        />
      )}

      <aside 
        className={`bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col py-6 min-h-screen fixed top-0 z-50 select-none transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0 w-64 px-4 shadow-2xl" : "-translate-x-full md:translate-x-0"}
          ${!isMobileOpen && isOpen ? "md:w-64 md:px-4" : ""}
          ${!isMobileOpen && !isOpen ? "md:w-16 md:px-2 md:items-center" : ""}
        `}
      >
        <div className="w-full shrink-0">
          <div 
            onClick={() => isMobileOpen ? onMobileClose?.() : onToggle()}
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${showLabels ? "" : "justify-center"}`}
          >
            <div className="w-10 h-10 shrink-0 rounded-xl border border-indigo-500/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg bg-indigo-50 dark:bg-indigo-500/10 shadow-xs">
              [
            </div>
            {showLabels && (
              <div className="flex flex-col overflow-hidden whitespace-nowrap">
                <span className="text-slate-900 dark:text-white font-bold text-sm leading-tight tracking-wide">LEEMS</span>
                <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-semibold tracking-widest">Enterprise</span>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 flex flex-col justify-center gap-2 w-full mt-8 md:mt-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button 
                key={item.id}
                title={item.id}
                onClick={() => { setActiveTab(item.id); onMobileClose?.(); }}
                className={`h-11 rounded-xl flex items-center transition-all duration-200 active:scale-95 overflow-hidden whitespace-nowrap ${
                  showLabels ? "px-4 gap-3 w-full" : "w-11 justify-center mx-auto"
                } ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 dark:shadow-blue-900/20" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? "stroke-[2.2]" : "stroke-[1.8]"}`} />
                {showLabels && <span className="font-medium text-sm">{item.id}</span>}
              </button>
            );
          })}
        </nav>

        <div className="shrink-0 flex flex-col gap-2 w-full">
          <button 
            title="Toggle Theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`h-11 rounded-xl flex items-center transition-colors active:scale-95 overflow-hidden whitespace-nowrap ${
              showLabels ? "px-4 gap-3 w-full hover:bg-slate-100 dark:hover:bg-slate-800/50" : "w-11 justify-center mx-auto hover:bg-slate-100 dark:hover:bg-slate-800/50"
            } text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200`}
          >
            {mounted && theme === "dark" ? <Sun className="w-5 h-5 shrink-0 stroke-[1.8]"/> : <Moon className="w-5 h-5 shrink-0 stroke-[1.8]"/>}
            {showLabels && <span className="font-medium text-sm">{mounted && theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
          </button>

          <button 
            title="Logout" 
            className={`h-11 rounded-xl flex items-center transition-colors active:scale-95 overflow-hidden whitespace-nowrap ${
              showLabels ? "px-4 gap-3 w-full hover:bg-rose-50 dark:hover:bg-rose-500/10" : "w-11 justify-center mx-auto hover:bg-rose-50 dark:hover:bg-rose-500/10"
            } text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400`}
          >
            <LogOut className="w-5 h-5 shrink-0 stroke-[1.8]"/>
            {showLabels && <span className="font-medium text-sm">Log Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}