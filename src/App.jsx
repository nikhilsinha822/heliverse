import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import PrincipalDash from "./pages/principal"
import StudentDash from "./pages/student"
import TeacherDash from "./pages/teacher"
import axios from 'axios'

const App = () => {
  axios.defaults.withCredentials = true;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="dashboard">
        <Route path="principal" element={<PrincipalDash />} />
        <Route path="student" element={<StudentDash />} />
        <Route path="teacher" element={<TeacherDash />} />
      </Route>
    </Routes>
  )
}

export default App