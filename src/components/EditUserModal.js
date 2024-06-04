import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import for ToastContainer styling
import "../App.css"

const EditUserModal = ({ modalIsOpen, toggleModal, data, setData, updateHandler }) => {

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center ${modalIsOpen ? "block" : "hidden"
                }`}
        >
            <div className="w-full max-w-md p-8 rounded-lg bg-white shadow-lg" style={{ fontFamily: 'roboto' }}>
                <h3 className="text-2xl font-semibold text-center text-green-500 mb-4">Edit Profile</h3>
                <form onSubmit={updateHandler}>
                    <div className="grid grid-cols-1 gap-4">  {/* Use Tailwind grid for layout */}
                        <div className="flex flex-col">
                            <label htmlFor="fname" className="text-sm font-medium mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="fname"
                                value={data.firstname}
                                onChange={(e) => setData({ ...data, firstname: e.target.value })}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="lname" className="text-sm font-medium mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lname"
                                value={data.lastname}
                                onChange={(e) => setData({ ...data, lastname: e.target.value })}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-medium mb-2">
                                Email (Read-only)
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={data.email}
                                disabled
                                className="border border-gray-300 rounded-md px-3 py-2 opacity-50 cursor-not-allowed"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="nid" className="text-sm font-medium mb-2">
                                NID
                            </label>
                            <input
                                type="text"
                                id="nid"
                                value={data.nID}
                                onChange={(e) => setData({ ...data, nID: e.target.value })}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-400 rounded-md hover:bg-gray-5 rounded-lg px-4 py-2 mx-4" onClick={() => toggleModal()}>Cancel</button>
                        <button type="button" className="px-4 py-2 bg-green-500  rounded-lg hover:bg-green-600 " onClick={updateHandler}>Update</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default EditUserModal;
