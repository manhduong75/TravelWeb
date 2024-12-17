export const  URL = 'http://travel.com';

export const PAGE_SIZE =10


//User
export const LOGIN = '/api/account/login';
export const REGISTER = '/api/account/register';

//Booking
export const INSERT_BOOKING = '/api/IBK01'
export const GET_LIST_BOOKING = '/api/RBK01'
export const GET_BOOKING_DETAIL = '/api/RBK01/:id'
export const UPDATE_BOOKING_STATUS = '/api/UBK01/:id'

//Review
export const GET_LIST_REVIEW = '/api/RRV01'
export const INSERT_REVIEW = '/api/IRV01'

//Tour
export const GET_LIST_TOUR = '/api/RTO01';
export const GET_HOT_TOUR = '/api/RTO03';
export const GET_TOUR_DETAIL = '/api/RTO01/:id';
export const SEARCH_TOUR = '/api/RTO02';
export const INSERT_TOUR = "/api/ITO01"

