import Swal from "sweetalert2";

interface AlertProps {
    icon: 'error' | 'info' | 'success' | 'warning';
    title:string;
    text:string;
}

export const showAlert = (props:AlertProps) => {
    Swal.fire({...props})
};