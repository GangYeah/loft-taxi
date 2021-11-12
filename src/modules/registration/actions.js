export const REGISTER_INIT = "REGISTER_INIT";
export const REGISTER = "REGISTER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const registerInit = () => ({type: REGISTER_INIT});
export const register = (email, password, name, surname) => ({
  type: REGISTER,
  payload: { email, password, name, surname }
});

export const registerSuccess = () => ({ type: REGISTER_SUCCESS });
export const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });
