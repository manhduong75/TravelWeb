import { publicAxiosClient } from './axiosClient';
import { LOGIN, REGISTER } from './constant';

const signIn = async (body) => {
    return await publicAxiosClient.post(LOGIN, body);
};

const register = async (body) => {
    return await publicAxiosClient.post(REGISTER, body);
};

export { signIn, register };