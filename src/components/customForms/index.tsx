import { getIn } from "formik";

const CustomInput = ({ field, form: { touched, errors }, ...props }) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);

  return (
    <div className="d-flex flex-column row-gap-1">
      {!props.withOutLabel && (
        <label className="nameInput">{props.label}</label>
      )}
      <input
        className={`${error && touch && "is-invalid"}`}
        {...field}
        {...props}
      />
      {error && touch && (
        <div className="invalid-feedback d-block mb-1">{error}</div>
      )}
    </div>
  );
};

export default CustomInput;
