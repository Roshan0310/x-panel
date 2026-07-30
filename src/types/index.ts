// Users from users.json
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

// Status Card  from dashboard.json
export interface StatusCard {
  id: number;
  title: string;
  value: string;
}

// Logged user
export interface LoggedInUser {
  id: number;
  name: string;
  email: string;
  profileImage: string;
}

// Login resrponse from login.json
export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: LoggedInUser;
}
