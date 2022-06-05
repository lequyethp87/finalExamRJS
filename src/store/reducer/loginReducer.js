import actionType from "../../ConstStatus/Constant";
const initalState = {
  isLoading: false,
  errorLogin: "",
  userToken: {},
};

const loginReducer = (state = initalState, actions) => {
  switch (actions.type) {
    case actionType.LOGIN_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userToken: actions.payload,
      };

      case actionType.LOGIN_FAILED:
          return {
            ...state,
            isLoading: false,
            errorLogin:
              "Login failed! Please recheck the username and password and try again",
          };
          default: return state
  }
};

export default loginReducer
