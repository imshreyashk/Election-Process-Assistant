import { motion } from 'framer-motion';

export const Skeleton = () => {
  return (
    <div className="flex flex-col gap-6 w-full" aria-live="polite" aria-busy="true">
      <div className="card" style={{ padding: '2rem' }}>
        <motion.div 
          className="skeleton-pulse"
          style={{ height: '2rem', width: '60%', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', backgroundColor: 'var(--surface-light)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="skeleton-pulse"
          style={{ height: '1.25rem', width: '40%', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--surface-light)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className="card">
           <motion.div 
            style={{ height: '1.5rem', width: '50%', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', backgroundColor: 'var(--surface-light)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
          />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between" style={{ marginBottom: '1rem' }}>
              <motion.div 
                style={{ height: '1rem', width: '40%', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--surface-light)' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
              />
              <motion.div 
                style={{ height: '1rem', width: '30%', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--surface-light)' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              />
            </div>
          ))}
        </div>
        <div className="card">
           <motion.div 
            style={{ height: '1.5rem', width: '40%', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', backgroundColor: 'var(--surface-light)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
           <motion.div 
            style={{ height: '4rem', width: '100%', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--surface-light)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
        </div>
      </div>
      <span className="sr-only">Loading election information...</span>
    </div>
  );
};
