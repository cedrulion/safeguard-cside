import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../App.css"

const AddUser = () => {
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        nID: "",
        role: "DOCTOR",
        email: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/user/save', data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
            toast.success("Successfully saved user")
        } catch (error) {
            toast.error("Error in saving user", error)
        }
    };

    return (
        <>
            <div className="mt-10  rounded-lg border border-green-500 mx-5 bg-white" style={{ fontFamily: 'roboto' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">  {/* Two columns using grid layout */}
                    <div className="mt-3 mx-2">
                        <div className="flex flex-col">
                            <div className="flex justify-center">
                                <h3 className="text-lg">USER DETAILS</h3>
                            </div>
                            <hr className="my-4" />
                            <form className="mt-3">
                                <div className="mb-4">
                                    <label htmlFor="fname" className="block mb-2">
                                        FIRST NAME
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        id="fname"
                                        placeholder="Enter the first name of the officer"
                                        value={data.firstname}
                                        required
                                        onChange={(e) => setData({ ...data, firstname: e.target.value })}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="lname" className="block mb-2">
                                        LAST NAME
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        id="lname"
                                        placeholder="Enter the last name of the officer"
                                        value={data.lastname}
                                        required
                                        onChange={(e) => setData({ ...data, lastname: e.target.value })}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="nid" className="block mb-2">
                                        NATIONAL IDENTIFICATION
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        id="nid"
                                        placeholder="Enter national id"
                                        value={data.nID}
                                        required
                                        onChange={(e) => setData({ ...data, nID: e.target.value })}
                                    />
                                </div>

                                <div className="mt-auto mb-3">
                                    <button
                                        className="px-4 py-2 text-white rounded-md btn-style"

                                        onClick={handleSubmit}
                                    >
                                        <strong className="mr-2">SAVE USER</strong>
                                        <i className="bi bi-plus-circle text-2xl font-bold"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="mt-3">
                        <div className="flex flex-col">
                            <div className="flex justify-center">
                                <h3 className="text-lg">CONTACT INFORMATION</h3>
                            </div>
                            <hr className="my-4" />
                            <div className="mb-4 mt-2">
                                <label htmlFor="email" className="block mb-2">EMAIL</label>
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    id="email"
                                    placeholder="Enter the officer mobile number"
                                    value={data.email}
                                    required
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block mb-2">
                                    ROLE
                                </label>
                                <select value={data.role} onChange={(e)=>setData({...data,role:e.target.value})} className="w-full  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                                    <option value="DOCTOR">DOCTOR</option>
                                    <option value="TEACHER">TEACHER</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddUser;