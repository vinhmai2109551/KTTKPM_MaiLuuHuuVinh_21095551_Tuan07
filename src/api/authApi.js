import axiosClient from './axiosClient';

const USERS_STORAGE_KEY = 'doraCineUsers';
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL || 'http://172.16.56.62';

function buildAuthUrl(path) {
  return `${AUTH_BASE_URL.replace(/\/$/, '')}${path}`;
}

function getStoredUsers() {
  try {
    const value = localStorage.getItem(USERS_STORAGE_KEY);
    if (!value) {
      return [];
    }
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setStoredUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function shouldUseMockAuth() {
  return import.meta.env.VITE_USE_MOCK_AUTH === 'true' || !import.meta.env.VITE_API_BASE_URL;
}

async function mockLogin(payload) {
  const users = getStoredUsers();
  const foundUser = users.find((user) => user.username === payload.username);

  if (!foundUser) {
    throw new Error('Tài khoản không tồn tại. Vui lòng đăng ký trước.');
  }

  if (foundUser.password !== payload.password) {
    throw new Error('Sai mật khẩu. Vui lòng thử lại.');
  }

  return {
    user: {
      username: foundUser.username
    }
  };
}

async function mockRegister(payload) {
  const users = getStoredUsers();
  const existedUser = users.find((user) => user.username === payload.username);

  if (existedUser) {
    throw new Error('Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.');
  }

  const nextUsers = [...users, payload];
  setStoredUsers(nextUsers);

  return {
    user: {
      username: payload.username
    }
  };
}

export async function login(payload) {
  if (shouldUseMockAuth()) {
    return mockLogin(payload);
  }
// Nếu có API thật, gọi đến backend để xác thực
  const response = await axiosClient.post(buildAuthUrl('/auth/login'), payload);
  return response.data;
}

export async function register(payload) {
  if (shouldUseMockAuth()) {
    return mockRegister(payload);
  }

  const response = await axiosClient.post(buildAuthUrl('/auth/register'), payload);
  return response.data;
}
