
export interface Reminder {
  id: string;
  label: string;
  icon: string; // Can be an empty string
  intervalHours: number;
  lastCompletedTimestamp: number; // ms
  history: number[]; // Array of past completion timestamps (ms)
  color?: string; // Hex color for the theme
  isEnabled: boolean; // Whether the countdown is active
}

export interface AppState {
  reminders: Reminder[];
}
