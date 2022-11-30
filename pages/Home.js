import React, {useState,useEffect} from "react";
import axios from "axios";
import { Link,NavLink } from "react-router-dom";
import {MdDelete} from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import {GrView} from "react-icons/gr"
import swal from 'sweetalert';



export default function Home(){
    const [users, setUsers]=useState([])
    const [value, setValue]=useState("")

  
    
                                 
    const handleSearch = async (e)=>{
         e.preventDefault()
         return await axios.get(`http://localhost:3003/users?q=${value}`).then((result)=> {
           setUsers(result.data);
           setValue("");
          })
           .catch((err) =>console.log(err))
    
    }

     useEffect(()=>{
        loadUsers(0, 4, 0);
     },[])

      const loadUsers = async (start, end, increase)=>{
          const result = await axios.get(`http://localhost:3003/users?_start=${start}&_end=${end}`)
              
             setUsers(result.data)
             
              
           
           
        }

         const deleteUser = async id =>{
          let res = await axios.delete(`http://localhost:3003/users/${id}`)
           loadUsers();
           if(res){
            swal({
              title: "Notes Deleted Successfully",
              icon: "success",
              
            });
          }else{
            swal({
              title: "Fail to Deleted Notes",
              icon: "warning",
            });
          }
      
        
         }


    return(
        <div className="container">
           <div className="py-4">
               <h1>Home page</h1>
               
               <form class="d-flex py-3" onSubmit={handleSearch}>
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={value} onChange={(e)=>setValue(e.target.value)} />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
               <table class="table border shadow">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th  scope="col">NoteID</th>
      <th scope="col">Note</th>
      <th scope="col">CreatedOn</th>
      <th >Action</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user,index)=>(
        <tr>
         <th scope="row">{index + 1}</th>
         <td>{user.noteid}</td>
         <td>{user.note}</td>
         <td>{user.createdon}</td>
         
         <td>
         
         <Link  to={`/notes/${user.id}`} >
          <GrView  size='20'/>
         </Link>
       
        
         
         <Link className="btn shadow-none " to={`/editnotes/${user.id}`} >
           <GrEdit className="text-primary ms-3" size='20' />
         </Link>
      

         <button className="btn shadow-none"  onClick={() => deleteUser(user.id)} >
           <MdDelete className="text-danger ms-3" size='20' />
         </button>
         
      
         </td>
         
        </tr>

        
        
    
    ))}
        
  </tbody>
</table>

         

           </div>
         
    
        </div>
    )
}