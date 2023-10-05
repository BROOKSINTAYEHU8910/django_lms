import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import {useEffect,useState} from 'react'; 
import axios from "axios";


const baseUrl='http://127.0.0.1:8000/api';
function UserList(){
const [StudentData, setStudentData]=useState([]);
const teacherId=localStorage.getItem('teacherId')





 

useEffect(()=>{

    try{
        axios.get(baseUrl+'/fetch-all-enrolled-students/'+teacherId)
        .then((res)=>{
            setStudentData(res.data);
            
            
            
        });
    }catch(error){
          console.log("res")
        console.log(error);
      }
    },[]);

    

    return(
        <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
                <TeacherSidebar />
            </aside>
        <h5 className="card-header">All Student list</h5>
        <div className="card-body">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Interested Category</th>
                        <th>Assignment</th>
                    </tr>
                </thead>
                
                <tbody>
                    {StudentData.map((row,index)=>
                    <tr>
                    <td><Link to={'/view-student/'+row.student.id}>{row.student.full_name}</Link></td>
                    <td>{row.student.email}</td>
                    <td>{row.student.username}</td>
                    <td>
                    {row.student.interested_categories }
                        
                    </td>
                    <td>
                        <Link to={`/show-assignment/${row.student.id}/${teacherId}`}className="btn btn-sm btn-warning"><i class="bi bi-activity"></i></Link>
                        <Link to={`/add-assignment/${row.student.id}/${teacherId}`} className="btn btn-sm btn-success"><i class="bi bi-node-plus"></i></Link>
                    </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
   
    </div>
    )
}
export default UserList;