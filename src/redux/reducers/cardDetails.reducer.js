const cardDetailsReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_CARD_DETAILS":
            return action.payload
        default:
            return state;

    } //placeholder
};

// user will be on the redux state at:
// state.user
export default cardDetailsReducer;