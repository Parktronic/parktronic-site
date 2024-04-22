import {renderMainLogout} from './components/Logout/logout.js';
import {renderLogin} from './components/pages/Login/login.js';
import {renderParkingLots} from './components/pages/ParkingLots/parkings_lots.js';
import {renderMain} from './components/pages/Main/main.js';
import {renderSignup} from './components/pages/Signup/signup.js';


export const ROUTES = {
  main: {
    url: '/',
    state: 'main',
    open: renderMain,
  },
  parkings: {
    url: '/parkings',
    state: 'parkings',
    open: renderParkingLots,
  },
  signup: {
    url: '/signup',
    state: 'signup',
    open: renderSignup,
  },
  login: {
    url: '/login',
    state: 'login',
    open: renderLogin,
  },
  logout: {
    url: '/logout',
    state: 'main',
    open: renderMainLogout,
  },
};

const domain = 'localhost';
export const backendUrl = `https://xvwk1lvq-8000.euw.devtunnels.ms`;

const GET_METHOD = 'GET';
const POST_METHOD = 'POST';
const DELETE_METHOD = 'DELETE';

export const ROUTES_API = {
  login: {
    url: '/login',
    method: POST_METHOD,
  },
  signup: {
    url: '/signup',
    method: POST_METHOD,
  },
  is_auth: {
    url: '/is_authorized',
    method: GET_METHOD,
  },
  logout: {
    url: '/logout',
    method: POST_METHOD,
  },
  parking_lots: {
    url: '/parking_lots',
    method: GET_METHOD,
  },
  post_favorite: {
    url: '/favorite',
    method: POST_METHOD,
  },
  delete_favorite: {
    url: '/favorite',
    method: DELETE_METHOD,
  },
};
