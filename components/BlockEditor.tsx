import React, { useState, useEffect } from 'react';
import { TimeBlock, TimeBlockType, WorkSetting } from '../types';
import { SettingsSelect } from './SettingsSelect';
import { generateId, toTimeInputStr, combineDateAndTime } from '../utils';
import { IconClock, IconX } from './Icons';

interface BlockEditorProps {
  initialBlock?: TimeBlock;
  dateStr: string; // The specific date this block belongs to
  onSave: (block: TimeBlock) => void;
  onCancel: () => void;
  onDelete?: (blockId: string) => void;
}

export const BlockEditor: React.FC<BlockEditorProps> = ({ 
  initialBlock, 
  dateStr, 
  onSave, 
  onCancel,
  onDelete 
}) => {
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('17:00');
  const [settingId, setSettingId] = useState<string>('');
  const [type, setType] = useState<TimeBlockType>('standard');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialBlock) {
      setStartTime(toTimeInputStr(new Date(initialBlock.start)));
      setEndTime(toTimeInputStr(new Date(initialBlock.end)));
      setSettingId(initialBlock.workSettingId);
      setType(initialBlock.type);
    }
  }, [initialBlock]);

  const handleQuickTime = (start: string, end: string) => {
    setStartTime(start);
    setEndTime(end);
  };

  const handleSave = () => {
    if (!settingId) {
      setError('Please select a clinical setting');
      return;
    }
    
    // Create ISO strings
    const startIso = combineDateAndTime(dateStr, startTime);
    let endIso = combineDateAndTime(dateStr, endTime);
    
    // Handle overnight: if end time is before start time, assume it's next day
    if (endTime < startTime) {
       const nextDay = new Date(dateStr);
       nextDay.setDate(nextDay.getDate() + 1);
       const nextDayStr = nextDay.toISOString().split('T')[0];
       endIso = combineDateAndTime(nextDayStr, endTime);
    }

    const block: TimeBlock = {
      id: initialBlock?.id || generateId(),
      start: startIso,
      end: endIso,
      workSettingId: settingId,
      type
    };

    onSave(block);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-lg font-semibold text-slate-800">
            {initialBlock ? 'Edit Block' : 'Add Time Block'}
          </h3>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
            <IconX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Quick Actions */}
          <div className="flex gap-2 text-xs overflow-x-auto pb-1">
            <button 
                onClick={() => handleQuickTime('08:00', '12:00')}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 whitespace-nowrap"
            >AM Clinic (8-12)</button>
            <button 
                onClick={() => handleQuickTime('13:00', '17:00')}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 whitespace-nowrap"
            >PM Clinic (1-5)</button>
            <button 
                onClick={() => handleQuickTime('07:00', '19:00')}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 whitespace-nowrap"
            >Long Call (7-7)</button>
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Start</label>
              <div className="relative">
                <IconClock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input 
                  type="time" 
                  value={startTime} 
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">End</label>
              <div className="relative">
                <IconClock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input 
                  type="time" 
                  value={endTime} 
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Settings */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Setting</label>
            <SettingsSelect 
                value={settingId} 
                onChange={(s) => {
                    setSettingId(s.id);
                    setError('');
                }} 
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
            <select 
                value={type} 
                onChange={(e) => setType(e.target.value as TimeBlockType)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="standard">Standard Duty</option>
                <option value="moonlighting">Moonlighting</option>
                <option value="home_call">Home Call</option>
                <option value="remote_work">Remote Work</option>
            </select>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between">
          {initialBlock && onDelete ? (
             <button 
             onClick={() => onDelete(initialBlock.id)}
             className="text-red-600 hover:text-red-700 text-sm font-medium px-4 py-2"
           >
             Delete Block
           </button>
          ) : <div></div>}
         
          <div className="flex gap-3">
            <button 
                onClick={onCancel}
                className="px-4 py-2 text-slate-700 font-medium hover:bg-slate-200 rounded-md transition-colors"
            >
                Cancel
            </button>
            <button 
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm"
            >
                Save Block
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};