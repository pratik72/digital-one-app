import { get, post } from "../utils/axios.util";
import {LoginTypes, SignUpTypes} from "../typings"

export const login = (loginParam: LoginTypes) => {
    return post({ url: 'authenticate/SignIn', body: loginParam })
};

export const logout = () => {
    return get({ url: 'authenticate/Logout' })
};

export const signUp = (signupParam: SignUpTypes) => {
    return post({ url: 'authenticate/SignUp', body: signupParam })
};

export const getUserDetails = ({email}: any) => {
    return get({ url: `user/getUsr/${email}`})
};

export const getAllUsersDetails = () => {
    return get({ url: `user/getAllUsr`})
};

export const refreshToken = (email: string) => {
    return get({ url: `authenticate/refershTkn/${email}`})
};
  