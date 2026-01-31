import React from 'react';

export function Footer() {
  return (
    <footer className="border-t bg-gray-50 py-6">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row px-8">
        <p className="text-sm text-gray-500">
          &copy; 2026 <strong>YUKTI</strong>. Built for clean societies.
        </p>
        <span className="text-sm font-bold text-green-800">SELECT. SORT. SOLVE.</span>
      </div>
    </footer>
  );
}