import actionType from "../../ConstStatus/Constant";
const initalState = {
  page: 1,
};

const pageReducer = (state = initalState, actions) => {
  switch (actions.type) {
    case actionType.NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    case actionType.PREV_PAGE:
      return {
        ...state,
        page: state.page - 1,
      };
    default:
      return state;
  }
};

export default pageReducer;
