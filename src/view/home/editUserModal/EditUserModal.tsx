import { memo } from "react";
import { Button, Col, Row } from "reactstrap";
import { Field, Form, Formik } from "formik";

// // static import
import editUserValidationSchema from "../validation/editUserValidation";
import CustomModal from "../../../components/customModal/CustomModal";
import CustomInput from "../../../components/customForms";
import { updateUser } from "../../../store/sagaActions";
import { userDataType } from "../../../types";
import { useAppDispatch } from "../../../store/hooks";

interface editUserModalPropsTypes {
  open: boolean;
  onClose: () => void;
  data: userDataType;
}

function EditUserModal({ open, onClose, data }: editUserModalPropsTypes) {
  // // initial state
  const dispatch = useAppDispatch();

  const createInitialValue = {
    name: data?.name ?? "",
    city: data?.city ?? "",
    age: data?.age ?? "",
    pinCode: data?.pinCode ?? "",
  };
  return (
    <CustomModal title="Edit User" isOpen={open} onClose={onClose}>
      <Formik
        initialValues={createInitialValue}
        validationSchema={editUserValidationSchema}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          dispatch(updateUser({ values, prevVal: data?.name }));
          onClose();
          resetForm();
        }}
      >
        {({ values }) => (
          <Form className="px-3 py-2">
            {!data?.name && (
              <small className="text-danger fst-italic fw-light">
                This user can't be edit because there is no username, so we
                can't identify the user. Try the same operation with someone who
                has a name.
              </small>
            )}
            <Row className="row-gap-2">
              <Col xs={12}>
                <Field
                  type="text"
                  component={CustomInput}
                  className="form-control"
                  name="name"
                  label="Name"
                />
              </Col>
              <Col xs={12}>
                <Field
                  disabled
                  type="text"
                  component={CustomInput}
                  className="form-control"
                  name="city"
                  label="City"
                />
              </Col>
              <Col xs={12} sm={6}>
                <Field
                  disabled
                  type="number"
                  component={CustomInput}
                  className="form-control"
                  name="age"
                  label="Age"
                  onKeyDown={(e: {
                    key: string;
                    preventDefault: () => void;
                    target: { value: string };
                  }) => {
                    const inputValue = e.target.value;

                    if (
                      !/[\d]|Backspace|Delete|ArrowLeft|ArrowRight|Home|End/.test(
                        e.key
                      )
                    ) {
                      e.preventDefault();
                    }

                    if (
                      (e.key === "." && inputValue.includes(".")) ||
                      (e.key.toLowerCase() === "e" && inputValue.includes("e"))
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Field
                  disabled
                  type="number"
                  component={CustomInput}
                  className="form-control"
                  name="pinCode"
                  label="PIN Code"
                  onKeyDown={(e: {
                    key: string;
                    preventDefault: () => void;
                    target: { value: string };
                  }) => {
                    const inputValue = e.target.value;

                    if (
                      !/[\d]|Backspace|Delete|ArrowLeft|ArrowRight|Home|End/.test(
                        e.key
                      )
                    ) {
                      e.preventDefault();
                    }

                    if (
                      (e.key === "." && inputValue.includes(".")) ||
                      (e.key.toLowerCase() === "e" && inputValue.includes("e"))
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
              </Col>
            </Row>

            <div className="text-end mt-4">
              <Button color="danger" className="me-2 px-3" onClick={onClose}>
                Cancel
              </Button>
              <Button
                color="success"
                className="px-4"
                type="submit"
                disabled={values?.name === data.name || !data?.name}
              >
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
}

export default memo(EditUserModal);
