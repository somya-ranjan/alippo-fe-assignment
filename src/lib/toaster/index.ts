import { toast } from "react-toastify";

const toaster = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  warn: (message: string) => toast.warn(message),
  info: (message: string) => toast.info(message),
};
export default toaster;
