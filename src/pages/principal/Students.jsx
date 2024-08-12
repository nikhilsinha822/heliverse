import axios from "axios";
import { useEffect, useState } from "react";
import EditUserModal from '../../components/EditUserModal'
import CreateUserModal from '../../components/CreateUserModal';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setEditModalOpen(true);
  };

  const closeCreateModal = (std) => {
    setCreateModalOpen(false);
    if (!std || !std.email) return;
    const updatedTeacherList = [std, ...students]
    setStudents(updatedTeacherList)
  };

  const closeEditModal = (std) => {
    setEditModalOpen(false);
    const updatedStudentList = students.map((student) =>
      student._id === std._id ?
        std :
        student
    )
    setStudents(updatedStudentList);
    setSelectedStudent(null);
  };

  const deleteStudent = async (std) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/auth/principal/user/${std._id}`)
      const updatedStudentList = students.filter((Student) => Student._id !== std._id)
      setStudents(updatedStudentList)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/principal/students`)
        setStudents(response.data.data)
      } catch (error) {
        console.log(error);
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStudents();
  }, [])

  if (isLoading)
    return <div>Loading...</div>

  if (isError)
    return <div>There was some problem loading your data</div>

  return (
    <div>
      <div className='flex gap-2 items-center justify-center'>
        <h2 className="text-xl font-bold mb-4">Students</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded m-4 ml-auto" onClick={() => setCreateModalOpen(true)}>Add New</button>
      </div>
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4">Student ID</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td className="border-t py-3 px-4">{student._id}</td>
              <td className="border-t py-3 px-4">{student.email}</td>
              <td className="border-t py-3 px-4 m-auto">
                <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={() => openEditModal(student)}>Edit</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => deleteStudent(student)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editModalOpen && <EditUserModal user={selectedStudent} closeModal={(std) => closeEditModal(std)} />}
      {createModalOpen && <CreateUserModal role={"Student"} closeModal={(std) => closeCreateModal(std)} />}
    </div>
  );
};

export default Students;
