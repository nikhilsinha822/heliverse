import { FaUsers, FaChalkboardTeacher, FaPlus } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Teachers from './Teachers'
import Classrooms from "./Classrooms";
import Students from "./Students";

const PrincipalDash = () => {
    const navigate = useNavigate()

    const setQueryParam = (key, value) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(key, value);
        navigate({
            pathname: window.location.pathname,
            search: searchParams.toString()
        });
    };

    const renderView = () => {
        const searchParams = new URLSearchParams(location.search);
        const view = searchParams.get('activeSlide');
        switch (view) {
            case 'teachers':
                return <Teachers />;
            case 'students':
                return <Students />;
            case 'create-classroom':
                return <Classrooms />;
            default:
                return <Teachers />;
        }
    };

    return (
        <div className="flex">
            <Sidebar setView={(val) => setQueryParam("activeSlide", val)} />
            <div className="flex-1 p-6 h-screen overflow-y-scroll">
                {renderView()}
            </div>
        </div>
    );
}

const Sidebar = ({ setView }) => (
    <div className="h-screen bg-gray-800 text-white w-64">
        <div className="p-4 text-2xl font-bold">Dashboard</div>
        <ul>
            <li className="p-4 cursor-pointer hover:bg-gray-600" onClick={() => setView('teachers')}>
                <FaChalkboardTeacher className="inline mr-2" /> Teachers
            </li>
            <li className="p-4 cursor-pointer hover:bg-gray-600" onClick={() => setView('students')}>
                <FaUsers className="inline mr-2" /> Students
            </li>
            <li className="p-4 cursor-pointer hover:bg-gray-600" onClick={() => setView('create-classroom')}>
                <FaPlus className="inline mr-2" /> Classrooms
            </li>
        </ul>
    </div>
);

Sidebar.propTypes = {
    setView: PropTypes.func.isRequired,
};

export default PrincipalDash