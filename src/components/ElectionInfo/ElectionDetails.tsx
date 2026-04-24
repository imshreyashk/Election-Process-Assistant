import { motion } from 'framer-motion';
import { Calendar, CalendarCheck, FileText, Info } from 'lucide-react';
import type { ElectionData } from '../../services/civicApi';

interface ElectionDetailsProps {
  election: ElectionData;
}

export const ElectionDetails = ({ election }: ElectionDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6"
    >
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--surface) 0%, rgba(79,70,229,0.1) 100%)' }}>
        <h2 className="flex items-center gap-2" style={{ marginBottom: '1rem', color: 'var(--primary)' }}>
          <Calendar size={28} />
          {election.name}
        </h2>
        <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: 0 }}>
          Election Day: {new Date(election.electionDay).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className="card">
          <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
            <FileText size={24} color="var(--secondary)" />
            <h3 style={{ margin: 0 }}>Registration Deadlines</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted">Online Registration:</span>
              <strong>15 days before</strong>
            </li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted">By Mail (postmarked):</span>
              <strong>15 days before</strong>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted">In-Person:</span>
              <strong>Up to Election Day</strong>
            </li>
          </ul>
        </div>

        <div className="card">
          <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
            <CalendarCheck size={24} color="var(--accent)" />
            <h3 style={{ margin: 0 }}>Early Voting</h3>
          </div>
          <p className="text-muted">
            Early voting is typically available starting 29 days prior to Election Day. Check your local county office for exact dates and times.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginTop: '1rem', background: 'var(--surface-light)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <Info size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.875rem' }}>Dates vary by state. This is general information.</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
