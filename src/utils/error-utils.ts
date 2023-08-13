import {setErrorAC, setErrorACType, setRequestStatusAC, setRequestStatusACType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType, TaskType, TodolistType, UserType} from "../api/todolists-api";
import {ActionsType} from "../features/TodolistsList/tasks-reducer";

type handleServerAppErrorDataType = ResponseType<{ item: TaskType }>
    | ResponseType<{ item: TodolistType }>
    | ResponseType<{ userId: number }>
    | ResponseType<UserType>

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, error: string) => {
    dispatch(setRequestStatusAC('failed'))
    dispatch(setErrorAC(error))
}

export const  handleServerAppError = <T>(dispatch: Dispatch<ActionsType>, data: handleServerAppErrorDataType) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Error'))
    }
    dispatch(setRequestStatusAC('idle'))
}
type ErrorUtilsDispatchType = setErrorACType | setRequestStatusACType


// type User = {
//     name: string
//     age: number
// }
// const user = {
//     name: 'Den',
//     age: 20
// }
//
// const testFunc = (param: string | number | Array<string> | Array<number> | User | Array<User>): string | number | Array<string> | Array<number> | User | Array<User> => {
//     return param
// }
//
// const result = testFunc([1])
// const result_2 = testFunc(user)
//
// result
//
// function identity<T>(arg: T): T {
//     return arg
// }
//
// const result3 = identity(user)
// const result4 = identity([user])
// const result5 = identity(['sadf'])
//
