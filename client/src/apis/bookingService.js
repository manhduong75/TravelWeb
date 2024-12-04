import { privateAxiosClient } from './axiosClient';
import {GET_LIST_BOOKING, GET_BOOKING_DETAIL, INSERT_BOOKING, UPDATE_BOOKING_STATUS  } from './constant';

const getListBooking = async (body) => {
    return await privateAxiosClient.post(GET_LIST_BOOKING, body);
}

const getBookingDetail = async (body) => {
    return await privateAxiosClient.post(GET_BOOKING_DETAIL, body);
}

const insertBooking = async (body) => {
    return await privateAxiosClient.post(INSERT_BOOKING, body);
}

const updateBookingStatus = async (body) => {
    return await privateAxiosClient.post(UPDATE_BOOKING_STATUS, body);
}

export default { getBookingDetail, insertBooking, updateBookingStatus, getListBooking };