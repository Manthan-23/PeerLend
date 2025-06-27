const initialState = {
    email: '',
    upiId: ''
};

const reducer = (state = initialState, action) => {
    console.log("Reducer called with action:", action);
    console.log("Current state:", state);

    if (action.type === "ADD_EMAIL") {
        return {
            ...state,
            email: action.payload
        };
    } else if (action.type === "ADD_UPI_ID") {
        return {
            ...state,
            upiId: action.payload
        };
    } else {
        return state;
    }
}

export default reducer;
