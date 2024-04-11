import React, { useEffect, useState, useCallback, forwardRef } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Badge from 'react-bootstrap/Badge';
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux'
import socket from '../../socket'
const NotificationBell = ({ notifications, unreadCount, toggleDropdown}) => {
    const {user} = useSelector(state => state.auth)
    const navigate = useNavigate();
    const CustomToggle = forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="text-white"
        >
            {children}

        </a>
    ));
    const CustomMenu = forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            const [value, setValue] = useState('');

            return (
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <ul className="list-unstyled">
                        {React.Children.toArray(children).filter(
                            (child) =>
                                !value || child.props.children.toLowerCase().startsWith(value),
                        )}
                    </ul>
                </div>
            );
        },
    );
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = useCallback(() => {
        toggleDropdown();
        setIsOpen((prevIsOpen) => !prevIsOpen);
    }, [toggleDropdown]);
    const markAsRead = (id, orderid) =>{
        socket.emit('readNotification', {adminId: user._id, notificationId: id})
        navigate(`/update/order/${orderid}`)
    }
    return (
        <Dropdown className="mr-3" show={isOpen} onToggle={handleToggle}>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                <div style={{ position: 'relative' }}>
                    <FontAwesomeIcon icon={faBell} size="2x" />
                    {unreadCount>0 && <Badge pill bg="danger"
                        style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '-10px',
                            backgroundColor: 'red',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {unreadCount}
                    </Badge>}
                    
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu} style={{marginTop: "35px"}}>
                {notifications.length > 0 ? notifications.map((notification, index) => (
                    <Dropdown.Item key={index} eventKey={index} onClick={()=>markAsRead(notification.notificationId, notification.order)}>
                        ({notification.title}): {notification.message}
                    </Dropdown.Item>
                )) : <Dropdown.Item disabled>No notifications</Dropdown.Item>}
            </Dropdown.Menu>

        </Dropdown>
    )
}

export default NotificationBell