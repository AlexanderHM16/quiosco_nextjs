"use client";
import "react-toastify/dist/ReactToastify.min.css";
import { Zoom, ToastContainer } from 'react-toastify';  

export default function ToastNotification(){
    return(
        <ToastContainer 
        position="top-right"
        transition={Zoom}
        autoClose={3000}
        />  // This component will render the toasts.
    )
}