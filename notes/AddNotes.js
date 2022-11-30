import axios from "axios";
import React,{useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom"
import swal from 'sweetalert';

 
export default function AddNotes(){
    
    const navigate = useNavigate()
    const [user, setUser]=useState({
      "noteid": "",
      "note": "",
      "createdon": "",
    });

    const [errors, setErrors]=useState({});
    const [isSubmit, setIsSubmit]=useState(false);

    useEffect(() =>{
          console.log(errors);
        if (Object.keys(errors).length === 0   && isSubmit){
          console.log(user)
        }
    }, [errors])

    
    const { noteid,note,createdon } = user;

    


    const onInputChange = e =>{
      
      setUser({...user,[e.target.name]: e.target.value});
     
    }

    const onSubmit = async e =>{
      e.preventDefault();
      setIsSubmit(true);
     console.log(errors)
     
    if(Object.keys(errors).length===0 && isSubmit)
    
     {
     let res = await axios.post("http://localhost:3003/users",user)
      navigate("/")
     console.log(res)
      if(res){
        swal({
          title: "Notes Added Successfully",
          icon: "success",
          
        });
      }else{
        swal({
          title: "Fail to Add Notes",
          icon: "warning",
        });
      }
  
    }

     
     
    };
    
    return(
        
             <div style={{display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        padding:10,
        borderRadius:10,
        backgroundColor: '#dfe6e9',
        width:700,
        marginLeft:300
        
    }}>
        
       
    <form class="row g-3" onSubmit={onSubmit} >
        <div style={{display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        padding:10,
        borderRadius:10,
        backgroundColor:'#636e72'}}>
        <label><b>Add New Notes</b></label>
        </div>
    
  <div className="col-md-6">
    <label  class="form-label" >NoteID</label>
    <input type="text" class="form-control is-valid" name="noteid" value={user.noteid} onChange={e => onInputChange(e)}  />
    
  </div>
  <div className="col-md-6">
    <label  class="form-label" >Note</label>
    <input type="text" class="form-control is-valid" name="note"   onChange={e => onInputChange(e)} value={user.note}  />
     
  </div>
  

  <div className="col-md-6">
    <label  class="form-label" >CreatedOn</label>
    <input type="text" class="form-control is-valid" name="createdon"   onChange={e => onInputChange(e)} value={user.createdon} />
    
  </div>
 

  
  
  
  <div className="col-12" style={{display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    padding:10,
    borderRadius:10
}}>
    <button type="submit" className="btn btn-primary" >Add</button>
    <Link style={{margin:30}} className="btn btn-primary" to="/">Back</Link>

  
  </div>


</form>
        </div>
    )
}