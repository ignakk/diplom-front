const initialState = {
    isAuth: false ,
    error: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_AUTH":
            return {
                ...state,
                isAuth: true
            }
            break;
    
        case "SET_AUTH_ERROR":
            return {
                ...state,
                error: action.payload
            }

        default: return state;
        break;
    }
}

export default userReducer;