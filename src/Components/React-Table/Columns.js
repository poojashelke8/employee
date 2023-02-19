const handleEdit = (row) =>{
    console.log(row)
  }

export const COLUMNS = [
    {
        Header:"No.",
        accessor:'id'
    },
    {
        Header:"First Name",
        accessor:'firstName'
    },
    {
        Header:"LastName",
        accessor:'lastName'
    },
    {
        Header:"Email",
        accessor:'email'
    },
    {
        Header:"Salary",
        accessor:'salary'
    },
    {
        Header:"Date",
        accessor:'date'
    }
    ]