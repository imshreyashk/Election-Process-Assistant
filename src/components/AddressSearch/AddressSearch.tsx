import { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface AddressSearchProps {
  onSearch: (address: string) => void;
  isLoading: boolean;
}

export const AddressSearch = ({ onSearch, isLoading }: AddressSearchProps) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      onSearch(address);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Find Your Election Information</h2>
      <p className="text-center" style={{ marginBottom: '2rem' }}>
        Enter your residential address to find your polling location, upcoming elections, and registration deadlines.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label htmlFor="address" className="form-label">Residential Address</label>
          <div className="flex gap-2">
            <input
              id="address"
              type="text"
              className="form-input"
              placeholder="e.g., 1600 Pennsylvania Avenue NW, Washington, DC"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary" disabled={isLoading || !address.trim()}>
              {isLoading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <Search size={20} />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};
