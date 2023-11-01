import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { Cloud_name, Upload_preset, imageUploadURL } from "../../api/cloudinaryAPI";
import axios from "axios";
import {toast,ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";


export default function EditCategory({showModal,setShowModal,categoryToEdit,handleUpdate}) {

    const [name,setName] = useState();

     useEffect(()=>{
        if (categoryToEdit) {
            setName(categoryToEdit.name)
        }
     },[categoryToEdit])


    const handleSubmit = (e)=>{
        e.preventDefault()
        setShowModal(false)
        handleUpdate(name,categoryToEdit?._id)
    }


  return (
    <>
      <ToastContainer/>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Food Items
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="m-3">
                    <form onSubmit={handleSubmit}>
                        <div className='p-1'>
                            <label htmlFor='name' className=''>Name</label>
                            <input 
                            type="text"
                            className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                            value={name}
                            name='name'
                            id='name'
                            onChange={(e)=>setName(e.target.value)}
                            required
                            />
                        </div>
                        
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
                    </form>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}