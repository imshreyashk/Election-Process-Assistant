import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { AddressSearch } from '../AddressSearch/AddressSearch';
import { ElectionDetails } from '../ElectionInfo/ElectionDetails';
import { PollingLocationMap } from '../Map/PollingLocationMap';
import { Skeleton } from '../ui/Skeleton';
import { fetchElectionInfo, type CivicResponse } from '../../services/civicApi';

const steps = [
  { id: 1, title: 'Find Elections' },
  { id: 2, title: 'Review Deadlines' },
  { id: 3, title: 'Voting Day' }
];

export const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userAddress, setUserAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [electionData, setElectionData] = useState<CivicResponse | null>(null);

  const handleSearch = async (address: string) => {
    setIsLoading(true);
    setError(null);
    setUserAddress(address);
    try {
      const data = await fetchElectionInfo(address);
      setElectionData(data);
      setCurrentStep(2);
    } catch (err) {
      setError('Could not fetch election data for this address. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="flex flex-col gap-6" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      {/* Stepper Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', marginBottom: '3rem' }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '4px', background: 'var(--surface-light)', zIndex: -1, transform: 'translateY(-50%)', borderRadius: '99px' }}></div>
        <div
          style={{
            position: 'absolute', top: '50%', left: 0, height: '4px', background: 'var(--primary)', zIndex: -1,
            transform: 'translateY(-50%)', borderRadius: '99px', transition: 'width 0.5s ease',
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
          }}
        ></div>

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          let bgColor = 'var(--surface-light)';
          let color = 'var(--text-muted)';
          let shadow = 'none';

          if (isCompleted) {
            bgColor = 'var(--secondary)';
            color = 'white';
            shadow = 'var(--shadow-md)';
          } else if (isCurrent) {
            bgColor = 'var(--primary)';
            color = 'white';
            shadow = 'var(--shadow-glow)';
          }

          return (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div
                style={{
                  width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 'bold', fontSize: '1.125rem', transition: 'all 0.3s ease',
                  backgroundColor: bgColor, color: color, boxShadow: shadow
                }}
              >
                {isCompleted ? <CheckCircle2 size={24} /> : step.id}
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: isCurrent ? 'var(--primary)' : 'var(--text-muted)' }}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="card" style={{ backgroundColor: 'rgba(244, 63, 94, 0.1)', borderColor: 'var(--accent)' }}>
          <p style={{ color: 'var(--accent)', margin: 0, textAlign: 'center' }}>{error}</p>
        </div>
      )}

      {/* Step Content */}
      <div style={{ position: 'relative', minHeight: '400px' }} aria-live="polite" aria-atomic="true">
        <span className="sr-only">Current Step: {steps[currentStep - 1].title}</span>
        <AnimatePresence mode="wait">
          <motion.div
            key={isLoading ? 'loading' : currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', position: 'absolute' }}
          >
            {isLoading ? (
              <Skeleton />
            ) : currentStep === 1 ? (
              <AddressSearch onSearch={handleSearch} isLoading={isLoading} />
            ) : currentStep === 2 && electionData ? (
              <ElectionDetails election={electionData.election} />
            ) : currentStep === 3 && electionData ? (
              <PollingLocationMap locations={electionData.pollingLocations || []} userOrigin={userAddress} />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {currentStep > 1 && !isLoading && (
        <div className="flex justify-between" style={{ marginTop: '2rem' }}>
          <button onClick={prevStep} className="btn btn-secondary" aria-label="Go to previous step">
            <ChevronLeft size={20} /> Back
          </button>

          {currentStep < steps.length ? (
            <button onClick={nextStep} className="btn btn-primary" aria-label="Go to next step">
              Next Step <ChevronRight size={20} />
            </button>
          ) : (
            <button onClick={() => setCurrentStep(1)} className="btn btn-primary" aria-label="Start over from the beginning">
              Start Over
            </button>
          )}
        </div>
      )}
    </div>
  );
};
