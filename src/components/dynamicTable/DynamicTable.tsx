import React, { memo } from "react";
import { Table } from "reactstrap";
import "./style.scss";

type tableHeadProps = {
  _id: string;
  label: string;
};
type tableBodyProps = {
  slNo?: string | number;
  name?: string | null;
  age?: string | number | null;
  city?: string | null;
  pinCode?: string | number | null;
  action?: string | React.JSX.Element;
  [key: string]: string | number | null | React.JSX.Element | undefined;
};

interface dynamicTableProps {
  tableHead: tableHeadProps[];
  tableBody: tableBodyProps[] | [];
  isLoading: boolean;
}
function DynamicTable({ tableHead, tableBody, isLoading }: dynamicTableProps) {
  return (
    <Table responsive striped hover>
      <thead className="table-dark">
        <tr>
          {tableHead.map((col: tableHeadProps, i) => (
            <th key={i}>{col?.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          [...new Array(4)].map(() => (
            <tr key={Math.random()}>
              {tableHead?.map((col) => (
                <td key={col?._id}>
                  <div className="skeleton w-100" />
                </td>
              ))}
            </tr>
          ))
        ) : tableBody?.length > 0 ? (
          tableBody?.map((row: tableBodyProps) => (
            <tr key={Math.random()}>
              {tableHead?.map((col) => (
                <td key={col?._id}>{row?.[col?._id] || "--"}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td className="border-0">No Data</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default memo(DynamicTable);
