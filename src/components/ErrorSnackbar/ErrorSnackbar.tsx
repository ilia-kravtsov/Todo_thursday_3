import React, {useState} from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {Button, Stack} from '@mui/material'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppSelector} from "../../app/store";
import {RequestStatusType, setErrorAC} from "../../app/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const ErrorSnackbar = () => {

    //const error = useSelector<AppRootStateType, null | string>(state => state.app.error) // указываем и тип для стейта и тип который хотим получить
    const error = useAppSelector<null | string>(state => state.app.error) // указываем тип который хотим получить
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setErrorAC(null))
    }

    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}

/*
export const ErrorSnackbar = () => {
    const [open, setOpen] = useState(true)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {

        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                Error message 😠
            </Alert>
        </Snackbar>
    )
}
 */