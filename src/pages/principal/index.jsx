import axios from "axios";
import { useEffect } from "react";


const PrincipalDash = () => {
    useEffect(() => {
        const fetchClassroom = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/classroom`)
            console.log(response.data.data)
        }
        fetchClassroom();
    }, [])
    return (
        <div>Principal</div>
    );
}

export default PrincipalDash