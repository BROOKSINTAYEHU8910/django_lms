import { Link, useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import SideBar from './SideBar';



const baseUrl='http://127.0.0.1:8000/api';
const ProfileSetting = () =>{

    const [studentData, setstudentData]=useState({
        'id':'',
        'full_name':'',
        'email':'',
        'username':'',
        'interested_categories':'',
        'profile_img':'',
        'p_img':'',
        'status':'success ',
    
      });
    const studentId=localStorage.getItem('studentId');

    
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/student/'+studentId)
            .then((res)=>{
                setstudentData({
                    full_name:res.data.full_name,
                    email:res.data.email,
                    username:res.data.username,
                    interested_categories:res.data.interested_categories,
                    profile_img:res.data.profile_img,
                    p_img:'',

                })
 
              
            });
          }catch(error){
            console.log(error);
          }
        },[]);
    

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
        
       /*console.log(teacherData.full_name)
        console.log(teacherData.email)
        console.log(teacherData.qualification)
       
        console.log(teacherData.skills)*/
    
        const studentFormData=new FormData();
        studentFormData.append("id", studentData.id)
        studentFormData.append("full_name", studentData.full_name)
        studentFormData.append("email", studentData.email)
        studentFormData.append("username", studentData.username)
        studentFormData.append("interested_categories", studentData.interested_categories)
       // teacherFormData.append("profile_img", teacherData.profile_img)

        if(studentData.p_img!=''){
            studentFormData.append('profile_img', studentData.p_img);
        }
    
        try{
          axios.put(baseUrl+'/student/'+studentId, studentFormData,{
              headers: {
                  'content-type': 'multipart/form-data'
              }
          })
          .then((res) => {
            if(res.status==200){
                Swal.fire({
                    title:'profile has been Updated',
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
          setstudentData({'status':'error'})
        }
      };
      useEffect(()=>{
        document.title="Student Profile Setting"
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
                    <h5 className='card-header'> Profile Setting</h5>
                    <div className='card-body'>
                        <div className='mb-3 row'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">Full Name</label>
                            <div className='col-sm-10'>
                                <input type="text" className='form-control ' name='full_name' value={studentData.full_name} onChange={handleChange} id='staticEmail' />
                            </div>
                        </div>
                    </div>
                    
                        <div className='mb-3 row'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                            <div className='col-sm-10'>
                                <input type="text" className='form-control' name='email' value={studentData.email} onChange={handleChange} id='staticEmail' />
                            </div>
                        </div>
                   
                  
                  

                        <div className='mb-3 row' >
                            <label for="video" className="col-sm-2 col-form-label">Profile Image</label>
                            <div class="col-sm-10">
                            <input type="file"  onChange={handleFileChange} className='form-control ' name='p_img' id='video' />
                            {studentData.profile_img &&
                            <p className='mt-2'><img   src={studentData.profile_img} width="300" alt={studentData.full_name}  /></p>
                            }
                            </div>
                        </div>
                        
                    <div className='card-body'>
                        <div className='mb-3 row'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">Username</label>
                            <div className='col-sm-10'>
                                <input classname="form-control" cols={70} name='username' value={studentData.username} onChange={handleChange} />
                            
                            </div>
                        </div>
                        <div className='card-body'>
                        <div className='mb-3 row'>
                            <label for="staticEmail" className="col-sm-2 col-form-label" >interested Category</label>
                            <div className='col-sm-10'>
                            <textarea classname="form-control" cols={70} name='interested_categories' value={studentData.interested_categories} onChange={handleChange} ></textarea>
                                <div id='emailHelp' className='form-text'>BA | MSC|BCA</div>
                            </div>
                        </div>
                        </div>
                        
                        <button className='btn btn-primary' onClick={submitForm}>Update</button>
                    </div>
    
    </div>
 
  
  
                </section>
            </div>
        </div>
    )
}
export default  ProfileSetting;