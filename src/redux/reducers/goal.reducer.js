const goalReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_GOALS":
            return action.payload
        default:
            break;

    }
return state; //placeholder
};

// user will be on the redux state at:
// state.user
export default goalReducer;