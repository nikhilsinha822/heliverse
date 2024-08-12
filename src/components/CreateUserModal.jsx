import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const CreateUserModal = ({ role, closeModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let user;
        try {
            setIsLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/principal/user`, {
                email, password, role
            })
            user = response.data.data
            closeModal(user);
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center custom-scrollbar">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Add</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">password</label>
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                    </div>
                    {error && <div className="bg-red-100 border text-sm flex gap-1 border-red-400 text-red-700 px-4 py-3 my-3 rounded relative" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>}
                    <div className="flex justify-end">
                        <button disabled={isLoading} type="button" onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded mr-2 disabled:opacity-50">Cancel</button>
                        <button disabled={isLoading} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">Save</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

CreateUserModal.propTypes = {
    role: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
}

export default CreateUserModal;
