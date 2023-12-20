import { memo } from "react";
import { Button } from "reactstrap";

// // local state
import CustomModal from "../../../components/customModal/CustomModal";
import { deleteUser } from "../../../store/sagaActions";
import { userDataType } from "../../../types";
import { useAppDispatch } from "../../../store/hooks";

interface deleteUserModalPropsTypes {
  open: boolean;
  onClose: () => void;
  data: userDataType;
}

function DeleteUserModal({ open, onClose, data }: deleteUserModalPropsTypes) {
  // // initial state
  const dispatch = useAppDispatch();

  const handelDelete = () => {
    dispatch(deleteUser(data.name));
    onClose();
  };
  return (
    <CustomModal title="Delete User" isOpen={open}>
      <div className="px-3 py-2">
        <p>
          The action you are going to perform is irreversible. Please confirm!
          Are you sure that you want to delete this user <b>"{data?.name}"</b>?
        </p>
        {!data?.name && (
          <small className="text-danger fst-italic fw-light">
            This user can't be deleted because there is no username, so we can't
            identify the user. Try the same operation with someone who has a
            name.
          </small>
        )}
        <div className="text-end">
          <Button color="success" className="me-2" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color="danger"
            className="px-4"
            onClick={handelDelete}
            disabled={!data?.name}
          >
            Yes
          </Button>
        </div>
      </div>
    </CustomModal>
  );
}

export default memo(DeleteUserModal);
