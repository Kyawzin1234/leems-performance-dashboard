"use client";

import React, { useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export default function DashboardFooter() {
  const [isExporting, setIsExporting] = useState(false);

  const exportPDF = async () => {
    const dashboardElement = document.getElementById("dashboard-content");
    if (!dashboardElement) return;

    setIsExporting(true);

    try {
      // Capture the dashboard as a high-res image
      const dataUrl = await toPng(dashboardElement, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: document.documentElement.classList.contains("dark") ? "#020617" : "#f8fafc", // matches slate-950 or slate-50
      });
      
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfPageHeight = pdf.internal.pageSize.getHeight();
      
      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      
      // Calculate total image height scaled to the PDF width
      const totalImgHeight = (img.height * pdfWidth) / img.width;
      let heightLeft = totalImgHeight;
      let position = 0;

      // Draw the first page
      pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, totalImgHeight);
      heightLeft -= pdfPageHeight;

      // Loop to add subsequent pages if the content is longer than one page
      while (heightLeft > 0) {
        position = position - pdfPageHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, totalImgHeight);
        heightLeft -= pdfPageHeight;
      }

      pdf.save("LEEMS_Performance_Report.pdf");
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pb-12 transition-colors duration-200">
      {/* About Metrics */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs transition-colors duration-200">
        <h3 className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mb-3 tracking-widest uppercase">
          About Metrics
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Metrics are calculated from real-time task status transitions, time
          tracking data, and activity logs.
        </p>
      </div>

      {/* Lifetime Totals */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs transition-colors duration-200">
        <h3 className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mb-4 tracking-widest uppercase">
          Lifetime Totals
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">Total Work Time</span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">118.5 hrs</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500 dark:text-slate-400">Tasks Completed</span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">4</span>
          </div>
        </div>
      </div>

      {/* Export Reports */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs transition-colors duration-200">
        <h3 className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mb-3 tracking-widest uppercase">
          Export Reports
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Export high-resolution team performance data.
        </p>
        <button 
          onClick={exportPDF}
          disabled={isExporting}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 text-sm font-semibold transition-colors shadow-xs disabled:opacity-50"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <FileText className="w-4 h-4" />
          )}
          {isExporting ? "Generating PDF..." : "Download PDF Report"}
        </button>
      </div>
    </div>
  );
}