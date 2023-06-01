import Cookies from "js-cookie";
import { BlogService } from "../../services";

export const authorization = (email, password) => async (dispatch) => {
    try {
        const res = await BlogService.authorization(email, password);
        if(res.status === 200) {
            dispatch(setAuth());
            dispatch(showErrors(null));
            console.log({res});
            Cookies.set("refreshToken", res.data.refreshToken);
            window.location.href = "/diplom-front"
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
            Cookies.set("refreshToken", res.data.refreshToken);
            window.location.href = "/diplom-front/auth"
        } else {
            throw new Error("Произошла ошибка при регистрации");
        }
    } catch (error) {
        dispatch(showErrors(error.message));
    }
}

export const refresh = () => async (dispatch) => {
    try {
        const res = await BlogService.refresh();
        if(res.status === 200) {
            dispatch(setAuth(res.data.user.isAdmin));
            Cookies.set("refreshToken", res.data.refreshToken);
        } else {
            alert(res.data)
        }
    } catch (error) {
        Cookies.remove('refreshToken');
        localStorage.removeItem('token');
    }
  
}

export const setAuth = (isAdmin) => ({
    type: "SET_AUTH",
    payload: isAdmin
})

export const setUnAuth = () => ({
    type: "SET_UN_AUTH"
})

export const showErrors = (error) => ({
    type: 'SET_AUTH_ERROR',
    payload: error
})