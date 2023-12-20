import { useState } from "react";
import { Button, Tooltip } from "reactstrap";

// // static import
import { userSignIn } from "../../store/sagaActions";
import { useAppDispatch } from "../../store/hooks";

function SignIn() {
  // // initial state
  const dispatch = useAppDispatch();

  // // local state
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const handelSignIn = () => {
    localStorage.setItem("authToken", Math.random().toString());
    dispatch(userSignIn());
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Button
        color="success"
        className="py-3 px-5 shadow"
        onClick={handelSignIn}
        id="tooltip"
      >
        Click To Sign In/Login
      </Button>
      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        autohide={false}
        target="tooltip"
        toggle={toggle}
      >
        Please click here to access the dashboard. I've added this feature to
        demonstrate my authentication and guest route skills to you.
      </Tooltip>
    </div>
  );
}

export default SignIn;
