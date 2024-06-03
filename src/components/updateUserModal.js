import { useState } from "react";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";

const UpdateUserModal = ({ modalIsOpen, toggleModal, data, setData,setUser }) => {
    const updateHandler = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': localStorage.getItem("token")
            }
        }
        try {
            const response = await axios.post("http://localhost:5000/api/user/update", data, config)
            localStorage.setItem("loggedInUser", JSON.stringify(response.data.updatedUser))
            localStorage.setItem("USER", JSON.stringify(response.data.userInformation))
            setUser(JSON.parse(localStorage.getItem('USER')))
            toggleModal()
            toast.success("successfully updated user")
        } catch (error) {
            toast.error("error in updating")
            console.log(error)
        }
    }
    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${modalIsOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <h3 className="text-green-500 text-2xl mb-4">Edit profile</h3>
                <form>
                    <div className="mb-4">
                        <label htmlFor="fname" className="block mb-2">First name</label>
                        <input
                            type="text"
                            id="fname"
                            value={data.firstname}
                            onChange={(e) => setData({ ...data, firstname: e.target.value })}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lname" className="block mb-2">Last name</label>
                        <input
                            type="text"
                            id="lname"
                            value={data.lastname}
                            onChange={(e) => setData({ ...data, lastname: e.target.value })}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            disabled
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="nid" className="block mb-2">NID</label>
                        <input
                            type="text"
                            id="nid"
                            value={data.nID}
                            onChange={(e) => setData({ ...data, nID: e.target.value })}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>
                    <div className="flex justify-between mt-4">
                        <button type="button" className="bg-grey-400 rounded-lg px-4 py-2" onClick={() => toggleModal()}>Cancel</button>
                        <button type="button" className="px-4 py-2 bg-green-500  rounded-lg hover:bg-green-600" onClick={updateHandler}>Update</button>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default UpdateUserModal;
