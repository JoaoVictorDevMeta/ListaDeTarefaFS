import { useNavigate } from "react-router";

export function logout(navigate: ReturnType<typeof useNavigate>) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
}
