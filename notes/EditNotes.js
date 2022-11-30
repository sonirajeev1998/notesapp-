import axios from "axios";
import React,{useState,useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom"
import swal from 'sweetalert';
 
export default function EditNotes(){
    
    const navigate = useNavigate();
    const {id} = useParams();
     
    const [user, setUser]=useState({
      "noteid": "",
      "note": "",
      "createdon": ""

    });
    
    const [errors, setErrors]=useState({});
    const [isSubmit, setIsSubmit]=useState(false);
    const {noteid,note,createdon} = user;


    const onInputChange = e =>{

      setUser({...user,[e.target.name]: e.target.value})
    }

    useEffect(()=>{

        loadUser();
    }, [])

    const onSubmit = async e =>{
      e.preventDefault();
         setIsSubmit(true);
      if(Object.keys(errors).length===0 && isSubmit)
      {
     let res =  await axios .put(`http://localhost:3003/users/${id}`,user);
      navigate("/")

      if(res){
        swal({
          title: "Note Edit Successfully",
          icon: "success",
          
        });
      }else{
        swal({
          title: "Fail to Edit Note",
          icon: "warning",
        });
      }
    }  
    };

    const loadUser = async () =>{
      const result = await axios.get(`http://localhost:3003/users/${id}`);
        setUser(result.data);
    }
    
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
        
       
    <form class="row g-3" >
        <div style={{display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        padding:10,
        borderRadius:10,
        backgroundColor:'#636e72'}}>
        <label><b>Edit Notes</b></label>
        </div>
    
  <div className="col-md-6">
    <label for="validationServer01" class="form-label" >NoteId</label>
    <input type="text" class="form-control is-valid" name="noteid" value={noteid} onChange={e => onInputChange(e)}  />
  </div>
  <div className="col-md-6">
    <label for="validationServer02" class="form-label" >Note</label>
    <input type="text" class="form-control is-valid" name="Note" id="validationServer02"  onChange={e => onInputChange(e)} value={note} required />
  </div>

  <div className="col-md-6">
    <label for="validationServer02" class="form-label" >CreatedOn</label>
    <input type="text" class="form-control is-valid" name="createdon"  id="validationServer02" onChange={e => onInputChange(e)} value={createdon}  required />
  </div>

  
  
  <div className="col-12" style={{display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    padding:10,
    borderRadius:10
}}>
    <button type="submit" onClick={onSubmit} className="btn btn-primary" >Update Note</button>
    <Link style={{margin:30}} className="btn btn-primary" to="/">Back</Link>

  
  </div>


</form>
        </div>
    )
}