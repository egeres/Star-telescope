import React, { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";

export default function Table({ columns, data }) {

  const [ filterInput,         setFilterInput         ] = useState("");
  const [ filterInputName,     setFilterInputName     ] = useState("");
  const [ filterInputMinstars, setFilterInputMinstars ] = useState("");


  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter
  } = useTable(
    {
      columns,
      data
    },
    useFilters,
    useSortBy
  );

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("name", value);
    setFilterInput(value);
  };

  const handleFilterLanguageChange = e => {
    const value = e.target.value || undefined;
    setFilter("language", value);
    setFilterInputName(value);
  };

  const handleFilterMinstarsChange = e => {
    const value = e.target.value || undefined;
    setFilter("stars", value);
    setFilterInputMinstars(value);
  };

  // Render the UI for your table
  return (
    <>

      <input
        className   = "rounded_input"
        value       = {filterInput}
        onChange    = {handleFilterChange}
        placeholder = {"Repo name 😅"}
      />

      <div className="element_spacer"></div>
      
      <input
        className   = "rounded_input"
        value       = {filterInputName}
        onChange    = {handleFilterLanguageChange}
        placeholder = {"Repo language 📑"}
      />

      <div className="element_spacer"></div>

      <input
        className   = "rounded_input"
        value       = {filterInputMinstars}
        onChange    = {handleFilterMinstarsChange}
        placeholder = {"Minimum stars ✨"}
      />

      <div className="element_spacer"></div>

      <table {...getTableProps()}>

        <thead>
          {headerGroups.map(headerGroup => (

            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>

          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>

      </table>

    </>
  );
}