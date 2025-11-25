import React, { useState, useMemo, useEffect, useRef } from 'react';
import { WorkSetting } from '../types';
import { searchSettings } from '../utils';
import { StorageService } from '../services/storage';
import { IconSearch } from './Icons';

interface SettingsSelectProps {
  value?: string;
  onChange: (setting: WorkSetting) => void;
}

export const SettingsSelect: React.FC<SettingsSelectProps> = ({ value, onChange }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<WorkSetting[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSettings(StorageService.getSettings());
  }, []);

  useEffect(() => {
    // If we have an initial value, try to find it to set the query name if needed
    // But usually we just want the friendly name in the box.
    if (value && settings.length > 0) {
        const found = settings.find(s => s.id === value);
        if (found) setQuery(found.friendlyName);
    } else if (!value) {
        setQuery('');
    }
  }, [value, settings]);

  const filtered = useMemo(() => searchSettings(query, settings), [query, settings]);

  const handleSelect = (s: WorkSetting) => {
    setQuery(s.friendlyName);
    onChange(s);
    setIsOpen(false);
  };

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <IconSearch className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <input
          type="text"
          className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="Search clinic, hospital, code..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {filtered.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-500">No settings found.</div>
          ) : (
            <ul className="py-1">
              {filtered.map((s) => (
                <li
                  key={s.id}
                  onClick={() => handleSelect(s)}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-slate-50 last:border-0"
                >
                  <div className="font-medium text-slate-900 flex items-center justify-between">
                    {s.friendlyName}
                    {s.isFavorite && <span className="text-yellow-500 text-xs">★</span>}
                  </div>
                  <div className="text-slate-500 text-xs flex gap-2">
                    <span className="font-mono bg-slate-100 px-1 rounded">{s.medHubLabel}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};