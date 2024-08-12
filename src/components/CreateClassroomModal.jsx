import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import { v4 as uuid } from "uuid"

const CreateClassroomModal = ({ closeModal }) => {
    const [name, setName] = useState('');
    const [schedules, setSchedules] = useState([{ day: '', startTime: '', endTime: '' }]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('');

    const handleAddSchedule = () => {
        setSchedules([...schedules, { day: '', startTime: '', endTime: '' }]);
    };

    const handleScheduleChange = (index, field, value) => {
        const newSchedules = [...schedules];
        newSchedules[index][field] = value;
        setSchedules(newSchedules);
    };

    const handleScheduleRemove = (index) => {
        const newSchedules = schedules.filter((_, i) => i !== index);
        setSchedules(newSchedules);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formatTime = (time) => {
            let [hour, minute] = time.split(':');
            hour = parseInt(hour, 10);
            const period = hour >= 12 ? 'PM' : 'AM';
            hour = hour % 12 || 12;
            return `${hour}:${minute} ${period}`;
        };

        const formattedSchedules = schedules.map(({ day, startTime, endTime }) => ({
            day,
            startTime: formatTime(startTime),
            endTime: formatTime(endTime),
        }));

        const classroomData = {
            name,
            schedule: formattedSchedules,
        };

        try {
            setIsLoading(true)
            if(classroomData)
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/classroom/create`, classroomData)
            closeModal({ _id: uuid(), ...classroomData });
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center custom-scrollbar">
            <div className="bg-white p-6 rounded shadow-lg w-96 items-center h-3/5 overflow-y-scroll custom-scrollbar">
                <h2 className="text-2xl font-bold mb-4">Create Classroom</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Classroom Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    {schedules.map((schedule, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-gray-700">Schedule {index + 1}</label>
                                {schedules.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleScheduleRemove(index)}
                                        className="text-red-500"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-col space-y-2">
                                <input
                                    type="text"
                                    value={schedule.day}
                                    onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Day (e.g., Monday)"
                                    required
                                />
                                <input
                                    type="time"
                                    value={schedule.startTime}
                                    onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                                <input
                                    type="time"
                                    value={schedule.endTime}
                                    onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                        </div>
                    ))}
                    <div className="mb-4">
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={handleAddSchedule}
                            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            Add Another Schedule
                        </button>
                    </div>
                    {error && <div className="bg-red-100 border text-sm flex gap-1 border-red-400 text-red-700 px-4 py-3 my-3 rounded relative" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={closeModal}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

CreateClassroomModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default CreateClassroomModal;
