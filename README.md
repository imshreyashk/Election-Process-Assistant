# Election Process Assistant

A premium, interactive web application designed to guide voters through the election process step-by-step. Built with React, Vite, Framer Motion, and integrates Google Maps and Civic Information API.

## Features
- **Step-by-Step Guidance:** Follow a simple 3-step process to find elections, review deadlines, and prepare for voting day.
- **Dynamic Address Search:** Enter an address to fetch real-time election data.
- **Interactive Maps:** Discover polling locations on an interactive dark-themed Google Map.
- **Modern UI/UX:** Clean, responsive, and fully animated interface using custom CSS and Framer Motion.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- API Keys for Google Civic Information API & Google Maps JavaScript API.

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd Election-Process-Assistant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your API keys:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   VITE_GOOGLE_CIVIC_API_KEY=your_google_civic_api_key_here
   ```
   *(Note: The current build utilizes a mock service layer to demonstrate the UI flow. To enable live data, update the `src/services/civicApi.ts` to make real Axios calls utilizing the `VITE_GOOGLE_CIVIC_API_KEY`.)*

4. Run the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## Technologies Used
- React (with Vite)
- TypeScript
- Framer Motion (Animations)
- Lucide React (Icons)
- Google Maps API (`@react-google-maps/api`)
- Google Civic Information API (Mocked by default for immediate preview)

- # 🗳️ Election Process Assistant  
**Vertical:** Civic Educator  

## 🚀 Our Approach  
We built a smart, interactive assistant designed to simplify the complex election process. Using a step-by-step "Wizard" flow, we guide users from basic registration awareness to finding their live polling location.

## 🧠 Logic & Context  
- **Context-Aware Stepper:** The UI prevents users from moving to "Polling Locations" until they have provided a valid address.
- **Dynamic Data:** Real-time fetching of election dates ensures users never see outdated info.

## 🛠️ Google Services Integrated  
- **Google Civic Information API:** Powers the core election data and registration deadlines.  
- **Google Maps JavaScript API:** Provides the interactive map for polling site visualization.  

## 💡 Assumptions  
- Users are looking for US-based election information (supported by the Civic API).
- Users have a modern browser with Geolocation or manual address entry.

