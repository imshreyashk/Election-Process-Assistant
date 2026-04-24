export const Footer = () => {
  return (
    <footer style={{ padding: '2rem', textAlign: 'center', marginTop: 'auto', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <p style={{ margin: 0 }}>© {new Date().getFullYear()} Election Process Assistant. Non-partisan and open source.</p>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
          Data provided by Google Civic Information API. Built with React and Vite.
        </p>
      </div>
    </footer>
  );
};
