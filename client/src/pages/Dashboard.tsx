import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { StatCard } from '../components/dashboard/StatCard';
import { ScreeningTable } from '../components/dashboard/ScreeningTable';
import { ActivityTimeline } from '../components/dashboard/ActivityTimeline';
import { AnalyticsChart } from '../components/dashboard/AnalyticsChart';
import { getDashboardStats, getAllPatients } from '../services/screeningService';
import { DashboardStats } from '../types/dashboard';
import { PatientProfile } from '../types/patient';
import { Eye, ShieldAlert, Clock, Users, Activity, CheckCircle2 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [patients, setPatients] = useState<PatientProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [statsData, patientsData] = await Promise.all([
          getDashboardStats(),
          getAllPatients(),
        ]);
        setStats(statsData);
        setPatients(patientsData);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  return (
    <DashboardLayout activeItem="dashboard" activePath="/dashboard">
      <div className="space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-6">
          <div>
            <div className="font-mono text-xs text-accent-gold uppercase font-bold mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-success animate-ping" />
              CLINICAL COMMAND CENTER • RURAL OUTREACH UNIT
            </div>
            <h1 className="text-3xl font-black font-sans uppercase text-text-primary tracking-tight">
              Ophthalmology Triage Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <a href="/screening">
              <button className="skeuo-button px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4" /> New AI Screening
              </button>
            </a>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Today's Screenings"
            value={stats?.todayScreenings || 42}
            change="+18% vs yesterday"
            isPositive={true}
            icon={<Eye className="w-5 h-5 text-accent-orange" />}
            variant="orange"
          />
          <StatCard
            label="Pending Doctor Reviews"
            value={stats?.pendingReviews || 18}
            change="Requires Action"
            isPositive={false}
            icon={<Clock className="w-5 h-5 text-accent-gold" />}
            variant="gold"
          />
          <StatCard
            label="High-Risk Flagged"
            value={stats?.highRiskCases || 6}
            change="Urgent Referral"
            isPositive={false}
            icon={<ShieldAlert className="w-5 h-5 text-accent-crimson" />}
            variant="crimson"
          />
          <StatCard
            label="Total Screened (Camp)"
            value={stats?.totalPatientsScreened || 3840}
            change="Accuracy: 96.4%"
            isPositive={true}
            icon={<Users className="w-5 h-5 text-status-success" />}
            variant="success"
          />
        </div>

        {/* Middle Section: Recent Screenings Table */}
        <ScreeningTable patients={patients} />

        {/* Bottom Grid: Activity Stream + Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            {stats?.drDistribution && <AnalyticsChart distribution={stats.drDistribution} />}
          </div>
          <div className="lg:col-span-5">
            <ActivityTimeline />
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
