import React ,{useState}from 'react'
import { employeesData } from './Data'
import Swal from 'sweetalert2';
import Header from './Header'
import Add from './Add'
import Edit from './Edit'
import List from './List'
// import List2 from '../React-Table/List2';
import List2 from '../React-Table/List2';

function Dashboard() {

    const [employees,setEmployees] = useState(employeesData);

    const [selectedEmp,setSelectedEmp] = useState(null)

    const [isAdding,setIsAdding] = useState(false)

    const [isEditing,setIsEditing] = useState(false)

    const handleDelete = (id)=>{
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
    }).then(result => {
        if (result.value) {
            const [employee] = employees.filter(employee => employee.id === id);

            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
                showConfirmButton: false,
                timer: 1500,
            });

            setEmployees(employees.filter(employee => employee.id !== id));
        }
    });
    }


    const handleEdit = (id) =>{
      const [employee] = employees.filter(employee => employee.id === id);

      setSelectedEmp(employee);
      setIsEditing(true)

    }
  return (
    <div className='container'>
        {!isAdding && !isEditing &&(
          <>
          <Header setIsAdding={setIsAdding}/>
          <List
            employees={employees}
            handleEdit = {handleEdit}
            handleDelete = {handleDelete}
            />
            {/* <List
              handleEdit = {handleEdit}
            /> */}
          </>
         )}
        {isAdding && (
          <Add 
            employees={employees}
            setEmployees={setEmployees}
            setIsAdding={setIsAdding}/>

        )}
      
        {isEditing &&(
          <Edit 
            employees={employees}
            setEmployees={setEmployees}
            setIsEditing={setIsEditing}
            selectedEmp={selectedEmp}
          />

        )} 
    </div>
  )
}

export default Dashboard