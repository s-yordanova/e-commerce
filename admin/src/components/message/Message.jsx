import {React, useState, useEffect} from 'react';
import './message.css';

const Message  = ({variant, children}) => {
    const [show, setShow] = useState(true);

useEffect(() => {
    const timeId = setTimeout (() => {
        setShow(false);
    }, 3000);

return () => {
    clearTimeout(timeId)
}
}, []);

if(!show) {
    return null;
}

return (
    <div className={`${variant}`}>
    <p>{children}</p>
    </div>
)
}

Message.message = {
    variant: 'info',
}


export default Message;