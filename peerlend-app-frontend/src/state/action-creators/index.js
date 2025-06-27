
export const addEmailToStore = (email) => {
    console.log("Adding email to store:", email);
    return (dispatch) => {
        dispatch({
            type: "ADD_EMAIL",
            payload: email
        });
    }
}

export const addUpiIdToStore = (upiId) => {
    console.log("Adding UPI ID to store:", upiId);
    return (dispatch) => {
        dispatch({
            type: "ADD_UPI_ID",
            payload: upiId
        });
    }
}