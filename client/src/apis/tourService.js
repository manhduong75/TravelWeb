import { publicAxiosClient, privateAxiosClient } from './axiosClient';
import { GET_LIST_TOUR, INSERT_TOUR, SEARCH_TOUR } from './constant';

const getTour = async (body) => {
    return await publicAxiosClient.post(GET_LIST_TOUR, body);
};

const getTourDetail = async (id) => {
    return await publicAxiosClient.get(GET_LIST_TOUR + `/${id}`);
};

const searchTour = async (body) => {
    return await publicAxiosClient.post(SEARCH_TOUR, body);
}

const insertTour = async (body) => {
    return await privateAxiosClient.post(INSERT_TOUR, body);
}


export default { getTour, getTourDetail, searchTour, insertTour };