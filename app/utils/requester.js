import 'whatwg-fetch';

const BASE_URL = 'https://dev.diasyst.com/api';
const LOGIN = `${BASE_URL}/auth/client/login`;
const ACCOUNT = `${BASE_URL}/patient/account/get`;

const DEFAULT_CONFIG = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'DiasystAuthToken': '',
    'DiasystSessionKey': localStorage.getItem('SK') || ''
  }
};

class ResponseError extends Error {}
class ServerError extends Error {}

class Requester {

  login(credentials) {

    return fetch(LOGIN, {...getConfig(), body: JSON.stringify(credentials)})
      .then(rejectErrors)
      .then(storeSessionInfo)
      .then(() => this.getAccount())
      .catch(err => {
        if (/Invalid API Session/i.test(err.message)) {
          storeSessionInfo({ auth_token: '', session_key: '' });
          return this.login(credentials);
        }

        throw err;
      })
  }

  getAccount() {
    return fetch(ACCOUNT, getConfig())
      .then(rejectErrors)
      .then(response => response.result);
  }
}

function getConfig() {
  return {...DEFAULT_CONFIG, body: JSON.stringify({ timestamp: Date.now() })};
}

function rejectErrors(response) {

  if (`${response.status}`.startsWith('2') === false) {

    throw new ResponseError(response.statusText);
  }

  return response.json()
    .then(json => {
      if (json.status.code !== 0) throw new ServerError(json.status.message);

      return json;
    });
}

function storeSessionInfo(response) {

  DEFAULT_CONFIG.headers.DiasystAuthToken = response.auth_token;
  DEFAULT_CONFIG.headers.DiasystSessionKey = response.session_key;

  localStorage.setItem('SK', DEFAULT_CONFIG.headers.DiasystSessionKey);
}


export default new Requester();
