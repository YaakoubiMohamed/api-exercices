/**
 * ============================================================================
 * EXERCISE 8: RANDOM USERS - MODELS
 * ============================================================================
 * 
 * 📚 EXPLANATION:
 * These interfaces define the data structure from RandomUser.me API.
 * 
 * 🔑 KEYWORDS:
 * - interface: Defines object shape for type safety
 * - nested interfaces: Complex data structures
 * - info: Metadata about the request (pagination)
 */

// Response wrapper from the API
export interface RandomUserResponse {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

// User object structure
export interface User {
  gender: 'male' | 'female';  // Union literal type
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
  };
  login: {
    uuid: string;
    username: string;
  };
  dob: {
    date: string;
    age: number;
  };
  nat: string;  // Nationality code
}
