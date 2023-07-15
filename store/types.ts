export interface RootState {
  auth: AuthState;
}

export interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
}

export interface LoginPayload {
  token: string;
}

export interface LogoutPayload {
  isLoggedIn: boolean;
}

export interface LoginAction {
  type: 'LOGIN';
  payload: LoginPayload;
}

export interface LogoutAction {
  type: 'LOGOUT';
  payload: LogoutPayload;
}

export type AuthAction = LoginAction | LogoutAction;