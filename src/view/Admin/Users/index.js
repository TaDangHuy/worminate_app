import React from "react";
import MUIDataTable from "mui-datatables";

function Users() {
  return (
    <>
      <MUIDataTable
        title={"ACME Employee list"}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
}

const columns = [
  { name: "Name", options: { filterOptions: { fullWidth: true } } },
  "Title",
  "Location",
];

const options = {
  search: true,
  download: true,
  print: true,
  viewColumns: true,
  filter: true,
  filterType: "dropdown",
  responsive: "vertical",
  tableBodyHeight: "400px",
  tableBodyMaxHeight: "",
  onTableChange: (action, state) => {
    console.log(action);
    console.dir(state);
  },
};

const data = [
  ["Gabby George", "Business Analyst", "Minneapolis"],
  [
    "Aiden Lloyd",
    "Business Consultant for an International Company and CEO of Tony's Burger Palace",
    "Dallas",
  ],
  ["Jaden Collins", "Attorney", "Santa Ana"],
  ["Franky Rees", "Business Analyst", "St. Petersburg"],
  ["Aaren Rose", null, "Toledo"],
  ["Johnny Jones", "Business Analyst", "St. Petersburg"],
  ["Jimmy Johns", "Business Analyst", "Baltimore"],
  ["Jack Jackson", "Business Analyst", "El Paso"],
  ["Joe Jones", "Computer Programmer", "El Paso"],
  ["Jacky Jackson", "Business Consultant", "Baltimore"],
  ["Jo Jo", "Software Developer", "Washington DC"],
  ["Donna Marie", "Business Manager", "Annapolis"],
];

export default Users;
