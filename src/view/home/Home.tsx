import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { CiLogout } from "react-icons/ci";

// // static import
import DynamicTable from "../../components/dynamicTable/DynamicTable";
import tableHead from "./tableHead.json";
import Actions from "../../components/actions/Actions";
import DeleteUserModal from "./deleteUserModal/DeleteUserModal";
import EditUserModal from "./editUserModal/EditUserModal";
import LogOutModal from "../auth/logOutModal/LogOutModal";
import { getUserListData, getUserListSuccess } from "../../store/sagaActions";
import { userDataType } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./style.scss";

function Home() {
  // // initial state
  const dispatch = useAppDispatch();

  // // redux state
  const { userList, isUserListLoading } = useAppSelector(
    (state) => state?.user
  );

  // // local state
  const [deleteUserModal, setDeleteUserModal] = useState<{
    open: boolean;
    data: userDataType;
  }>({
    open: false,
    data: {},
  });
  const [editUserModal, setEditUserModal] = useState<{
    open: boolean;
    data: userDataType;
  }>({
    open: false,
    data: {},
  });
  const [logOutUserModalOpen, setLogOutUserModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");

  // insert data
  let rows = [];
  rows = userList?.map((item: {}, index: number) => {
    const slNo = index + 1;
    const actions = (
      <Actions
        edit={() => setEditUserModal({ open: true, data: item })}
        del={() => setDeleteUserModal({ open: true, data: item })}
      />
    );
    return { ...item, slNo, actions };
  });

  // // handel search
  useEffect(() => {
    if (searchValue) {
      dispatch(getUserListSuccess({ search: searchValue }));
    } else {
      dispatch(getUserListData());
    }
  }, [searchValue]);

  // // life cycle and api call
  useEffect(() => {
    dispatch(getUserListData());
  }, []);

  return (
    <Container fluid="md">
      <div className="d-flex justify-content-between align-items-baseline my-3 top_bar">
        <h5 className="text-center">Home</h5>
        <div className="d-flex align-items-center column-gap-2">
          <input
            type="search"
            placeholder="Search name or city..."
            className="form-control"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <CiLogout
            className="fs-3 cp"
            onClick={() => setLogOutUserModalOpen(true)}
          />
        </div>
      </div>
      <Row className="justify-content-center">
        <Col xs={12} className="shadow-sm table_wrapper">
          <DynamicTable
            tableHead={tableHead}
            tableBody={rows}
            isLoading={isUserListLoading}
          />
        </Col>
      </Row>
      <DeleteUserModal
        open={deleteUserModal.open}
        onClose={() => setDeleteUserModal({ open: false, data: {} })}
        data={deleteUserModal.data}
      />
      <EditUserModal
        open={editUserModal.open}
        onClose={() => setEditUserModal({ open: false, data: {} })}
        data={editUserModal.data}
      />
      <LogOutModal
        open={logOutUserModalOpen}
        onClose={() => setLogOutUserModalOpen(false)}
      />
    </Container>
  );
}

export default Home;
