import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Stepper } from './components/Wizard/Stepper';
import './index.css';

function App() {
  return (
    <>
      <Header />
      <main className="container" style={{ padding: '2rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '600px' }}>
          <h1 className="animate-fade-in">Your Guide to the Election Process</h1>
          <p className="animate-fade-in" style={{ animationDelay: '0.1s', fontSize: '1.125rem' }}>
            We've simplified the voting process. Follow our step-by-step assistant to register, find your deadlines, and locate your polling place.
          </p>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.2s', width: '100%' }}>
          <Stepper />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
