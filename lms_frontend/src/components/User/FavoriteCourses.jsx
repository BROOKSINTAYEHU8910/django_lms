import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import SideBar from './SideBar';
const baseUrl='http://127.0.0.1:8000/api';
function FavoriteCourse(){

const studentId=localStorage.getItem('studentId')

const [courseData,setcourseData]=useState([]);


useEffect(()=>{

    try{
        axios.get(baseUrl+'/fetch-favorite-courses/'+studentId)
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
        <Link to="/my-course"><h5 className="card-header">Favorite  courses</h5></Link>
        <div className="card-body">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created By</th>
                    
                    </tr>
                </thead>
                <tbody>
                    
                    {courseData.map((item,index)=>
                    <tr>
                   
                    <td>{item.course.title}</td>
                    <td><Link to='/'>{item.course.teacher.email}</Link></td>
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
export default FavoriteCourse;