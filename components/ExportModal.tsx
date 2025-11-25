import React, { useState } from 'react';
import { WeekSchedule, WorkSetting } from '../types';
import { StorageService } from '../services/storage';
import { formatTime, calculateDurationHours } from '../utils';
import { IconCopy, IconDownload, IconX } from './Icons';

interface ExportModalProps {
  schedule: WeekSchedule;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ schedule, onClose }) => {
  const [activeTab, setActiveTab] = useState<'csv' | 'clipboard'>('clipboard');
  const [copied, setCopied] = useState(false);
  const settings = StorageService.getSettings();

  const getSettingName = (id: string) => {
    return settings.find(s => s.id === id)?.friendlyName || id;
  };
  
  const getSettingCode = (id: string) => {
    return settings.find(s => s.id === id)?.medHubCode || id;
  };

  const generateCSV = () => {
    const headers = ['Date', 'Start Time', 'End Time', 'Hours', 'Type', 'Setting Code', 'Setting Name'];
    const rows: string[] = [];

    schedule.days.forEach(day => {
        day.blocks.forEach(block => {
            const date = day.date;
            const start = formatTime(block.start);
            const end = formatTime(block.end);
            const hours = calculateDurationHours(block.start, block.end).toFixed(2);
            const type = block.type;
            const code = getSettingCode(block.workSettingId);
            const name = getSettingName(block.workSettingId);
            
            // Escape CSV values
            rows.push([date, start, end, hours, type, code, `"${name}"`].join(','));
        });
    });

    return [headers.join(','), ...rows].join('\n');
  };

  const generateClipboardText = () => {
      let text = '';
      schedule.days.forEach(day => {
        if(day.blocks.length > 0) {
            const dateObj = new Date(day.date + 'T00:00:00');
            text += `${dateObj.toLocaleDateString('en-US', {weekday: 'short', month: 'numeric', day:'numeric'})}:\n`;
            day.blocks.forEach(block => {
                 text += `  • ${formatTime(block.start)} - ${formatTime(block.end)}: ${getSettingName(block.workSettingId)} (${block.type})\n`;
            });
            text += '\n';
        }
      });
      return text || "No hours logged for this week.";
  };

  const content = activeTab === 'csv' ? generateCSV() : generateClipboardText();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-lg font-semibold text-slate-800">Export Hours</h3>
                <button onClick={onClose}><IconX className="w-5 h-5 text-slate-400" /></button>
            </div>

            <div className="flex border-b border-slate-200">
                <button 
                    onClick={() => setActiveTab('clipboard')}
                    className={`flex-1 py-3 text-sm font-medium ${activeTab === 'clipboard' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Copy for Manual Entry
                </button>
                <button 
                    onClick={() => setActiveTab('csv')}
                    className={`flex-1 py-3 text-sm font-medium ${activeTab === 'csv' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    CSV (MedHub Format)
                </button>
            </div>
            
            <div className="p-6 flex-1 overflow-hidden flex flex-col">
                <p className="text-sm text-slate-500 mb-2">
                    {activeTab === 'clipboard' 
                        ? 'Copy this summary to easily reference while clicking through the MedHub UI.'
                        : 'Use this CSV to keep a personal backup record of your submitted hours.'}
                </p>
                <textarea 
                    readOnly
                    className="w-full flex-1 p-4 font-mono text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none resize-none text-slate-700"
                    value={content}
                />
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <button onClick={onClose} className="px-4 py-2 text-slate-600 font-medium">Close</button>
                <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                >
                    {copied ? 'Copied!' : activeTab === 'csv' ? <><IconDownload className="w-4 h-4"/> Copy CSV</> : <><IconCopy className="w-4 h-4"/> Copy to Clipboard</>}
                </button>
            </div>
        </div>
    </div>
  );
};