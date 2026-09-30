import React from 'react';
import { Activity, ShieldAlert, CheckCircle, Clock } from 'lucide-react';

export const ActivityTimeline: React.FC = () => {
  const activities = [
    {
      id: 1,
      time: '10 mins ago',
      title: 'Urgent Referral Flagged',
      desc: 'Patient DR-2026-002 (Sunita Devi) flagged for Severe DR in Left Eye.',
      type: 'urgent',
    },
    {
      id: 2,
      time: '25 mins ago',
      title: 'Grad-CAM XAI Map Generated',
      desc: 'Inferior temporal microaneurysms mapped for Patient DR-2026-001.',
      type: 'xai',
    },
    {
      id: 3,
      time: '1 hour ago',
      title: 'Bastar Mobile Unit Batch Sync',
      desc: '48 screening images uploaded via low-bandwidth offline buffer.',
      type: 'sync',
    },
    {
      id: 4,
      time: '2 hours ago',
      title: 'Doctor Review Completed',
      desc: 'Dr. K. Mehta confirmed Mild DR classification for DR-2026-004.',
      type: 'review',
    },
  ];

  return (
    <div className="brutal-card p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-surface-border font-mono">
        <h3 className="text-sm font-bold text-text-primary uppercase flex items-center gap-2">
          <Activity className="w-4 h-4 text-accent-orange" />
          Clinical Audit Stream
        </h3>
        <span className="text-[10px] text-accent-gold">LIVE LOGS</span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {activities.map((act) => (
          <div key={act.id} className="p-3 bg-surface-2 border border-surface-border flex items-start gap-3">
            <div className="mt-0.5">
              {act.type === 'urgent' ? (
                <ShieldAlert className="w-4 h-4 text-accent-crimson animate-pulse" />
              ) : (
                <Clock className="w-4 h-4 text-accent-orange" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-text-primary">{act.title}</span>
                <span className="text-[10px] text-text-muted">{act.time}</span>
              </div>
              <p className="text-[11px] text-text-secondary font-sans mt-0.5">{act.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
