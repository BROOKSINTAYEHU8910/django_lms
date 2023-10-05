import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';


const baseUrl='http://127.0.0.1:8000/api/teacher/';
function TeacherRegister(){
  const [teacherData, setTeacherData]=useState({
    'id':'',
    'full_name':'',
    'email':'',
    'password':'',
    'mobile_no':'',
    'skills':'',
    'status':'',

  });

  const handleChange=(event)=>{
    setTeacherData({
      ...teacherData,
      [event.target.name]:event.target.value
    });
  }
  const submitForm=(e)=>{
    e.preventDefault()
    console.log(teacherData.full_name)
    console.log(teacherData.email)
    console.log(teacherData.password)
    
    console.log(teacherData.mobile_no)
    console.log(teacherData.skill)

    const teacherFormData=new FormData();
    teacherFormData.append("id", teacherData.id)
    teacherFormData.append("full_name", teacherData.full_name)
    teacherFormData.append("email", teacherData.email)
    teacherFormData.append("password", teacherData.password)
    teacherFormData.append("mobile_no", teacherData.mobile_no)
    teacherFormData.append("skills", teacherData.skills)

    try{
      axios.post(baseUrl,teacherFormData).then((response)=>{
        setTeacherData({
          'id':'',
          'full_name':'',
          'email':'',
          'password':'',
          'mobile_no':'',
          'skills':'',
          'status':'success'
        })
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
  if(teacherLoginStatus=='true'){
    window.location.href='/teacher-dashbord';

  }
    return(
        <div className="container mt-3">
        <div className="row">
          <div className="col-4 offset-3">
            {teacherData.status=='success'&& <p class="text-success">Registered</p>}
            {!teacherData.status == 'error'&& <p class="text-success">error</p>}
          <div className="card">
          <h4 className="card-header">Teacher Register</h4>
            <div className="card-body">
            <form>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Full Name</label>
    <input value={teacherData.full_name} onChange={handleChange} name="full_name" type="text" class="form-control" />
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email</label>
    <input  value={teacherData.email} onChange={handleChange}  name="email" type="text" class="form-control" />
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input value={teacherData.password} onChange={handleChange} name="password"  type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
 
  <div className="mb-3">
    <label for="exampleInputPassword1" class="form-label">Mobile number</label>
    <input value={teacherData.mobile_no} onChange={handleChange} name="mobile_no" type="number" class="form-control" id="examplemobile_no1"/>
  </div>
  
  <div className="mb-3">
    <label for="exampleSkills"  className="form-label">Skills</label>
    <textarea  onChange={handleChange}  name="skill"  className="form-control"></textarea>
  </div>
  
  
  <button onClick={submitForm} type="submit" className="btn btn-primary">Register </button>
</form>

            </div>
          </div>
          </div>
        </div>
      </div>
       
      
    )
}
export default TeacherRegister;