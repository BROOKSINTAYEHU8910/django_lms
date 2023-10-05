import { Link, useParams } from 'react-router-dom';
import TeacherSideBar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import TeacherSidebar from './TeacherSidebar';


const  TeacherChangePassword = () =>{
    const baseUrl='http://127.0.0.1:8000/api';


    const [teacherData, setTeacherData]=useState({
        password:'',
       
    
    
      });
    const teacherId=localStorage.getItem('teacherId');

      const handleChange=(event)=>{
        setTeacherData({
          ...teacherData,
          [event.target.name]:event.target.value
        });
      }

      const handleFileChange = (event) => {
        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.files[0]
        });
    }

      const submitForm=()=>{
        
       /* console.log(teacherData.full_name)
        console.log(teacherData.email)
        console.log(teacherData.qualification)
       
        console.log(teacherData.skills)*/
    
        const teacherFormData=new FormData();
        teacherFormData.append("password", teacherData.password)
      
    
        try{
          axios.post(baseUrl+'/teacher/change-password/'+teacherId, teacherFormData)
          .then((res) => {
            if(res.status==200){
                Swal.fire({
                    title:'password has been Updated',
                    icon:'success',
                    toast:true,
                    timer:3000,
                    position:'top-right',
                    timerProgressBar:true,
                    showConfirmButton:false
                })
            }

        });
        }catch(error){
          console.log(error);
          setTeacherData({'status':'error'})
        }
      };
      useEffect(()=>{
        document.title="Teacher Change Password"
      });
      const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
      if(teacherLoginStatus !=='true'){
        window.location.href='/teacher-login';
    
      }
    return (
        <div className="container mt-4" >
            <div className="row">
                <aside className="col-md-3">
                <TeacherSidebar/>
                </aside>
                <section className="col-md-9">
                <div class="card">
                    <h5 className='card-header'> Change Password</h5>
                    <div className='card-body'>
                        
                    </div>
                    <div className='card-body'>
                        <div className='mb-3 row'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">New Password</label>
                            
                                <input type="password" name='="password'   onChange={handleChange} className='form-control ' id='staticEmail' />
                            
                        </div>
                        <button className='btn btn-primary'  type="submit" onClick={submitForm}>Update</button>
                    </div>
    
    </div>
 
  
  
                </section>
            </div>
        </div>
    )
}
export default TeacherChangePassword;