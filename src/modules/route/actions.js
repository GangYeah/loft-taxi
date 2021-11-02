export const ROUTE_INIT = "ROUTE_INIT";
export const REQUEST_ROUTE = "REQUEST_ROUTE";
export const REQUEST_ROUTE_SUCCESS = "REQUEST_ROUTE_SUCCESS";

export const requestRoute = (address1, address2) => ({
    type: REQUEST_ROUTE,
    payload: {
        address1,
        address2
    }
});
export const requestRouteSuccess = (res) => ({
    type: REQUEST_ROUTE_SUCCESS,
    payload: res
});
export const routeInit = () => ({ type: ROUTE_INIT });