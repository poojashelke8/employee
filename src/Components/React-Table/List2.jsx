import React,{useMemo} from 'react'
import {COLUMNS} from '../React-Table/Columns'
import { employeesData }from '../Pages/Data'
import {useTable,useRowSelect} from 'react-table'
import Checkbox from './Checkbox'
import {CSVLink} from 'react-csv'

function List2() {

  const data = useMemo(()=> employeesData,[])
  const columns = useMemo(()=> COLUMNS,[])

  const {getTableProps,
         getTableBodyProps,
         prepareRow,
         rows,
         headerGroups,
         selectedFlatRows
        } = useTable(
          {columns,
            data},
            useRowSelect,
            hooks => {
            hooks.visibleColumns.push(columns => [
            {
              id: 'selection',
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <div>
                    <Checkbox {...getToggleAllRowsSelectedProps()} />
                </div>
              ),
              Cell: ({ row }) => (
                <div>
                    <Checkbox {...row.getToggleRowSelectedProps()} />
                </div>
              ),
            },
              ...columns,
          ])
        }
      )  
 
  let csvdata;
  if(selectedFlatRows.length === 0){
    csvdata = employeesData
  }else{
    csvdata = selectedFlatRows.map((row)=>row.original)
  }
  
  const headers=[
    {label:"No", key:'id'},
    {label:"FirstName", key:'firstName'},
    {label:"LastName", key:'lastName'},
    {label:"Email", key:'email'},
    {label:"Salary", key:'salary'},
    {label:"Date", key:'date'},
    ]

  const csvreport = {
      filename:'Report.csv',
      headers:headers,
      data: csvdata
      
  };

  return (
    <div>
      <table {...getTableProps}>
            <thead >
                { headerGroups.map((headerGroup)=>(
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((columns)=>(
                        <th {...columns.getHeaderProps()}>
                            {columns.render("Header")}
                        </th>
                    ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps}>
                {rows.map((row,i)=>{
                  prepareRow(row);
                    return(
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell)=>(
                          <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                          </td>))}
                      </tr>
                    )
                  })}
            </tbody>
            </table>
            <pre>
              <code>
                {JSON.stringify(
                  {
                    selectedFlatRows:selectedFlatRows.map((row)=>row.original),
                  },
                  // null,
                  //   2
                  )}
              </code>
            </pre>
      <button style={{marginLeft:'10px'}}><CSVLink style={{color:'white', textDecoration:"none"}} {...csvreport}>Export</CSVLink></button>
    </div>
    
  )
}


export default List2



















