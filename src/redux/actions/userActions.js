import { BlogService } from "../../services";

export const authorization = (email, password) => async (dispatch) => {
    try {
        const res = await BlogService.authorization(email, password);
        if(res.status === 200) {
            dispatch(setAuth());
            dispatch(showErrors(null));
            localStorage.setItem("token", res.data.accesToken);
            window.location.href = "/"
        } else {
            throw new Error("Произошла ошибка при авторизации");
        }
    } catch (error) {
        dispatch(showErrors(error.message));
    }
  
}

export const registration = (email, password) => async (dispatch) => {
    try {
        const res = await BlogService.registration(email, password);
        if(res.status === 200) {
            dispatch(setAuth());
            dispatch(showErrors(null));
            localStorage.setItem("token", res.data.accesToken);
            window.location.href = "/"
        } else {
            throw new Error("Произошла ошибка при регистрации");
        }
    } catch (error) {
        dispatch(showErrors(error.message));
    }
}

export const refresh = () => async (dispatch) => {
    const res = await BlogService.refresh();
    if(res.status === 200) {
        dispatch(setAuth());
        localStorage.setItem("token", res.data.accesToken)
    } else {
        alert(res.data)
    }
}

export const setAuth = () => ({
    type: "SET_AUTH"
})

export const showErrors = (error) => ({
    type: 'SET_AUTH_ERROR',
    payload: error
})