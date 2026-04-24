export interface SimpleAddressType {
  locationName?: string;
  line1: string;
  line2?: string;
  line3?: string;
  city: string;
  state: string;
  zip: string;
}

export interface Election {
  id: string;
  name: string;
  electionDay: string;
  ocdDivisionId: string;
}

export interface PollingLocation {
  id?: string;
  address: SimpleAddressType;
  notes?: string;
  pollingHours?: string;
  name?: string;
  voterServices?: string;
  startDate?: string;
  endDate?: string;
  latitude?: number;
  longitude?: number;
}

export interface Channel {
  type: string;
  id: string;
}

export interface Candidate {
  name: string;
  party?: string;
  candidateUrl?: string;
  phone?: string;
  photoUrl?: string;
  email?: string;
  channels?: Channel[];
}

export interface Contest {
  id: string;
  type: string;
  office?: string;
  level?: string[];
  roles?: string[];
  district?: {
    name: string;
    scope: string;
    id: string;
  };
  candidates?: Candidate[];
  referendumTitle?: string;
  referendumSubtitle?: string;
  referendumUrl?: string;
  referendumProStatement?: string;
  referendumConStatement?: string;
  referendumPassesIf?: string;
}

export interface AdministrationRegion {
  name: string;
  electionAdministrationBody: {
    name: string;
    electionInfoUrl?: string;
    electionRegistrationUrl?: string;
    electionRegistrationConfirmationUrl?: string;
    absenteeVotingInfoUrl?: string;
    votingLocationFinderUrl?: string;
    ballotInfoUrl?: string;
    correspondenceAddress?: SimpleAddressType;
  };
  local_jurisdiction?: AdministrationRegion;
}

export interface CivicResponse {
  election: Election;
  normalizedInput: SimpleAddressType;
  pollingLocations?: PollingLocation[];
  earlyVoteSites?: PollingLocation[];
  dropOffLocations?: PollingLocation[];
  contests?: Contest[];
  state?: AdministrationRegion[];
}

// Mock service implementation
export const fetchElectionInfo = async (address: string): Promise<CivicResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!address.trim()) {
    throw new Error('Address is required');
  }

  // Mock response mapping to the new interface
  return {
    election: {
      id: '2000',
      name: 'Upcoming General Election',
      electionDay: '2026-11-03',
      ocdDivisionId: 'ocd-division/country:us'
    },
    normalizedInput: {
      line1: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345'
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
