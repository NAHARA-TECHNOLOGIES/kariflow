'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Check, Plus, Trash2, Layout, GripVertical } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

const INITIAL_TASKS: Task[] = [
  { id: '1', text: 'Stitch final hem for Balogun Wedding Dress', completed: false, category: 'Production' },
  { id: '2', text: 'Send WhatsApp fitting reminder to Sarah', completed: true, category: 'Client' },
  { id: '3', text: 'Confirm lace delivery from supplier', completed: false, category: 'Inventory' },
  { id: '4', text: 'Update digital measurement for New York order', completed: false, category: 'Design' },
];

export default function TaskTracker() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [newTask, setNewTask] = useState('');

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
      category: 'General'
    };
    setTasks([task, ...tasks]);
    setNewTask('');
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <section className="py-24 bg-white" id="tasks">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-start">
          <div className="mb-12 lg:mb-0">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest border border-emerald-100 mb-6">
               <Layout className="w-3.5 h-3.5 mr-2" />
               Studio Workflow
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
              Manage Your Studio <br />
              <span className="text-emerald-600">Without the Chaos.</span>
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
              {/* 🎯 FIXED: Escaped quotes inside text block to secure static compilation */}
              Kariflow turns your mental {"\""}to-do{"\""} list into a streamlined digital engine. Experience the satisfaction of seeing your business move forward, one stitch at a time.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                <p className="text-3xl font-black text-emerald-600 mb-1">
                  {Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) || 0}%
                </p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Productivity Score</p>
              </div>
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                <p className="text-3xl font-black text-slate-900 mb-1">
                  {tasks.filter(t => !t.completed).length}
                </p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Studio Tasks</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-8 shadow-3xl relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
            
            <form onSubmit={addTask} className="relative mb-8">
              <input 
                type="text" 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full pl-6 pr-16 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 aspect-square bg-emerald-500 text-white rounded-xl flex items-center justify-center hover:bg-emerald-400 transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
            </form>

            {/* 🎯 FIXED: Configured Group to render as an unstyled semantic standard list tag wrapper */}
            <Reorder.Group axis="y" values={tasks} onReorder={setTasks} as="ul" className="space-y-4">
              <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                  <Reorder.Item
                    key={task.id}
                    value={task}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`group p-5 rounded-2xl border transition-all flex items-center justify-between cursor-grab active:cursor-grabbing ${
                      task.completed ? 'bg-white/5 border-emerald-500/30 ring-1 ring-emerald-500/10' : 'bg-white/[0.03] border-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="text-white/10 group-hover:text-white/30 transition-colors">
                        <GripVertical className="w-5 h-5" />
                      </div>
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTask(task.id);
                        }}
                        className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
                          task.completed 
                            ? 'bg-emerald-500 border-emerald-500 text-white' 
                            : 'border-white/20 hover:border-emerald-500/50'
                        }`}
                      >
                        <AnimatePresence>
                          {task.completed && (
                            <motion.div
                              initial={{ scale: 0, rotate: -45 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0 }}
                            >
                              <Check className="w-4 h-4" strokeWidth={4} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                      
                      <div className="relative flex-1">
                        <span className={`text-base font-bold transition-all duration-500 ${
                          task.completed ? 'text-slate-500' : 'text-slate-200'
                        }`}>
                          {task.text}
                        </span>
                        
                        {/* Interactive Strikethrough Animation */}
                        <motion.div 
                          initial={false}
                          animate={{ 
                            width: task.completed ? "100%" : "0%",
                            opacity: task.completed ? 1 : 0
                          }}
                          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-emerald-500/50 pointer-events-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                         task.completed ? 'bg-white/5 text-slate-600' : 'bg-emerald-500/10 text-emerald-400'
                       }`}>
                         {task.category}
                       </span>
                       <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTask(task.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-rose-500/20 text-slate-500 hover:text-rose-500 rounded-lg transition-all"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>

            {tasks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500 font-bold">All caught up! Time to create something beautiful.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}