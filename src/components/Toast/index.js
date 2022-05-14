import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast(type, msg) {
  if (type === "error") {
    return toast.error(msg, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (type === "success") {
    return toast.success(msg, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}
