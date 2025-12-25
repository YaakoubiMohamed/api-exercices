/**
 * ============================================================================
 * EXERCISE 5: FOOTBALL DATA - MODELS
 * ============================================================================
 * 
 * 📚 EXPLANATION:
 * These interfaces define the shape of data we receive from the Football-Data.org API.
 * TypeScript interfaces help us:
 * - Get autocompletion in VS Code
 * - Catch errors at compile time
 * - Document the data structure
 * 
 * 🔑 KEYWORDS:
 * - export: Makes this interface available to other files
 * - interface: Defines a contract for the shape of an object
 * - ?: Optional property (may or may not exist)
 * - string | null: Union type (can be string OR null)
 */

// Response from /v4/competitions endpoint
export interface CompetitionsResponse {
  count: number;
  competitions: Competition[];
}

// Single competition (league/tournament)
export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string | null;
  area: Area;
  currentSeason: Season | null;
}

// Geographic area (country/region)
export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string | null;
}

// Season information
export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number | null;
}

// Response from /v4/competitions/{id}/standings endpoint
export interface StandingsResponse {
  competition: Competition;
  season: Season;
  standings: Standing[];
}

// Standing table type (TOTAL, HOME, AWAY)
export interface Standing {
  stage: string;
  type: string;
  table: TeamStanding[];
}

// Team position in the table
export interface TeamStanding {
  position: number;
  team: Team;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

// Team basic info
export interface Team {
  id: number;
  name: string;
  shortName: string;
  crest: string | null;
}

// Response from /v4/competitions/{id}/scorers endpoint
export interface ScorersResponse {
  competition: Competition;
  season: Season;
  scorers: Scorer[];
}

// Top scorer entry
export interface Scorer {
  player: Player;
  team: Team;
  goals: number;
  assists: number | null;
  penalties: number | null;
}

// Player info
export interface Player {
  id: number;
  name: string;
  nationality: string | null;
  position: string | null;
  dateOfBirth: string | null;
}
