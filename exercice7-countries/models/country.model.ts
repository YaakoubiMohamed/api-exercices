/**
 * ============================================================================
 * EXERCISE 7: COUNTRY EXPLORER - MODELS
 * ============================================================================
 * 
 * 📚 EXPLANATION:
 * These interfaces define the data structure from REST Countries API.
 * 
 * 🔑 KEYWORDS:
 * - interface: Defines object shape for type safety
 * - export: Makes available to other files
 * - nested objects: Complex data structures
 */

export interface Country {
  name: {
    common: string;      // Common name (e.g., "France")
    official: string;    // Official name (e.g., "French Republic")
  };
  capital?: string[];    // Capital cities (array because some have multiple)
  population: number;    // Population count
  area: number;          // Area in km²
  region: string;        // Continent/region
  subregion?: string;    // Sub-region
  flags: {
    png: string;         // Flag image URL (PNG)
    svg: string;         // Flag image URL (SVG)
    alt?: string;        // Alt text for accessibility
  };
  languages?: {          // Languages spoken (key-value pairs)
    [key: string]: string;
  };
  currencies?: {         // Currencies used
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  borders?: string[];    // Bordering country codes
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
}
