const initialState = {
    isAuth: false ,
    isAdmin: false,
    error: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_AUTH":
            return {
                ...state,
                isAdmin: action.payload,
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