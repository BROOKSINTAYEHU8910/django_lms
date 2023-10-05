import { Link, useParams } from 'react-router-dom';
import TeacherSideBar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import TeacherSidebar from './TeacherSidebar';

const baseUrl='http://127.0.0.1:8000/api';
const TeacherProfileSetting = () =>{

    const [teacherData, setTeacherData]=useState({
        'id':'',
        'full_name':'',
        'email':'',
        'qualification':'',
        'mobile_no':'',
        'skills':'',
        'profile_img':'',
        'p_img':'',
        'status':'success ',
    
      });
    const teacherId=localStorage.getItem('teacherId');

    
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/teacher-detail/'+teacherId)
            .then((res)=>{
                setTeacherData({
                    full_name:res.data.full_name,
                    email:res.data.email,
                    qualification:res.data.qualification,
                    mobile_no:res.data.mobile_no,
                    skills:res.data.skills,
                    profile_img:res.data.profile_img,
                    p_img:'',

                })
 
              
            });
          }catch(error){
            console.log(error);
          }
        },[]);
    

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
        
      console.log(teacherData.full_name)
        console.log(teacherData.email)
        console.log(teacherData.qualification)
       
        console.log(teacherData.skills)
    
        const teacherFormData=new FormData();
        teacherFormData.append("id", teacherData.id)
        teacherFormData.append("full_name", teacherData.full_name)
        teacherFormData.append("email", teacherData.email)
        teacherFormData.append("qualification", teacherData.qualification)
        teacherFormData.append("skills", teacherData.skills)
       // teacherFormData.append("profile_img", teacherData.profile_img)

        if(teacherData.p_img!=''){
            teacherFormData.append('profile_img', teacherData.p_img);
        }
    
        try{
          axios.put(baseUrl+'/teacher-detail/'+teacherId, teacherFormData,{
              headers: {
                  'content-type': 'multipart/form-data'
              }
          })
          .then((res) => {
            if(res.status==200){
                Swal.fire({
                    title:'Data has been Updated',
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
        document.title="Teacher Register"
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
                    <h5 className='card-header'> Profile Setting</h5>
                    <div className='card-body'>
                        <div className='mb-3 row'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">Full Name</label>
                            <div className='col-sm-10'>
                                <input type="text" className='form-control ' name='full_name' value={teacherData.full_name} onChange={handleChange} id='staticEmail' />
                            </div>
                        </div>
                    </div>
                    
                        <div className='mb-3 row'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                            <div className='col-sm-10'>
                                <input type="text" className='form-control' name='email' value={teacherData.email} onChange={handleChange} id='staticEmail' />
                            </div>
                        </div>
                   
                  
                  

                        <div className='mb-3 row' >
                            <label for="video" className="col-sm-2 col-form-label">Profile Image</label>
                            <div class="col-sm-10">
                            <input type="file"  onChange={handleFileChange} className='form-control ' name='p_img' id='video' />
                            {teacherData.profile_img &&
                            <p className='mt-2'><img   src={teacherData.profile_img} width="300" alt={teacherData.full_name}  /></p>
                            }
                            </div>
                        </div>
                        
                    <div className='card-body'>
                        <div className='mb-3 row'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">Skills</label>
                            <div className='col-sm-10'>
                                <textarea classname="form-control" cols={70} name='skills' value={teacherData.skills} onChange={handleChange} ></textarea>
                                <div id='emailHelp' className='form-text'>Php, Python, Javascript</div>
                            </div>
                        </div>
                        <div className='card-body'>
                        <div className='mb-3 row'>
                            <label for="staticEmail" className="col-sm-2 col-form-label" >Qualification</label>
                            <div className='col-sm-10'>
                            <textarea classname="form-control" cols={70} name='qualification' value={teacherData.qualification} onChange={handleChange} ></textarea>
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
export default  TeacherProfileSetting;