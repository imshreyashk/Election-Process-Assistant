export interface ElectionData {
  id: string;
  name: string;
  electionDay: string;
}

export interface PollingLocation {
  id: string;
  name: string;
  address: {
    locationName: string;
    line1: string;
    city: string;
    state: string;
    zip: string;
  };
  pollingHours: string;
  latitude: number;
  longitude: number;
}

export interface CivicResponse {
  election: ElectionData;
  pollingLocations: PollingLocation[];
  contests: any[]; // Placeholder
}

// In a real app, this would use Axios to hit https://www.googleapis.com/civicinfo/v2/voterinfo
export const fetchElectionInfo = async (address: string): Promise<CivicResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!address.trim()) {
    throw new Error('Address is required');
  }

  // Mock response
  return {
    election: {
      id: '2000',
      name: 'Upcoming General Election',
      electionDay: '2026-11-03',
    },
    pollingLocations: [
      {
        id: 'poll-1',
        name: 'Central Library',
        address: {
          locationName: 'Central Library',
          line1: '100 Main St',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
        },
        pollingHours: '7:00 AM - 8:00 PM',
        latitude: 37.7749,
        longitude: -122.4194,
      },
      {
        id: 'poll-2',
        name: 'Community Center',
        address: {
          locationName: 'Community Center',
          line1: '400 Broad St',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
        },
        pollingHours: '7:00 AM - 8:00 PM',
        latitude: 37.7849,
        longitude: -122.4094,
      }
    ],
    contests: [],
  };
};
