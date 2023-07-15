import { LoginPayload, LogoutPayload, LoginAction, LogoutAction } from './types';

export const login = (payload: LoginPayload): LoginAction => ({
  type: 'LOGIN',
  payload,
});

export const logout = (payload: LogoutPayload): LogoutAction => ({
  type: 'LOGOUT',
  payload,
});