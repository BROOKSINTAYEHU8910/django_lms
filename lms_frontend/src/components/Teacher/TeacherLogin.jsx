import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';


const baseUrl='http://127.0.0.1:8000/api';
function TeacherRegister(){
  const [teacherLoginData, setteacherLoginData]=useState({
    email:'',
    password:''
  });

  const [errorMsg, seterrorMsg]=useState('');

  const handleChange=(event)=>{
    setteacherLoginData({
      ...teacherLoginData,
      [event.target.name]:event.target.value
    });
  }

  const submitForm=(e)=>{
    const teacherFormData=new FormData;
    e.preventDefault()
    
    teacherFormData.append('email',teacherLoginData.email)
    teacherFormData.append('password',teacherLoginData.password)
    
    try{
      axios.post(baseUrl+'/teacher-login', teacherFormData).then((res)=>{
        if(res.data.bool==true){
          localStorage.setItem('teacherLoginStatus',true);
          localStorage.setItem('teacherId', res.data.teacher_id);
          window.location.href='/teacher-dashboard';

        }else{
          seterrorMsg('Invalid Email or Password');
        }

        
      });
    }catch(error){
      console.log(error);
    }

  }

  const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
  if(teacherLoginStatus=='true'){
    window.location.href='/teacher-dashboard';

  }

  

  useEffect(()=>{
    document.title="Teacher Login"
  });
  
    return(
        <div className="container mt-3">
        <div className="row">
          <div className="col-4 offset-3">
            
          <div className="card">
          <h4 className="card-header">Teacher Login</h4>
            <div className="card-body">
           
              {errorMsg && <p className='text-danger'>{errorMsg}</p>}
  
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email</label>
    <input  value={teacherLoginData.email} onChange={handleChange}  name="email" type="text" class="form-control" />
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input value={teacherLoginData.password} onChange={handleChange} name="password"  type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
 
  
  
  <button onClick={submitForm} type="submit" className="btn btn-primary">Login </button>


            </div>
          </div>
          </div>
        </div>
      </div>
       
      
    )
}
export default TeacherRegister;