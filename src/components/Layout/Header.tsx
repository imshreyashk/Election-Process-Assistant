import { MapPin } from 'lucide-react';

export const Header = () => {
  return (
    <header className="glass-panel" style={{ margin: '1rem', padding: '1rem 2rem', borderRadius: '1rem' }}>
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '0.5rem', display: 'flex' }}>
            <MapPin size={24} color="white" />
          </div>
          <h2 style={{ marginBottom: 0, fontSize: '1.25rem' }}>Election Process Assistant</h2>
        </div>
        <nav className="flex gap-4" aria-label="Main Navigation">
          <a href="#" className="text-muted">Home</a>
          <a href="#" className="text-muted">Resources</a>
          <a href="#" className="text-muted">About</a>
        </nav>
      </div>
    </header>
  );
};
