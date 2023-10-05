import { Link, useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import SideBar from './SideBar';

const baseUrl = 'http://127.0.0.1:8000/api';

const StudentDashbord = () =>{
    const [dashboardData,setdashboardData]=useState([]);
    const studentId=localStorage.getItem('studentId');

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/student/dashboard/'+studentId)
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
                <SideBar />

            </aside>
            <section className='col-md-9'>
                <div className='row'>
                    <div className='card boarder-primary'>
                        <h5 className='card-header bg-primary text-white'>Enroled Courses</h5>
                        <div className='card-body'>
                            <h3><Link to="/my-course">{dashboardData.enrolled_courses}</Link></h3>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='card boarder-primary'>
                        <h5 className='card-header bg-success text-white'>Favorite Courses</h5>
                        <div className='card-body'>
                            <h3><Link to="/favorite-courses">{dashboardData.favorite_courses}</Link></h3>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='card boarder-primary'>
                        <h5 className='card-header bg-info text-white'>Assignments</h5>
                        <div className='card-body'>
                            <h5>
                                <Link to="/my-assignments">Completed: {dashboardData.completed_assignments}, Pending: {dashboardData.pending_assignments} </Link></h5>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default StudentDashbord;