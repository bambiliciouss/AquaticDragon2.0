import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'
import swal from 'sweetalert'
const socket = io.connect('http://localhost:4000')

const Notification = () => {
    useEffect(() => {
        // Listen for 'notification' event from server
        socket.on('notification', (message) => {
            console.log('Received notification:', message);
            // Handle the notification (e.g., show it to the user)
            swal("New Notification", message, "info")
        });

        // Clean up the socket connection when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);
    const sendNotification = () => {
        // Emit 'notification' event to server
        socket.emit('notification', 'Hello, everyone!');
    };

    return (
        <div>
            <button onClick={sendNotification}>Send Notification</button>
        </div>
    );
}

export default Notification