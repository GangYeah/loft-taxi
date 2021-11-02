export const REQUEST_ADDRESS_LIST = "REQUEST_ADDRESS_LIST";
export const REQUEST_ADDRESS_LIST_SUCCESS = "REQUEST_ADDRESS_LIST_SUCCESS";

export const requestAddressList = () => ({ type: REQUEST_ADDRESS_LIST });
export const requestAddressListSuccess = (list) => ({ type: REQUEST_ADDRESS_LIST_SUCCESS, payload: list });