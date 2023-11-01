import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Taat() {
    const showToastMessage = () => {
        toast.success('Success Notification !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    return (
        <div className='w-[100%] bg-slate-400'>
           sadfa
        </div>
    );
}
export default Taat;