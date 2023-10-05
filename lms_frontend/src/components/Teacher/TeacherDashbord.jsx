import { Link, useParams } from 'react-router-dom';
import TeacherSideBar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import TeacherSidebar from './TeacherSidebar';

const baseUrl = 'http://127.0.0.1:8000/api';

const TeacherDashbord = () =>{
    const [dashboardData,setdashboardData]=useState([]);
    const teacherId=localStorage.getItem('teacherId');

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/teacher/dashboard/'+teacherId)
            .then((res)=>{
                console.log(res);
                setdashboardData(res.data);
                

                })
 
          }catch(error){
            console.log(error);
          }
        },[]);
    return (
        <div className='row'>
            <aside className='col-md-3'>
                <TeacherSidebar />

            </aside>
            <section className='col-md-9'>
                <div className='row'>
                    <div className='card boarder-primary'>
                        <h5 className='card-header bg-primary text-white'>Total Courses</h5>
                        <div className='card-body'>
                            <h3><Link to="/teacher-course">{dashboardData.total_teacher_courses}</Link></h3>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='card boarder-primary'>
                        <h5 className='card-header bg-success text-white'>Total Students</h5>
                        <div className='card-body'>
                            <h3><Link to="/fetch-all-enrolled-students/:teacher_id">{dashboardData.total_teacher_students}</Link></h3>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='card boarder-primary'>
                        <h5 className='card-header bg-info text-white'>Total Chapters</h5>
                        <div className='card-body'>
                            <h3><Link to="/all-chapters/:course_id">{dashboardData.total_teacher_chapters}</Link></h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default TeacherDashbord;