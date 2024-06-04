import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../App.css"

const ChangeUserPasswordModal = ({ modalIsOpen, toggleModal }) => {
    const [data, setData] = useState({
        oldpassword: "",
        newpassword: "",
        email: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [showConfirm, setShowConfirm] = useState(true);

    const checkPassword = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': localStorage.getItem("token")
            }
        };
        try {
            const response = await axios.post("http://localhost:5000/api/user/checkpassword", data, config);
            const evaluate = response.data;

            if (evaluate.confirm === true) {
                setErrorMsg("");
                toast.success("Successfully retrieved password");
                setShowConfirm(false);
            }
            else {
                toast.error("Invalid password");
                setErrorMsg("Invalid password");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const confirmChangePassword = async (e) => {
        e.preventDefault();
        data.email = JSON.parse(localStorage.getItem("loggedInUser")).email;
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': localStorage.getItem("token")
            }
        };
        try {
            const response = await axios.post("http://localhost:5000/api/user/updatepassword", data, config);
            setShowConfirm(true);
            setData({
                newpassword: "",
                oldpassword: ""
            });
            setErrorMsg("");
            toggleModal();
            toast.success("Successfully changed password");
        } catch (error) {
            toast.error("Error saving new password");
            console.log(error);
        }
    };

    const cancel = (e) => {
        e.preventDefault();
        setShowConfirm(true);
        setData({
            newpassword: "",
            oldpassword: ""
        });
        setErrorMsg("");
        toggleModal();
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${modalIsOpen ? 'block' : 'hidden'}`} style={{ fontFamily: 'roboto' }}>
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <h3 className="text-green-500 text-2xl mb-4">Change Password</h3>
                {errorMsg && (
                    <div className="alert alert-danger p-2 mb-4" role="alert">
                        <strong>{errorMsg}</strong>
                    </div>
                )}
                <form>
                    <div className="mb-4">
                        <label htmlFor="old" className="block mb-2">Old password</label>
                        <input
                            type="password"
                            id="old"
                            placeholder="Enter old password"
                            value={data.oldpassword}
                            onChange={(e) => setData({ ...data, oldpassword: e.target.value })}
                            disabled={!showConfirm}
                            className="w-full border rounded-md px-3 py-2"
                        />
                        <small className="text-gray-600">Please enter your old Password</small>
                    </div>
                    {!showConfirm && (
                        <div className="mb-4">
                            <label htmlFor="new" className="block mb-2">New password</label>
                            <input
                                type="password"
                                id="new"
                                placeholder="Enter new password"
                                value={data.newpassword}
                                onChange={(e) => setData({ ...data, newpassword: e.target.value })}
                                className="w-full border rounded-md px-3 py-2"
                            />
                            <small className="text-gray-600">Please enter a new password</small>
                        </div>
                    )}
                    {showConfirm && (
                        <div className="flex justify-end">
                            <button type="button" className="bg-green-500 rounded-lg px-4 py-2 mt-4" onClick={checkPassword}>Confirm</button>
                        </div>
                    )}
                </form>
                <div className="flex justify-between mt-4">
                    <button type="button" className="bg-red-300 rounded-lg px-4 py-2" onClick={cancel}>Cancel</button>
                    {!showConfirm && (
                        <button type="button" className="btn-green px-4 py-2 bg-green-500 rounded-lg" onClick={confirmChangePassword}>Change Password</button>
                    )}
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default ChangeUserPasswordModal;
