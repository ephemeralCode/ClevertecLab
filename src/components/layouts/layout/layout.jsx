import { useSelector } from 'react-redux'

import { Outlet } from 'react-router-dom'

import { selectLoading, selectToastMessage } from "../../state-manager/loader/loader-slice";

import { Header } from '../../header/header'
import { Footer } from '../../footer/footer'
import { Loader } from '../../loader/loader'
import { ToastMessage } from '../../toast-message/toast-message'

export const Layout = () => {
    const loading = useSelector(selectLoading)
    const readyToastMessage = useSelector(selectToastMessage)

    return (
        <>
            { loading && <Loader /> }
            { readyToastMessage && <ToastMessage /> }

            <Header />
            <Outlet />
            <Footer />
        </>
    )

}