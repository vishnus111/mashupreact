// src/utils.js

export const getUsersFromStorage = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };
  
  export const saveUsersToStorage = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };
  
  export const getUrlsFromStorage = (username) => {
    const urls = localStorage.getItem(`${username}_urls`);
    return urls ? JSON.parse(urls) : [];
  };
  
  export const saveUrlsToStorage = (username, urls) => {
    localStorage.setItem(`${username}_urls`, JSON.stringify(urls));
  };
  
  export const generateShortUrl = () => {
    return Math.random().toString(36).substring(2, 8);
  };
  
  export const isAuthenticated = () => {
    return !!localStorage.getItem('currentUser');
  };
  
  export const login = (username) => {
    localStorage.setItem('currentUser', username);
  };
  
  export const logout = () => {
    localStorage.removeItem('currentUser');
  };
  
  export const getCurrentUser = () => {
    return localStorage.getItem('currentUser');
  };
  