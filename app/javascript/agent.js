import superagentPromise from "superagent-promise";
import _superagent from "superagent";
import { toast } from "react-toastify";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "";

const IGNORED_ERROR_URLS = ["/auth/validate_token"];

const responseBody = res => {
  return res.body;
};

const responseBodyWithAuth = res => {
  return { ...res.body, auth: res.headers };
};

const displayError = error => {
  const url = error.response.req.url;
  if (!IGNORED_ERROR_URLS.includes(url)) {
    toast(error.response.body.errors.join(","), {
      type: toast.TYPE.ERROR,
      hideProgressBar: true
    });
  }
};

let accessToken = null;
let client = null;
let uid = null;
let expiry = null;
const accessTokenPlugin = req => {
  if (accessToken && client && uid && expiry) {
    req.set("access-token", accessToken);
    req.set("client", client);
    req.set("uid", uid);
    req.set("expiry", expiry);
  }
};

const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .on("error", displayError)
      .use(accessTokenPlugin)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .on("error", displayError)
      .use(accessTokenPlugin)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .on("error", displayError)
      .use(accessTokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .on("error", displayError)
      .use(accessTokenPlugin)
      .then(responseBody),
  getWithAuth: (url, body) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .on("error", displayError)
      .use(accessTokenPlugin)
      .then(responseBodyWithAuth),
  postWithAuth: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .on("error", displayError)
      .use(accessTokenPlugin)
      .then(responseBodyWithAuth)
};

const Auth = {
  current: () => requests.getWithAuth("/auth/validate_token"),
  login: (email, password) =>
    requests.postWithAuth("/auth/sign_in", {
      email: email,
      password: password
    }),
  register: (email, password, passwordConfirmation) =>
    requests.post("/auth", {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      confirm_success_url: "login"
    }),
  logout: () => requests.del("/auth/sign_out")
};

const Me = {
  feed: () => requests.get(`/me/feed`)
};

const User = {
  save: user => requests.put(`/users/${user.id}`, user)
};

const Profile = {
  follow: username => requests.post(`/profiles/${username}/follow`),
  get: username => requests.get(`/profiles/${username}`),
  unfollow: username => requests.del(`/profiles/${username}/follow`)
};

export default {
  Auth,
  User,
  Profile,
  Me,
  setAuth: auth => {
    accessToken = auth ? auth.accessToken : null;
    client = auth ? auth.client : null;
    uid = auth ? auth.uid : null;
    expiry = auth ? auth.expiry : null;
  }
};
