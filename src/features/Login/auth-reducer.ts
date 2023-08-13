import { Dispatch } from 'redux'
import {setErrorACType, setRequestStatusAC, setRequestStatusACType} from "../../app/app-reducer";
import {authAPI, LoginType, ResultCode} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {ErrorsType} from "../TodolistsList/tasks-reducer";


const initialState = {
    isInitialized: false,
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setRequestStatusAC('loading'))

    try {
        const response = await authAPI.me()
        if (response.data.resultCode === ResultCode.OK) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setRequestStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, response.data)
        }
    } catch (e: any) {
        handleServerNetworkError(dispatch, e.message)
    }
}

export const loginTC = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setRequestStatusAC('loading'))

    try {
        const response = await authAPI.login(data)
        if (response.data.resultCode === ResultCode.OK) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setRequestStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, response.data)
        }
    } catch (e: any) {
        handleServerNetworkError(dispatch, e.message)
    }
}


// types
export type ActionsType = ReturnType<typeof setIsLoggedInAC> | setRequestStatusACType | setErrorACType