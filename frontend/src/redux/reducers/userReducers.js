import { LOGIN_USER, LOG_OUT } from "../constants/userConstant";
export const userRegisterLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userInfo: action.payload,
      };
    case LOG_OUT:
      return {};
    default:
      return state;
  }
};
