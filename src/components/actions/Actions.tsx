import React, { memo } from "react";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
interface actionPropsType {
  edit: () => void | string;
  del: () => void | string;
}
function Actions(props: actionPropsType) {
  const { edit, del } = props;
  const actions: React.JSX.Element[] = [];

  edit &&
    actions.push(
      <MdOutlineEdit onClick={edit} key={Math.random()} className="cp fs-5" />
    );
  del &&
    actions.push(
      <MdOutlineDelete
        onClick={del}
        key={Math.random()}
        className="cp ms-2 fs-5 text-danger"
      />
    );

  return <div className="d-flex justify-content-center">{actions}</div>;
}

export default memo(Actions);
