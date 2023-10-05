import { Link, useParams } from "react-router-dom";
import SideBar from "./SideBar";
import {useEffect,useState} from 'react'; 
import axios from "axios";


const baseUrl='http://127.0.0.1:8000/api';
function RecommendedCourses(){
const [StudentData, setStudentData]=useState([]);
const studentId=localStorage.getItem('studentId')





 

useEffect(()=>{

    try{
        axios.get(baseUrl+'/fetch-recomended-courses/'+studentId)
        .then((res)=>{
            console.log(res.data)
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
                <SideBar />
            </aside>
        <h5 className="card-header">All Student list</h5>
        <div className="card-body">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Tech:</th>
                       
                    </tr>
                </thead>
                
                <tbody>
                    {StudentData.map((item)=>(
                    <tr key={item.id}>
                    <td><Link to={'/detail/'+item.id}>{item.title}</Link></td>
                    <td>{item.techs}</td>
                  
                    </tr>)
                    )}
                </tbody>
            </table>
        </div>
    </div>
   
    </div>
    )
}
export default RecommendedCourses; 