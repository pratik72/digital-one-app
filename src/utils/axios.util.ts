import axios from "axios";
import { Alert } from "react-native";
import config from "../configs/config";
import { setUser } from "../reducers/actions";
import {store} from "../reducers/store";
import { refreshToken } from "../services";
import * as RootNavigation from '../navigation/root.navigation';
import { NAVIGATION } from "../constants";

const ServerEndPoint = config.apiGateway.URL;
const MAX_CHECK_REFRESH_TOKEN_TRY = 5;
let CHECKED_REFRESH_TOKEN_TRY = 0;

export interface IRequestParams {
  url: string;
  headers?: object;
  body?: object;
}

axios.interceptors.request.use( req => {
    const user = store && store.getState().user;
    if(req.headers && user && user.token){
      req.headers = {...req.headers, Authorization: `Bearer ${user.token}`};
    }
    return req;
  }
);

axios.interceptors.response.use( res => {
  return res;
}, async (err) => {
  const user = store && store.getState().user;
  let errorMsg = "ERROR\n\n Error while processing data";
  if(err.response && err.response.status === 401 && user && user.email){
    if(MAX_CHECK_REFRESH_TOKEN_TRY == CHECKED_REFRESH_TOKEN_TRY){
      store.dispatch(setUser({}));
      Alert.alert("ERROR","Token expired. Please logout and login again");
      RootNavigation.navigatePage(NAVIGATION.AUTH, { });
    }
    const originalRequest = err.config;
    const newToken = await refreshToken(user.email);
    CHECKED_REFRESH_TOKEN_TRY++;
    if(newToken && newToken.data){
      const newUser = {...user, token: newToken.data.token};
      store.dispatch(setUser(newUser));
      return axios(originalRequest);
    }
  }else if (err.response) {
    errorMsg = `ERROR\n\n${err.response.data.message}`
  }      
  Alert.alert("ERROR",errorMsg);
});

export const get = (
  { url, headers, body }: IRequestParams,
  callback?: () => void
) => {
  return axios({
    method: "GET",
    url: ServerEndPoint + url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers
    },
    data: body
  })
    .then(res => {
      if (callback) {
        callback();
      }
      return res;
    });
};

export const post = (
  { url, headers, body }: IRequestParams,
  callback?: () => void
) => {
  return axios({
    method: "POST",
    url: ServerEndPoint + url,
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: body
  })
    .then(res => {
      if (callback) {
        callback();
      }
      return res;
    });
};

export const del = (
  { url, headers, body }: IRequestParams,
  callback?: () => void
) => {
  return axios({
    method: "DELETE",
    url: ServerEndPoint + url,
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: body
  })
    .then(res => {
      if (callback) {
        callback();
      }
      return res;
    });
};
