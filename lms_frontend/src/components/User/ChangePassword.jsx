import { Link, useParams } from 'react-router-dom';
import SideBar from './SideBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';




const  TeacherChangePassword = () =>{
    const baseUrl='http://127.0.0.1:8000/api';


    const [studentData, setstudentData]=useState({
        password:'',
       
    
    
      });
    const studentId=localStorage.getItem('studentId');

      const handleChange=(event)=>{
        setstudentData({
          ...studentData,
          [event.target.name]:event.target.value
        });
      }

      const handleFileChange = (event) => {
        setstudentData({
            ...studentData,
            [event.target.name]: event.target.files[0]
        });
    }

      const submitForm=()=>{
        
       /* console.log(teacherData.full_name)
        console.log(teacherData.email)
        console.log(teacherData.qualification)
       
        console.log(teacherData.skills)*/
    
        const studentFormData=new FormData();
        studentFormData.append("password", studentData.password)
      
    
        try{
          axios.post(baseUrl+'/student/change-password/'+studentId, studentFormData)
          .then((res) => {
            if(res.status==200){
                window.location.href='user-logout';
               /* Swal.fire({
                    title:'password has been Updated',
                    icon:'success',
                    toast:true,
                    timer:3000,
                    position:'top-right',
                    timerProgressBar:true,
                    showConfirmButton:false
                })*/
            }else{
                alert('oops.. bad status!')
            }

        });
        }catch(error){
          console.log(error);
          setstudentData({'status':'error'})
        }
      };
      useEffect(()=>{
        document.title="Student Change Password"
      });
      const studentLoginStatus=localStorage.getItem('studentLoginStatus')
      if(studentLoginStatus !=='true'){
        window.location.href='/user-login';
    
      }
    return (
        <div className="container mt-4" >
            <div className="row">
                <aside className="col-md-3">
                <SideBar/>
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