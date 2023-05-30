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
        
        case "SET_UN_AUTH":
            return {
                ...state,
                isAuth: false,
                isAdmin: false,
                erorr: null
            }
    
        case "SET_AUTH_ERROR":
            return {
                ...state,
                error: action.payload
            }

        default: return state;
    }
}

export default userReducer;