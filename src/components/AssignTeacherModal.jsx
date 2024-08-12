import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AssignTeacherModal = ({ closeModal, teachers, selectedClassroom }) => {
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedTeacher) {
            try {
                await axios.put(`${import.meta.env.VITE_BASE_URL}/api/classroom/addTeacher/${selectedClassroom._id}`, {
                    teacherId: selectedTeacher.split(',')[0]
                })
                closeModal(selectedTeacher.split(',')[1])
            } catch (error) {
                setError(error.response.data.message)
            } finally {
                setIsLoading(false)
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Assign Teacher</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Select Teacher</label>
                        <select
                            value={selectedTeacher}
                            onChange={(e) => setSelectedTeacher(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        >
                            <option value="" disabled>Select a teacher</option>
                            {teachers.map((teacher) => (
                                <option key={teacher._id} value={teacher._id + "," + teacher.email}>
                                    {teacher.email}
                                </option>
                            ))}
                        </select>
                    </div>
                    {error && <div className="bg-red-100 border text-sm flex gap-1 border-red-400 text-red-700 px-4 py-3 my-3 rounded relative" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>}
                    <div className="flex justify-end">
                        <button
                            disabled={isLoading}
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            Assign
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

AssignTeacherModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    selectedClassroom: PropTypes.string.isRequired,
    teachers: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
        })
    ).isRequired,
    assignTeacher: PropTypes.func.isRequired,
};

export default AssignTeacherModal;
