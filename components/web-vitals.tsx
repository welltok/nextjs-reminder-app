"use client";

import { useState, useCallback } from "react";
import { useReportWebVitals } from "next/web-vitals";

interface WebVitalsData {
  [key: string]: number[];
}

export function WebVitals() {
  const [metrics, setMetrics] = useState<WebVitalsData>({
    FCP: [],
    LCP: [],
    CLS: [],
    FID: [],
    TTFB: [],
  });

  useReportWebVitals(
    useCallback((metric) => {
      setMetrics((prevMetrics) => ({
        ...prevMetrics,
        [metric.name]: [...(prevMetrics[metric.name] || []), metric.value],
      }));
    }, [])
  );

  const handleExportJSON = () => {
    const json = JSON.stringify(metrics, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "web-vitals.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}>
      <h4>Web Vitals Analytics</h4>
      <button onClick={handleExportJSON} style={{ padding: "8px", margin: "10px 0" }}>
        Export JSON
      </button>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  );
}
