import { Button } from "reactstrap";
import CustomModal from "../../../components/customModal/CustomModal";

interface logoutUserModalPropsTypes {
  open: boolean;
  onClose: () => void;
}

function LogOutModal({ open, onClose }: logoutUserModalPropsTypes) {
  const handelLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };
  return (
    <CustomModal title="Delete User" isOpen={open}>
      <div className="px-3 py-2">
        <p>
          The action you are going to perform is irreversible. Please confirm!
          Are you sure that you want to logout?
        </p>
        <div className="text-end">
          <Button color="success" className="me-2" onClick={onClose}>
            Cancel
          </Button>
          <Button color="danger" className="px-4" onClick={handelLogout}>
            Yes
          </Button>
        </div>
      </div>
    </CustomModal>
  );
}

export default LogOutModal;
