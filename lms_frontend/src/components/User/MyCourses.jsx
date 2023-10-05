import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import SideBar from './SideBar';
const baseUrl='http://127.0.0.1:8000/api';
function MyCourses(){

const studentId=localStorage.getItem('studentId')

const [courseData,setcourseData]=useState([]);


useEffect(()=>{

    try{
        axios.get(baseUrl+'/fetch-enrolled-courses/'+studentId)
        .then((res)=>{
            setcourseData(res.data);
            
            
            
        });
    }catch(error){
          console.log("res")
        console.log(error);
      }
    },[]);

    return(
        <div className="container mt-4">
        <div className="row">
            <aside className='col-md-3'>
                <SideBar/>
            </aside>
            <section className='col-md-9'></section>
            <div className='card-body'></div>
        <Link to="/my-course"><h5 className="card-header">My courses</h5></Link>
        <div className="card-body">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created By</th>
                        <th>Quiz</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {courseData.map((item,index)=>
                    <tr>
                   
                    <td>{item.course.title}</td>
                    <td><Link to={`/teacher-detail/`+item.course.teacher.id}>{item.course.teacher.email}</Link></td>
                    <td><Link className='btn btn-sm btn-warning' to={`/course-quiz/`+item.course.id}>Quiz List</Link>
                    <Link className='btn btn-sm btn-info' to={`/user/study-material/`+item.course.id}>Study Material</Link>
                    </td>
                    </tr>
                     )}
                    <td>

                    </td>
                </tbody>
            </table>
        </div>
    </div>
    </div>
    )
}
export default MyCourses;