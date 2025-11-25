import React, { useState, useEffect } from 'react';
import { WeeklyTemplate, WeekSchedule } from '../types';
import { StorageService } from '../services/storage';
import { CURRENT_USER_ID } from '../data/seeds';
import { generateId, formatDateISO } from '../utils';
import { IconSave, IconFileText, IconX, IconTrash } from './Icons';

interface TemplateManagerProps {
  currentSchedule: WeekSchedule;
  onApply: (schedule: WeekSchedule) => void;
  onClose: () => void;
}

export const TemplateManager: React.FC<TemplateManagerProps> = ({ currentSchedule, onApply, onClose }) => {
  const [templates, setTemplates] = useState<WeeklyTemplate[]>([]);
  const [mode, setMode] = useState<'list' | 'create'>('list');
  const [newTemplateName, setNewTemplateName] = useState('');

  useEffect(() => {
    setTemplates(StorageService.getTemplates(CURRENT_USER_ID));
  }, []);

  const handleSaveTemplate = () => {
    if (!newTemplateName) return;
    
    // Create a base week where dates don't matter as much, but logic relies on order
    const template: WeeklyTemplate = {
        id: generateId(),
        userId: CURRENT_USER_ID,
        name: newTemplateName,
        baseWeek: currentSchedule,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    StorageService.saveTemplate(template);
    setTemplates(StorageService.getTemplates(CURRENT_USER_ID));
    setMode('list');
  };

  const handleDelete = (template: WeeklyTemplate) => {
    if (confirm(`Delete "${template.name}"? This cannot be undone.`)) {
      StorageService.deleteTemplate(template.id);
      setTemplates(StorageService.getTemplates(CURRENT_USER_ID));
    }
  };

  const handleApply = (template: WeeklyTemplate) => {
    // We need to map the template days to the CURRENT week's dates
    // Assuming template.baseWeek.days[0] corresponds to Monday, etc.
    
    const newDays = currentSchedule.days.map((currentDay, index) => {
        const templateDay = template.baseWeek.days[index];
        
        // Map blocks to new date
        const mappedBlocks = templateDay.blocks.map(b => {
            // Extract time from template block
            const tStart = new Date(b.start);
            const tEnd = new Date(b.end);
            
            // Create new dates based on currentDay
            const newStart = new Date(currentDay.date);
            newStart.setHours(tStart.getHours(), tStart.getMinutes());
            
            const newEnd = new Date(currentDay.date);
            newEnd.setHours(tEnd.getHours(), tEnd.getMinutes());
            
            // Handle overnight crossing in template
            if (tEnd.getDate() !== tStart.getDate()) {
                newEnd.setDate(newEnd.getDate() + 1);
            }

            return {
                ...b,
                id: generateId(),
                start: newStart.toISOString(),
                end: newEnd.toISOString()
            };
        });

        return {
            ...currentDay,
            blocks: mappedBlocks
        };
    });

    const newSchedule: WeekSchedule = {
        ...currentSchedule,
        source: 'template',
        days: newDays
    };

    onApply(newSchedule);
    onClose();
  };

  return (
     <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800">
                    {mode === 'create' ? 'Save as Template' : 'Manage Templates'}
                </h3>
                <button onClick={onClose}><IconX className="w-5 h-5 text-slate-400" /></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
                {mode === 'list' ? (
                    <div className="space-y-4">
                        {templates.length === 0 ? (
                            <div className="text-center py-8 text-slate-500">
                                No templates saved yet. Build a week and save it!
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {templates.map(t => (
                                    <div key={t.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors flex justify-between items-center">
                                        <div>
                                            <div className="font-medium text-slate-900">{t.name}</div>
                                            <div className="text-xs text-slate-500">
                                                Created: {new Date(t.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleDelete(t)}
                                                className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
                                                title="Delete template"
                                            >
                                                <IconTrash className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleApply(t)}
                                                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-100"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        <div className="pt-4 border-t border-slate-100 mt-4">
                             <button 
                                onClick={() => setMode('create')}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                            >
                                <IconSave className="w-4 h-4" /> Save current week as new template
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                         <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Template Name</label>
                            <input 
                                autoFocus
                                type="text"
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., General Inpatient Week"
                                value={newTemplateName}
                                onChange={(e) => setNewTemplateName(e.target.value)}
                            />
                            <p className="text-xs text-slate-500 mt-2">
                                This will save the blocks from the current week view as a reusable template.
                            </p>
                         </div>
                    </div>
                )}
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                {mode === 'create' && (
                    <button onClick={() => setMode('list')} className="px-4 py-2 text-slate-600 font-medium">Back</button>
                )}
                {mode === 'create' ? (
                     <button 
                        onClick={handleSaveTemplate}
                        disabled={!newTemplateName}
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        Save Template
                    </button>
                ) : (
                    <button onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-md font-medium">Close</button>
                )}
            </div>
        </div>
    </div>
  );
};