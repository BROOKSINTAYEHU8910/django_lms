import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import {useEffect,useState} from 'react'; 
import axios from "axios";


const baseUrl='http://127.0.0.1:8000/api';
function EnrolledStudents(){
const [StudentData, setStudentData]=useState([]);


let {course_id}=useParams();


 

useEffect(()=>{
console.log(course_id)
    try{
        axios.get(baseUrl+'/fetch-enrolled-students/'+course_id)
        .then((res)=>{
            setStudentData(res.data);
  
          
          
        });
      }catch(error){
        console.log(error);
      }
    },[]);

    

    return(
        <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
                <TeacherSidebar />
            </aside>
        <h5 className="card-header">Enrolled Student list</h5>
        <div className="card-body">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Action</th>
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
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
   
    </div>
    )
}
export default EnrolledStudents;