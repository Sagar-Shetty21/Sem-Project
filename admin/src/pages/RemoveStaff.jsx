import React, {useState, useEffect} from 'react'
import './removeStaff.css'
import PopupModal from '../modals/popupModal';


const RemoveStaff = () => {


  const [tableData, setTableData] = useState([]);
  const [active, setActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [search, setSearch] = useState('');

  
  useEffect(() => {
    fetch('http://localhost:8080/manage-users/allstaffs')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTableData(data);
      })
      .catch(error => console.error(error));
  }, []);


  const handleClick = () => {
    setActive(!active);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search)
    fetch('http://localhost:8080/manage-users/getstaff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify({ regno: search })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))

  }

  const handleDelete = () => {
    fetch('http://localhost:8080/manage-users/removestaff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify({ regno: selectedUser.staff_id })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))
  }

  return (
    <div className="remove-staff-page">
      <div class="search-local">
        <div class="icon">
          <i class="fa-solid fa-magnifying-glass"/>
        </div>

        <input type="text" placeholder="Enter Register ID" onChange={(e) => setSearch(e.target.value)} value={search} />
        <button onClick={handleSearch}>
          <span>Search</span>
        </button>
      </div>

      <div className="table-container">
        <table>
          <tr>
            <th>Register ID</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Gender</th> 
          </tr>

      {tableData.map(item => {
        return(
          <tr onClick={() => {
            setActive(true);
            setSelectedUser([item.name,item.staff_id]);
          }}>
            <td>{item.staff_id}</td>
            <td>{item.name}</td>
            <td>{item.designation}</td>
            <td>{item.gender}</td>
          </tr>
        )
      })}
        </table>
      </div>
      {active ? <PopupModal active bg="orange" toggleActive={handleClick}>
        <h1>Are you sure you want to delete this user?</h1>
        <br/><br/>
        <h2>{selectedUser[0]}</h2>
        <button onClick={handleDelete}>Confirm</button>
      </PopupModal>:null}
    </div>
  )
}

export default RemoveStaff