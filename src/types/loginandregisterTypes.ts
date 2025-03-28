export interface User {
  id: string;
  email: string;
  role: string;
  [key: string]: any;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean | any;
  roles: string[];
  loading: boolean;
  error: string | null;
}
