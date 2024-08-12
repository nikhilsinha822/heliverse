import { useState, useEffect } from 'react';
import EditUserModal from '../../components/EditUserModal';
import CreateUserModal from '../../components/CreateUserModal';
import axios from 'axios'

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const openEditModal = (teacher) => {
    setSelectedTeacher(teacher);
    setEditModalOpen(true);
  };

  const closeEditModal = (tch) => {
    setEditModalOpen(false);
    if(!tch || !tch.email) return;
    const updatedTeacherList = teachers.map((teacher) =>
      teacher._id === tch._id ?
        tch :
        teacher
    )
    setTeachers(updatedTeacherList)
    setSelectedTeacher(null);
  };

  const closeCreateModal = (tch) => {
    setCreateModalOpen(false);
    if(!tch || !tch.email) return;
    const updatedTeacherList = [tch, ...teachers]
    setTeachers(updatedTeacherList)
  };

  const deleteTeacher = async (tch) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/auth/principal/user/${tch._id}`)
      const updatedTeacherList = teachers.filter((teacher) => teacher._id !== tch._id)
      setTeachers(updatedTeacherList)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/principal/teachers`)
        setTeachers(response.data.data)
      } catch (error) {
        console.log(error);
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTeachers();
  }, [])

  if (isLoading)
    return <div>Loading...</div>

  if (isError)
    return <div>There was some problem loading your data</div>

  return (
    <div>
      <div className='flex gap-2 items-center justify-center'>
        <h2 className="text-xl font-bold mb-4">Teachers</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded m-4 ml-auto" onClick={() => setCreateModalOpen(true)}>Add New</button>
      </div>
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4">Teacher ID</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map(teacher => (
            <tr key={teacher._id}>
              <td className="border-t py-3 px-4">{teacher._id}</td>
              <td className="border-t py-3 px-4">{teacher.email}</td>
              <td className="border-t py-3 px-4">
                <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={() => openEditModal(teacher)}>
                  Edit
                </button>
                <button onClick={() => deleteTeacher(teacher)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editModalOpen && <EditUserModal user={selectedTeacher} closeModal={(tch) => closeEditModal(tch)} />}
      {createModalOpen && <CreateUserModal role={"Teacher"} closeModal={(tch) => closeCreateModal(tch)} />}
    </div>
  );
};

export default Teachers;
