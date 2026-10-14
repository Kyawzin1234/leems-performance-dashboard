"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import UserBanner from "@/components/UserBanner";
import StatGrid from "@/components/StatGrid";
import ProductivityCharts from "@/components/ProductivityCharts";
import ActivityStream from "@/components/ActivityStream";
import DashboardFooter from "@/components/DashboardFooter";
import SkeletonLoader from "@/components/SkeletonLoader";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  // NEW: Global loading state
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Simulate a database fetch on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1500); // Wait 1.5 seconds to show off the skeleton loader
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200 overflow-hidden">
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />
      
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-64" : "md:ml-16"
        } ml-0`}
      >
        <Navbar onMenuClick={() => setIsMobileOpen(true)} />
        
        <div className="overflow-auto h-[calc(100vh-64px)]">
          {/* If loading, show Skeleton. Otherwise, show Dashboard */}
          {isPageLoading ? (
            <SkeletonLoader />
          ) : (
            <main id="dashboard-content" className="p-4 md:p-8 max-w-[1600px] w-full mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
              <UserBanner />
              <StatGrid />
              <ProductivityCharts 
                selectedDate={selectedDate} 
                onDateSelect={setSelectedDate} 
              />
              <ActivityStream 
                selectedDate={selectedDate} 
                onClearDate={() => setSelectedDate(null)} 
              />
              <DashboardFooter />
            </main>
          )}
        </div>
      </div>
    </div>
  );
}