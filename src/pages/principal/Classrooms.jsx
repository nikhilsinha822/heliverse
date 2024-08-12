import { useState, useEffect } from 'react';
import ClassroomCard from '../../components/ClassroomCard';
import CreateClassroomModal from '../../components/CreateClassroomModal';
import AssignTeacherModal from '../../components/AssignTeacherModal';
import axios from 'axios'

const Classrooms = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);


  const openModal = (classroom) => {
    setIsModalOpen(true)
    setSelectedClassroom(classroom)
  };
  const closeModal = (selectedTeacher) => {
    setIsModalOpen(false)
    if (!selectedTeacher?.email) return;
    const updatedClassroom = classrooms.map((classroom) =>
      classroom._id === selectedClassroom._id ?
        { classroom, teacher: {email: selectedTeacher} } :
        classroom
    )
    setClassrooms(updatedClassroom)
  };
  const openCreateModal = () => setCreateModalOpen(true);

  const closeCreateModal = (classroomData) => {
    setCreateModalOpen(false);
    if (!classroomData || !classroomData.name) return;
    const updatedClassroom = [classroomData, ...classrooms];
    setClassrooms(updatedClassroom)
  }

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        setIsError(false);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/classroom`)
        console.log(response.data.data)
        setClassrooms(response.data.data)
      } catch (error) {
        console.log(error)
        setIsError(true);
      } finally {
        setIsLoading(false)
      }
    }
    fetchClassroom();
  }, [])

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/principal/teachers`);
        setTeachers(response.data.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  if (isLoading)
    return <div>Loading...</div>

  if (isError)
    return <div>There was some error</div>

  return (
    <div>
      <div className='flex'>
        <h2 className="text-xl font-bold mb-4">Classrooms</h2>
        <button disabled={!teachers?.length} className="bg-blue-500 text-white px-4 py-2 rounded m-4 ml-auto disabled:opacity-50" onClick={openCreateModal}>Create Classroom</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classrooms.map(classroom => (
          <ClassroomCard key={classroom._id} classroom={classroom} onClick={() => openModal(classroom)} />
        ))}
      </div>
      {createModalOpen && <CreateClassroomModal closeModal={(classroomData) => closeCreateModal(classroomData)} />}
      {isModalOpen && (
        <AssignTeacherModal
          closeModal={(selectedTeacher) => closeModal(selectedTeacher)}
          teachers={teachers}
          selectedClassroom={selectedClassroom}
        />
      )}
    </div>
  );
};

export default Classrooms;
