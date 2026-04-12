"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

/* ──────────────────── Types ──────────────────── */

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

/* ──────────────────── Shared ──────────────────── */

const PALETTE = ["#a855f7", "#06b6d4", "#6366f1", "#f472b6", "#f59e0b", "#10b981"];

function getColor(i: number, custom?: string) {
  return custom ?? PALETTE[i % PALETTE.length];
}

/* ──────────────────── Bar Chart ──────────────────── */

interface BarChartProps extends HTMLAttributes<HTMLDivElement> {
  data: DataPoint[];
  height?: number;
  showValues?: boolean;
  showGrid?: boolean;
}

export function BarChart({ data, height = 160, showValues = true, showGrid = true, className, ...props }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className={cn("w-full", className)} style={{ height }} {...props}>
      <div className="relative flex items-end gap-2 h-full">
        {showGrid && (
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
            {[4, 3, 2, 1, 0].map((i) => (
              <div key={i} className="border-t border-border/40 w-full" />
            ))}
          </div>
        )}
        {data.map((d, i) => {
          const pct = (d.value / max) * 100;
          return (
            <div key={d.label} className="flex-1 flex flex-col items-center gap-1 group">
              {showValues && (
                <span className="text-xs text-muted-foreground tabular-nums opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.value}
                </span>
              )}
              <div className="w-full relative" style={{ height: `calc(${pct}% - 20px)` }}>
                <div
                  className="absolute bottom-0 w-full rounded-t-md transition-all duration-500 hover:opacity-80"
                  style={{ height: "100%", backgroundColor: getColor(i, d.color) }}
                />
              </div>
              <span className="text-xs text-muted-foreground truncate w-full text-center">{d.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────── Line Chart ──────────────────── */

interface LineChartProps extends HTMLAttributes<HTMLDivElement> {
  data: DataPoint[];
  height?: number;
  filled?: boolean;
  showDots?: boolean;
}

export function LineChart({ data, height = 160, filled = true, showDots = true, className, ...props }: LineChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(...data.map((d) => d.value), 0);
  const range = max - min || 1;
  const w = 300;
  const h = height - 40;
  const step = w / (data.length - 1 || 1);

  const points = data.map((d, i) => ({
    x: i * step,
    y: h - ((d.value - min) / range) * h,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${points[points.length - 1].x} ${h} L 0 ${h} Z`;

  return (
    <div className={cn("w-full", className)} {...props}>
      <svg
        viewBox={`0 0 ${w} ${h + 20}`}
        className="w-full"
        style={{ height }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((r, i) => (
          <line
            key={i}
            x1="0"
            y1={h * r}
            x2={w}
            y2={h * r}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        ))}
        {filled && <path d={areaD} fill="url(#lineGrad)" />}
        <path d={pathD} fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {showDots &&
          points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3" fill="#a855f7" stroke="var(--background)" strokeWidth="2" />
          ))}
      </svg>
      <div className="flex justify-between px-1 -mt-1">
        {data.map((d) => (
          <span key={d.label} className="text-xs text-muted-foreground">{d.label}</span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────── Donut Chart ──────────────────── */

interface DonutChartProps extends HTMLAttributes<HTMLDivElement> {
  data: DataPoint[];
  size?: number;
  thickness?: number;
  showLegend?: boolean;
  centerLabel?: string;
  centerValue?: string | number;
}

export function DonutChart({
  data,
  size = 140,
  thickness = 28,
  showLegend = true,
  centerLabel,
  centerValue,
  className,
  ...props
}: DonutChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  let cumulative = 0;
  const segments = data.map((d, i) => {
    const fraction = d.value / total;
    const dashLength = fraction * circumference;
    const offset = -cumulative * circumference;
    cumulative += fraction;
    return { ...d, dashLength, offset, color: getColor(i, d.color) };
  });

  return (
    <div className={cn("flex items-center gap-6", className)} {...props}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {segments.map((seg, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={thickness}
              strokeDasharray={`${seg.dashLength} ${circumference - seg.dashLength}`}
              strokeDashoffset={seg.offset}
              transform={`rotate(-90 ${cx} ${cy})`}
              className="transition-all duration-500"
            />
          ))}
        </svg>
        {(centerLabel || centerValue !== undefined) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            {centerValue !== undefined && (
              <span className="text-xl font-bold text-foreground tabular-nums">{centerValue}</span>
            )}
            {centerLabel && <span className="text-xs text-muted-foreground">{centerLabel}</span>}
          </div>
        )}
      </div>
      {showLegend && (
        <div className="flex flex-col gap-2">
          {data.map((d, i) => (
            <div key={d.label} className="flex items-center gap-2 text-sm">
              <div className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: getColor(i, d.color) }} />
              <span className="text-muted-foreground truncate">{d.label}</span>
              <span className="ml-auto font-medium text-foreground tabular-nums">
                {Math.round((d.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
