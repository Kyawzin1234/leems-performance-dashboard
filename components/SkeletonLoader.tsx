"use client";

import React from "react";

export default function SkeletonLoader() {
  return (
    <div className="w-full space-y-6 md:space-y-8 animate-pulse px-4 md:px-8 py-4 md:py-8 max-w-[1600px] mx-auto">
      
      {/* UserBanner Skeleton */}
      <div className="space-y-4">
        <div className="h-[72px] bg-slate-200/70 dark:bg-slate-800/70 rounded-2xl"></div>
        <div className="h-[112px] bg-slate-200/70 dark:bg-slate-800/70 rounded-2xl"></div>
      </div>

      {/* StatGrid Skeleton */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[140px] bg-slate-200/70 dark:bg-slate-800/70 rounded-2xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-[140px] bg-slate-200/70 dark:bg-slate-800/70 rounded-2xl"></div>
          ))}
        </div>
      </div>

      {/* Charts Skeleton */}
      <div className="h-[400px] bg-slate-200/70 dark:bg-slate-800/70 rounded-2xl"></div>

      {/* Activity Stream Skeleton */}
      <div className="h-[300px] bg-slate-200/70 dark:bg-slate-800/70 rounded-2xl"></div>
    </div>
  );
}