import { FaChalkboardTeacher, FaClock, FaCalendarAlt } from 'react-icons/fa';
import PropTypes from 'prop-types'

const ClassroomCard = ({ classroom , onClick}) => {
    const days = classroom.schedule.map((obj) => obj.day)
    const Times = classroom.schedule.map((obj) => obj.startTime + "-" + obj.endTime)

    return (
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 custom-scrollbar">
            <h3 className="text-xl font-bold text-blue-600 mb-2">{classroom.name}</h3>
            <div className="mb-4">
                <div className="flex items-center mb-2">
                    <FaChalkboardTeacher className="text-gray-500 mr-2" />
                    <span className="text-gray-700">Teacher: {classroom?.teacher?.email || 'Not Assigned'}</span>
                </div>
                <div className="flex items-center mb-2">
                    <FaCalendarAlt className="text-gray-500 mr-2" />
                    <span className="text-gray-700">Days: {days?.join(', ')}</span>
                </div>
                <div className="flex items-center">
                    <FaClock className="text-gray-500 mr-2" />
                    <span className="text-gray-700">

                        Time: {Times.join(', ')}
                    </span>
                </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onClick}>
                Assign Teacher
            </button>
        </div>
    );
};

ClassroomCard.propTypes = {
    classroom: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}

export default ClassroomCard;
