import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { hideAlert } from "@/store/slices/alertSlice";
import { useEffect } from "react";

const success = "bg-green-50 border-green-400 text-green-800";
const error = "bg-red-50 border-red-400 text-red-800";

const Alert = () => {
  const dispatch = useDispatch();
  const { message, status } = useSelector((state: RootState) => state.alertState);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(hideAlert());
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null; 

  return (
    <div className={`${status === "success" ? success : error} text-sm p-2 mt-1 mb-5 flex justify-between`}>
      <span>{message}</span>
      <X onClick={() => dispatch(hideAlert())} className="cursor-pointer" />
    </div>
  );
};

export default Alert;
