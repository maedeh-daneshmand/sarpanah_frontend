'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface PersianDatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const persianMonths = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

const persianDays = Array.from({ length: 31 }, (_, i) => i + 1);
const persianYears = [1404, 1405];

export default function PersianDatePicker({
  label,
  value,
  onChange,
  placeholder = 'انتخاب تاریخ...',
}: PersianDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(20);
  const [selectedMonth, setSelectedMonth] = useState<number>(8); // آبان
  const [selectedYear, setSelectedYear] = useState<number>(1404);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApply = (d: number, m: number, y: number) => {
    const formatted = `${d} ${persianMonths[m - 1]} ${y}`;
    onChange(formatted);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="block text-[11px] font-bold text-gray-500 mb-0.5">
        {label}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-right flex items-center justify-between py-1 text-sm font-bold text-gray-800 hover:text-green-800 transition-colors focus:outline-none"
      >
        <span className={value ? 'text-gray-900 font-extrabold' : 'text-gray-400 font-normal'}>
          {value || placeholder}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
      </button>

      {/* Popover Selector */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 animate-fade-up">
          <div className="flex items-center gap-2 pb-2 mb-3 border-b border-gray-100 text-xs font-bold text-gray-800">
            <Calendar className="w-4 h-4 text-green-700" />
            <span>انتخاب تاریخ شمسی</span>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {/* Year */}
            <div>
              <label className="block text-[10px] text-gray-400 font-bold mb-1">سال</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full py-1.5 px-2 text-xs font-bold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
              >
                {persianYears.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Month */}
            <div>
              <label className="block text-[10px] text-gray-400 font-bold mb-1">ماه</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="w-full py-1.5 px-2 text-xs font-bold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
              >
                {persianMonths.map((m, idx) => (
                  <option key={m} value={idx + 1}>{m}</option>
                ))}
              </select>
            </div>

            {/* Day */}
            <div>
              <label className="block text-[10px] text-gray-400 font-bold mb-1">روز</label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(Number(e.target.value))}
                className="w-full py-1.5 px-2 text-xs font-bold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
              >
                {persianDays.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex gap-1.5 mb-3">
            <button
              type="button"
              onClick={() => {
                setSelectedDay(22);
                setSelectedMonth(8);
                setSelectedYear(1404);
                handleApply(22, 8, 1404);
              }}
              className="flex-1 py-1 text-[10px] font-bold bg-gray-100 hover:bg-green-50 text-gray-700 hover:text-green-800 rounded-lg"
            >
              آخر همین هفته
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedDay(29);
                setSelectedMonth(8);
                setSelectedYear(1404);
                handleApply(29, 8, 1404);
              }}
              className="flex-1 py-1 text-[10px] font-bold bg-gray-100 hover:bg-green-50 text-gray-700 hover:text-green-800 rounded-lg"
            >
              هفته آینده
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleApply(selectedDay, selectedMonth, selectedYear)}
            className="w-full py-2 bg-green-800 hover:bg-green-900 text-white text-xs font-bold rounded-xl shadow-md transition-all"
          >
            تایید تاریخ
          </button>
        </div>
      )}
    </div>
  );
}
