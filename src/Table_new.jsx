
import React, { useEffect } from "react";
import {
  useTable
  ,useSortBy
  ,usePagination
  ,useFilters
  ,useGlobalFilter
  ,useAsyncDebounce
} from "react-table";

import Cookies  from 'js-cookie'
import * as eva from "eva-icons";



// Function for global search
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div style={{ padding: 10, border: "1px solid", marginTop: 20 }}>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0"
        }}
      />
    </div>
  );
}
// Global search function ended



// Function for default filters
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      // placeholder={`Search ${count} records...`}
      placeholder={`Search...`}
    />
  );
}
// Default filters function Ended


// Function for select filter
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
// Select filter function end



// Function for slider range filter
function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <span>{filterValue || min}</span>{" "}
      <button onClick={() => setFilter(undefined)}>Off</button>
    </>
  );
}
// Slider filter function end

// Function for Min-Max range filter
function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id }
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div
      style={{
        display: "flex"
      }}
    >
      <input
        value={filterValue[0] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1]
          ]);
        }}
        placeholder={`Min (${min})`}
        style={{
          width: "70px",
          marginRight: "0.5rem"
        }}
      />
      to
      <input
        value={filterValue[1] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined
          ]);
        }}
        placeholder={`Max (${max})`}
        style={{
          width: "70px",
          marginLeft: "0.5rem"
        }}
      />
    </div>
  );
}
// Min-Max range filter function end



// Table function. It creates UI.
function Table({columns, data}) {
  
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );
  
  

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

//   setPageSize(20)

  useEffect(() => {
    //       setPageSize( parseInt(Cookies.get('table_pagesize')) )

    // if (pageSize != 100) { setPageSize(100); }

    if (Cookies.get('table_pagesize'))
    {
      if (pageSize !== parseInt(Cookies.get('table_pagesize')) ) { setPageSize( parseInt(Cookies.get('table_pagesize')) ); }
    }
    else
    {
      if (pageSize !== 100) { setPageSize(100); }
    }
    // console.log(pageSize)

    // setPageSize(50)
    eva.replace()
  })

  // Render the UI for your table
  return (
    <>
      
      {/* <GlobalFilter
        preGlobalFilteredRows = {preGlobalFilteredRows}
        globalFilter          = {globalFilter}
        setGlobalFilter       = {setGlobalFilter}
      /> */}
      
      <table
        {...getTableProps()}
        border={1}
        style={{
          borderCollapse: "collapse",
          width         : "100%",
          margin        : "auto",
          overflowY     : "scroll",
          paddingRight  : "17px",
          boxSizing     : "content-box",
        }}
      >
        
        <thead>
          {headerGroups.map((group) => (
            <tr {...group.getHeaderGroupProps()}>
              {group.headers.map((column) => (
                <th 
                  {...column.getHeaderProps()}
                  // style= {{ ...column.getHeaderProps.style }}
                  style={{
                    // backgroundColor:"red"
                  }}
                >
                    {/* {column.getHeaderProps()["width"]} */}
                    {/* {column.getHeaderProps()} */}
                    {/* {JSON.stringify(column.getHeaderProps())} */}

                    <div {...column.getSortByToggleProps()} className="noselect">
                      {column.render("Header")}
                      <span >
                        {column.isSorted
                          ? column.isSortedDesc
                            // ? <div><i data-eva="arrow-upward-outline"   fill="#343434"></i></div>
                            // ? " ^"
                            ? " 🔼"
                            // : <div><i data-eva="arrow-downward-outline" fill="#343434"></i></div>
                            // : " X"
                            // : <div><i data-eva="arrow-upward-outline"   fill="#343434"></i></div>
                            // : <i data-eva="arrow-upward-outline"   fill="#343434"></i>
                            // : " v"
                            : " 🔽"
                          : column.canSort
                        //   ? "⏺"
                          ? ""
                          : ""}
                      </span>
                    </div>
                  
                  
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  
                </th>
              ))}
            </tr>
          ))}
        </thead>
        

        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        
        {/* <tfoot>
          {footerGroups.map((group) => (
            <tr {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <td {...column.getFooterProps()}>
                  {column.render("Footer")}
                </td>
              ))}
            </tr>
          ))}
        </tfoot> */}
        
      </table>
      
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          style={{height:"25px"}}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            Cookies.set('table_pagesize', Number(e.target.value).toString());
          }}
        >
          {[100, 250, 500, 1000, 15000, 999999].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      
    </>
  );
}
// Table function component end

// App component start
function App() {

  // Columns array. This array contains your table headings and accessors which maps keys from data array
  const columns = React.useMemo(() => (
  [
    {
        "id": "columnId_00.4301301637852736",
        "Header": "Remove later",
        "Footer": "",
        "columns": [
            {
                "id": "columnId_0_00.3993265160822733",
                "Header": "Name",
                "Footer": "",
                "accessor": "Key0"
            },
            {
                "id": "columnId_0_00.8048758967415083",
                "Header": "Stars",
                "Footer": "",
                "accessor": "Key1",
                "filter": "between"
            },
            {
                "id": "columnId_0_00.9075474765424285",
                "Header": "Language",
                "Footer": "",
                "accessor": "Key2",
                "filter": "includes"
            },
            {
                "id": "columnId_0_00.4798125422028431",
                "Header": "Topics",
                "Footer": "",
                "accessor": "Key3"
            }
        ]
    }
]
  ), []);

  // Data array. Replace it with your actual data.
  const data = React.useMemo(() => ([
    {
        "Key0": "Julian",
        "Key1": 1,
        "Key2": "Ms",
        "Key3": "hhs.gov"
    },
    {
        "Key0": "Ketti",
        "Key1": 2,
        "Key2": "Dr",
        "Key3": "desdev.cn"
    },
    {
        "Key0": "Fallon",
        "Key1": 3,
        "Key2": "Rev",
        "Key3": "elegantthemes.com"
    },
    {
        "Key0": "Leela",
        "Key1": 4,
        "Key2": "Dr",
        "Key3": "oakley.com"
    },
    {
        "Key0": "Vivienne",
        "Key1": 5,
        "Key2": "Rev",
        "Key3": "example.com"
    },
    {
        "Key0": "Margaux",
        "Key1": 6,
        "Key2": "Ms",
        "Key3": "harvard.edu"
    },
    {
        "Key0": "Mannie",
        "Key1": 7,
        "Key2": "Rev",
        "Key3": "upenn.edu"
    },
    {
        "Key0": "Vanya",
        "Key1": 8,
        "Key2": "Mrs",
        "Key3": "dmoz.org"
    },
    {
        "Key0": "Barbabra",
        "Key1": 9,
        "Key2": "Rev",
        "Key3": "netlog.com"
    },
    {
        "Key0": "Fiann",
        "Key1": 10,
        "Key2": "Mr",
        "Key3": "yolasite.com"
    },
    {
        "Key0": "Sargent",
        "Key1": 11,
        "Key2": "Ms",
        "Key3": "alibaba.com"
    },
    {
        "Key0": "Josy",
        "Key1": 12,
        "Key2": "Rev",
        "Key3": "wikipedia.org"
    },
    {
        "Key0": "Hulda",
        "Key1": 13,
        "Key2": "Honorable",
        "Key3": "imgur.com"
    },
    {
        "Key0": "Giavani",
        "Key1": 14,
        "Key2": "Ms",
        "Key3": "apache.org"
    },
    {
        "Key0": "Berkley",
        "Key1": 15,
        "Key2": "Ms",
        "Key3": "163.com"
    },
    {
        "Key0": "Nick",
        "Key1": 16,
        "Key2": "Honorable",
        "Key3": "linkedin.com"
    },
    {
        "Key0": "Angelina",
        "Key1": 17,
        "Key2": "Rev",
        "Key3": "constantcontact.com"
    },
    {
        "Key0": "Guglielmo",
        "Key1": 18,
        "Key2": "Honorable",
        "Key3": "is.gd"
    },
    {
        "Key0": "Myrtie",
        "Key1": 19,
        "Key2": "Mr",
        "Key3": "shinystat.com"
    },
    {
        "Key0": "Oates",
        "Key1": 20,
        "Key2": "Honorable",
        "Key3": "xinhuanet.com"
    },
    {
        "Key0": "Griswold",
        "Key1": 21,
        "Key2": "Rev",
        "Key3": "cbc.ca"
    },
    {
        "Key0": "Paxton",
        "Key1": 22,
        "Key2": "Rev",
        "Key3": "homestead.com"
    },
    {
        "Key0": "Inesita",
        "Key1": 23,
        "Key2": "Mr",
        "Key3": "google.nl"
    },
    {
        "Key0": "Charleen",
        "Key1": 24,
        "Key2": "Honorable",
        "Key3": "yale.edu"
    },
    {
        "Key0": "Rowland",
        "Key1": 25,
        "Key2": "Rev",
        "Key3": "booking.com"
    },
    {
        "Key0": "Trueman",
        "Key1": 26,
        "Key2": "Rev",
        "Key3": "cbslocal.com"
    },
    {
        "Key0": "Mathilda",
        "Key1": 27,
        "Key2": "Rev",
        "Key3": "amazon.de"
    },
    {
        "Key0": "Melloney",
        "Key1": 28,
        "Key2": "Honorable",
        "Key3": "lulu.com"
    },
    {
        "Key0": "Inglis",
        "Key1": 29,
        "Key2": "Rev",
        "Key3": "chronoengine.com"
    },
    {
        "Key0": "Giustina",
        "Key1": 30,
        "Key2": "Mr",
        "Key3": "ed.gov"
    },
    {
        "Key0": "Conrad",
        "Key1": 31,
        "Key2": "Mrs",
        "Key3": "wsj.com"
    },
    {
        "Key0": "Emmalynne",
        "Key1": 32,
        "Key2": "Dr",
        "Key3": "amazon.de"
    },
    {
        "Key0": "Jude",
        "Key1": 33,
        "Key2": "Rev",
        "Key3": "uiuc.edu"
    },
    {
        "Key0": "Farlee",
        "Key1": 34,
        "Key2": "Honorable",
        "Key3": "webs.com"
    },
    {
        "Key0": "Mendel",
        "Key1": 35,
        "Key2": "Honorable",
        "Key3": "digg.com"
    },
    {
        "Key0": "Fae",
        "Key1": 36,
        "Key2": "Dr",
        "Key3": "yellowbook.com"
    },
    {
        "Key0": "Janella",
        "Key1": 37,
        "Key2": "Rev",
        "Key3": "flickr.com"
    },
    {
        "Key0": "Esmeralda",
        "Key1": 38,
        "Key2": "Ms",
        "Key3": "ihg.com"
    },
    {
        "Key0": "Quintilla",
        "Key1": 39,
        "Key2": "Ms",
        "Key3": "indiegogo.com"
    },
    {
        "Key0": "Devland",
        "Key1": 40,
        "Key2": "Rev",
        "Key3": "yellowbook.com"
    },
    {
        "Key0": "Preston",
        "Key1": 41,
        "Key2": "Mrs",
        "Key3": "theguardian.com"
    },
    {
        "Key0": "Quintilla",
        "Key1": 42,
        "Key2": "Dr",
        "Key3": "wordpress.com"
    },
    {
        "Key0": "Minor",
        "Key1": 43,
        "Key2": "Mrs",
        "Key3": "senate.gov"
    },
    {
        "Key0": "Jody",
        "Key1": 44,
        "Key2": "Mrs",
        "Key3": "cbslocal.com"
    },
    {
        "Key0": "Shanda",
        "Key1": 45,
        "Key2": "Mr",
        "Key3": "indiatimes.com"
    },
    {
        "Key0": "Sheelagh",
        "Key1": 46,
        "Key2": "Mrs",
        "Key3": "acquirethisname.com"
    },
    {
        "Key0": "Ester",
        "Key1": 47,
        "Key2": "Ms",
        "Key3": "unicef.org"
    },
    {
        "Key0": "Anita",
        "Key1": 48,
        "Key2": "Rev",
        "Key3": "amazon.co.jp"
    },
    {
        "Key0": "Aurelea",
        "Key1": 49,
        "Key2": "Mr",
        "Key3": "pinterest.com"
    },
    {
        "Key0": "Aldis",
        "Key1": 50,
        "Key2": "Ms",
        "Key3": "instagram.com"
    }
]), []);

  
  return (
    <Table columns={columns} data={data} />
  );
}
// App component end

// export default App;
export default Table;
