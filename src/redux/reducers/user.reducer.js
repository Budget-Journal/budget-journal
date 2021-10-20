const userReducer = (state = {}, action) => {
  switch (action.type) {
    // case 'ADD_BUDGET':
    //   return state = 0, + Number(action.payload.total_budget);
    // case 'DEDUCT_FROM_BUDGET':
    //   return state = 0, - Number(action.payload.total_budget);
    case "SET_USER":
      return action.payload;
    case "UNSET_USER":
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
