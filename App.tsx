import React, { useState, useEffect, useMemo } from 'react';
import { getMonday, addDays, formatDisplayDate, formatDateISO, formatTime, calculateDurationHours } from './utils';
import { StorageService } from './services/storage';
import { WeekSchedule, TimeBlock, ViewState } from './types';
import { BlockEditor } from './components/BlockEditor';
import { TemplateManager } from './components/TemplateManager';
import { ExportModal } from './components/ExportModal';
import { IconChevronLeft, IconChevronRight, IconCalendar, IconPlus, IconFileText, IconSave } from './components/Icons';
import { CURRENT_USER_ID, SEED_SETTINGS } from './data/seeds';

const App = () => {
  // State
  const [viewState, setViewState] = useState<ViewState>({
    currentWeekStart: getMonday(new Date()),
    isEditingBlock: false,
    isTemplateModalOpen: false,
    isExportModalOpen: false,
    activeDayIndex: null,
    editingBlockId: null
  });

  const [schedule, setSchedule] = useState<WeekSchedule | null>(null);
  const [settings, setSettings] = useState(SEED_SETTINGS); // In a real app, fetched from API

  // Load Schedule when week changes
  useEffect(() => {
    const s = StorageService.getWeekSchedule(CURRENT_USER_ID, viewState.currentWeekStart);
    setSchedule(s);
  }, [viewState.currentWeekStart]);

  // Persist Schedule on change
  useEffect(() => {
    if (schedule) {
      StorageService.saveWeekSchedule(schedule);
    }
  }, [schedule]);

  // Handlers
  const handlePrevWeek = () => {
    setViewState(prev => ({ ...prev, currentWeekStart: addDays(prev.currentWeekStart, -7) }));
  };

  const handleNextWeek = () => {
    setViewState(prev => ({ ...prev, currentWeekStart: addDays(prev.currentWeekStart, 7) }));
  };

  const handleAddBlock = (dayIndex: number) => {
    setViewState(prev => ({ ...prev, isEditingBlock: true, activeDayIndex: dayIndex, editingBlockId: null }));
  };

  const handleEditBlock = (dayIndex: number, blockId: string) => {
    setViewState(prev => ({ ...prev, isEditingBlock: true, activeDayIndex: dayIndex, editingBlockId: blockId }));
  };

  const handleSaveBlock = (block: TimeBlock) => {
    if (!schedule || viewState.activeDayIndex === null) return;
    
    const newSchedule = { ...schedule };
    const day = newSchedule.days[viewState.activeDayIndex];
    
    if (viewState.editingBlockId) {
        // Edit existing
        day.blocks = day.blocks.map(b => b.id === block.id ? block : b);
    } else {
        // Add new
        day.blocks = [...day.blocks, block];
    }
    
    // Simple sort by start time
    day.blocks.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

    setSchedule(newSchedule);
    setViewState(prev => ({ ...prev, isEditingBlock: false, activeDayIndex: null, editingBlockId: null }));
  };

  const handleDeleteBlock = (blockId: string) => {
    if (!schedule || viewState.activeDayIndex === null) return;
    const newSchedule = { ...schedule };
    const day = newSchedule.days[viewState.activeDayIndex];
    day.blocks = day.blocks.filter(b => b.id !== blockId);
    setSchedule(newSchedule);
    setViewState(prev => ({ ...prev, isEditingBlock: false, activeDayIndex: null, editingBlockId: null }));
  };

  // Helper to get friendly setting name
  const getSettingName = (id: string) => {
    return settings.find(s => s.id === id)?.friendlyName || "Unknown Setting";
  };

  // Computed totals
  const totalHours = useMemo(() => {
      if (!schedule) return 0;
      return schedule.days.reduce((acc, day) => {
          return acc + day.blocks.reduce((dAcc, block) => dAcc + calculateDurationHours(block.start, block.end), 0);
      }, 0);
  }, [schedule]);

  // Derived state for the editor
  const currentEditingDayDate = schedule && viewState.activeDayIndex !== null 
    ? schedule.days[viewState.activeDayIndex].date 
    : formatDateISO(new Date());

  const currentEditingBlock = schedule && viewState.activeDayIndex !== null && viewState.editingBlockId
    ? schedule.days[viewState.activeDayIndex].blocks.find(b => b.id === viewState.editingBlockId)
    : undefined;


  if (!schedule) return <div className="flex items-center justify-center h-screen text-slate-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20 sm:pb-0">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
                 <h1 className="font-semibold text-slate-900 hidden sm:block">MedHub Helper</h1>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-100 rounded-full p-1 px-2">
                <button onClick={handlePrevWeek} className="p-1 hover:bg-white hover:shadow-sm rounded-full transition-all text-slate-600"><IconChevronLeft className="w-5 h-5"/></button>
                <div className="text-sm font-medium text-slate-700 min-w-[140px] text-center flex items-center gap-2 justify-center">
                    <IconCalendar className="w-4 h-4 text-slate-400" />
                    {formatDisplayDate(formatDateISO(viewState.currentWeekStart))}
                </div>
                <button onClick={handleNextWeek} className="p-1 hover:bg-white hover:shadow-sm rounded-full transition-all text-slate-600"><IconChevronRight className="w-5 h-5"/></button>
            </div>

            <div className="flex items-center gap-2">
                 <button 
                    onClick={() => setViewState(prev => ({...prev, isExportModalOpen: true}))}
                    className="text-slate-600 hover:text-blue-600 p-2 sm:px-3 sm:py-1.5 sm:bg-blue-50 sm:rounded-md text-sm font-medium transition-colors"
                    title="Export"
                 >
                    <span className="hidden sm:inline">Export</span>
                    <span className="sm:hidden">Exp</span>
                 </button>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        
        {/* Weekly Stats / Actions */}
        <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-slate-500">
                Weekly Total: <span className={`font-bold ${totalHours > 80 ? 'text-red-600' : 'text-slate-900'}`}>{totalHours.toFixed(1)} hrs</span>
            </div>
            <button 
                onClick={() => setViewState(prev => ({...prev, isTemplateModalOpen: true}))}
                className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
                <IconFileText className="w-4 h-4" /> Templates
            </button>
        </div>

        {/* Days List */}
        <div className="space-y-4">
            {schedule.days.map((day, index) => {
                const dayHours = day.blocks.reduce((acc, b) => acc + calculateDurationHours(b.start, b.end), 0);
                const isToday = day.date === formatDateISO(new Date());

                return (
                    <div key={day.date} className={`bg-white rounded-xl border ${isToday ? 'border-blue-200 shadow-md ring-1 ring-blue-50' : 'border-slate-200 shadow-sm'} overflow-hidden transition-all hover:shadow-md`}>
                        <div className="flex items-stretch min-h-[4rem]">
                            {/* Date Column */}
                            <div className={`w-20 sm:w-24 flex-shrink-0 flex flex-col items-center justify-center border-r border-slate-100 ${isToday ? 'bg-blue-50' : 'bg-slate-50'}`}>
                                <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                                    {new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' })}
                                </span>
                                <span className="text-xl font-bold text-slate-800">
                                    {new Date(day.date + 'T00:00:00').getDate()}
                                </span>
                            </div>

                            {/* Blocks Column */}
                            <div className="flex-1 p-3">
                                {day.blocks.length === 0 ? (
                                    <div className="h-full flex items-center">
                                        <button 
                                            onClick={() => handleAddBlock(index)}
                                            className="text-sm text-slate-400 hover:text-blue-600 flex items-center gap-1 px-2 py-1 rounded-md hover:bg-slate-50 transition-colors"
                                        >
                                            <IconPlus className="w-4 h-4" /> Log hours
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {day.blocks.map(block => (
                                            <button 
                                                key={block.id}
                                                onClick={() => handleEditBlock(index, block.id)}
                                                className="w-full text-left group flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all"
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                                                    <span className="font-mono text-sm font-medium text-slate-700">
                                                        {formatTime(block.start)} - {formatTime(block.end)}
                                                    </span>
                                                    <span className="text-sm text-slate-600 truncate max-w-[150px] sm:max-w-xs">
                                                        {getSettingName(block.workSettingId)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded group-hover:bg-white">
                                                        {calculateDurationHours(block.start, block.end).toFixed(1)}h
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                        <div className="pt-1 flex justify-between items-center">
                                            <button 
                                                onClick={() => handleAddBlock(index)}
                                                className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <IconPlus className="w-3 h-3" /> Add another
                                            </button>
                                            <span className="text-xs text-slate-400">Total: {dayHours.toFixed(1)}h</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
      </main>

      {/* Floating Action Button for Mobile */}
      <button 
        onClick={() => {
            // Default to today or Monday if generic add
            const today = formatDateISO(new Date());
            const todayIndex = schedule.days.findIndex(d => d.date === today);
            handleAddBlock(todayIndex >= 0 ? todayIndex : 0);
        }}
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all z-30"
      >
          <IconPlus className="w-8 h-8" />
      </button>

      {/* Modals */}
      {viewState.isEditingBlock && (
          <BlockEditor 
            initialBlock={currentEditingBlock}
            dateStr={currentEditingDayDate}
            onSave={handleSaveBlock}
            onCancel={() => setViewState(prev => ({ ...prev, isEditingBlock: false, activeDayIndex: null, editingBlockId: null }))}
            onDelete={currentEditingBlock ? handleDeleteBlock : undefined}
          />
      )}

      {viewState.isTemplateModalOpen && (
          <TemplateManager 
            currentSchedule={schedule}
            onApply={(newSchedule) => setSchedule(newSchedule)}
            onClose={() => setViewState(prev => ({ ...prev, isTemplateModalOpen: false }))}
          />
      )}

      {viewState.isExportModalOpen && (
          <ExportModal 
            schedule={schedule}
            onClose={() => setViewState(prev => ({ ...prev, isExportModalOpen: false }))}
          />
      )}

    </div>
  );
};

export default App;