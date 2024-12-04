import { publicAxiosClient, privateAxiosClient } from './axiosClient';
import { GET_LIST_REVIEW, INSERT_REVIEW} from './constant';


const getReview = async (body) => {
    return await publicAxiosClient.post(GET_LIST_REVIEW, body);
}

const insertReview = async (body) => {
    return await privateAxiosClient.post(INSERT_REVIEW, body);
}


export {
    getReview, insertReview
}