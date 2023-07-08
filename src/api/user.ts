import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/fdapi/auth/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/fdapi/auth/logout');
}

export function getUserInfo() {
  return axios.get<UserState>('/fdapi/account/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
