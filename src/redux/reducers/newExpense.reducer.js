const newExpense = (state=[], action) => {
    switch (action.type) {
        case 'UPDATE_NEW_EXPENSE':
            return state.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        ...action.payload.update
                    }
                }
                return item;
            })
    
        default:
            return state;
    }
};

export default newExpense;