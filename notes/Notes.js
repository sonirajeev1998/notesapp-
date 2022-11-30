import React,{useState,useEffect} from "react";
import { Link,useParams } from "react-router-dom";
import axios from "axios";

export default function Notes(){

    const [user, setUser]=useState({
        "noteid": "",
        "note": "",
        "createdon": ""
      });

      const {id} = useParams();

      useEffect(()=>{

        loadUser();
       }, [])


      const loadUser = async () =>{
        const result = await axios.get(`http://localhost:3003/users/${id}`);
          setUser(result.data);
      }
      
    return(
        <div className="container py-4">
            <Link className="btn btn-primary" to="/">Back to Home</Link>
            <h1 className="display-4">User Id: {id}</h1>
            <hr />
            <ul className="list-group w-50">
                <li className="list-group-item">noteid: {user.noteid}</li>
                <li className="list-group-item">note: {user.note}</li>
                <li className="list-group-item">createdon: {user.createdon}</li>
            </ul>
            
        </div>
    )
}