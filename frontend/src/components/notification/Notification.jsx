import React, {useEffect, useState} from 'react'

import swal from 'sweetalert'
import socket from '../../socket'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import { allStoreSalesAction } from 'actions/adminAction'
const Notification = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const { sales } = useSelector((state) => state.adminStoreSales);
    useEffect(()=>{
        dispatch(allStoreSalesAction(user._id));
    },[dispatch])
    useEffect(() => {
        
        // Listen for 'notification' event from server
        socket.on("newOrder", (message) => {
           
            console.log('Received notification:', message);
            // Handle the notification (e.g., show it to the user)
            // swal("New Order Placed", message, "info")
            toast.success(message)
        });

       
    }, [sales]);
    const sendNotification = () => {
        // Emit 'notification' event to server
        socket.emit('newOrder', 'Hello, everyone!');
    };

    return (
        <div>
            <button onClick={sendNotification}>Send Notification</button>
        </div>
    );
}

export default Notification