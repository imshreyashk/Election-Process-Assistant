import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Stepper } from '../components/Wizard/Stepper';
import * as civicApi from '../services/civicApi';

// Mock the API service
vi.mock('../services/civicApi');

describe('Stepper Component', () => {
  it('verifies the next button (search) is disabled if the address is empty', () => {
    render(<Stepper />);
    
    const searchButton = screen.getByRole('button', { name: /search/i });
    const input = screen.getByLabelText(/residential address/i);
    
    expect(input).toHaveValue('');
    expect(searchButton).toBeDisabled();
  });

  it('verifies an error message shows if the api returns no elections (throws error)', async () => {
    vi.mocked(civicApi.fetchElectionInfo).mockRejectedValueOnce(new Error('API Error'));
    
    render(<Stepper />);
    const searchButton = screen.getByRole('button', { name: /search/i });
    const input = screen.getByLabelText(/residential address/i);

    fireEvent.change(input, { target: { value: '123 Test St' } });
    expect(searchButton).not.toBeDisabled();
    
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/could not fetch election data/i)).toBeInTheDocument();
    });
  });

  it('verifies the user can navigate back to step 1 from step 2', async () => {
    vi.mocked(civicApi.fetchElectionInfo).mockResolvedValueOnce({
      election: { id: '1', name: 'Test Election', electionDay: '2026-11-03', ocdDivisionId: 'ocd-division/country:us' },
      normalizedInput: { line1: '123 Test St', city: 'Test City', state: 'TS', zip: '12345' },
      pollingLocations: [],
      contests: [],
    });

    render(<Stepper />);
    
    const input = screen.getByLabelText(/residential address/i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '123 Test St' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/test election/i)).toBeInTheDocument();
    });

    const backButton = screen.getByRole('button', { name: /previous step/i });
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/residential address/i)).toBeInTheDocument();
    });
  });
});
