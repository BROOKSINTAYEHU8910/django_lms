import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';


const baseUrl='http://127.0.0.1:8000/api';
function Login(){
  const [studentLoginData, setstudentLoginData]=useState({
    email:'',
    password:''
  });

  const [errorMsg, seterrorMsg]=useState('');

  const handleChange=(event)=>{
    setstudentLoginData({
      ...studentLoginData,
      [event.target.name]:event.target.value
    });
  }

  const submitForm=(e)=>{
    const studentFormData=new FormData;
    e.preventDefault()
    
    studentFormData.append('email',studentLoginData.email)
    studentFormData.append('password',studentLoginData.password)
    
    try{
      axios.post(baseUrl+'/student-login', studentFormData).then((res)=>{
        if(res.data.bool==true){
          localStorage.setItem('studentLoginStatus',true);
          localStorage.setItem('studentId', res.data.student_id);
          window.location.href='/user-dashbord';

        }else{
          seterrorMsg('Invalid Email or Password');
        }

        
      });
    }catch(error){
      console.log(error);
    }

  }

  const studentLoginStatus=localStorage.getItem('studentLoginStatus')
  if(studentLoginStatus=='true'){
    window.location.href='/user-dashbord';

  }

  

  useEffect(()=>{
    document.title="Student Login"
  });
  
    return(
        <div className="container mt-3">
        <div className="row">
          <div className="col-4 offset-3">
            
          <div className="card">
          <h4 className="card-header">Student Login</h4>
            <div className="card-body">
           
              {errorMsg && <p className='text-danger'>{errorMsg}</p>}
  
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email</label>
    <input  value={studentLoginData.email} onChange={handleChange}  name="email" type="text" class="form-control" />
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input value={studentLoginData.password} onChange={handleChange} name="password"  type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
 
  
  
  <button onClick={submitForm} type="submit" className="btn btn-primary">Login </button>


            </div>
          </div>
          </div>
        </div>
      </div>
       
      
    )
}
export default Login;