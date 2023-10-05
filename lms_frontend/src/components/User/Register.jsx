import { Link } from 'react-router-dom';
import { useState,useEffect} from 'react';
import axios from 'axios';


const baseUrl='http://127.0.0.1:8000/api/user-register/';

function Register(){

  const [studentData, setstudentData]=useState({
    
    'full_name':'',
    'email':'',
    'password':'',
    'username':'',
    'interested_categories':'',
    'status':'',

  });

  const handleChange=(event)=>{
    setstudentData({
      ...studentData,
      [event.target.name]:event.target.value
    });
  }

  const submitForm=(e)=>{
    e.preventDefault()
    console.log(studentData.full_name)
    console.log(studentData.email)
    console.log(studentData.password)
    console.log(studentData.username)
    console.log(studentData.interested_categories)
  
    const studentFormData=new FormData();
    studentFormData.append("email", studentData.email)
    studentFormData.append("full_name", studentData.full_name)
    studentFormData.append("interested_categories", studentData.interested_categories)
    studentFormData.append("password", studentData.password)
    studentFormData.append("username", studentData.username)
    
    try{
      axios.post(baseUrl,studentFormData).then((response)=>{
       
        setstudentData({
          'full_name':'',
          'email':'',
          'password':'',
          'username':'',
          'interested_categories':'',
          'status':'success'
        })
      });
    }catch(error){
      console.log(error);
      setstudentData({'status':'error'})
    }
    console.log(studentFormData.username)
  };
  useEffect(()=>{
    document.title="Student Register"
  });
  const teacherLoginStatus=localStorage.getItem(teacherLoginStatus)
  if(teacherLoginStatus=='true'){
    window.location.href='student-dashboard';

  }


    return(
        <div className="container mt-3">
        <div className="row">
        {studentData.status=='success'&& <p class="text-success">Registered</p>}
            {!studentData.status == 'error'&& <p class="text-success">error</p>}
          <div className="col-4 offset-3">
          <div className="card">
            <h4 className="card-header">user Register</h4>
            <div className="card-body">
            <form>
  <div className="mb-3">
    <label for="exampleInputEmail1" class="form-label">Full Name</label>
    <input type="text" value={studentData.full_name} name='full_name' onChange={handleChange} class="form-control" />
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
    <input type="text" value={studentData.email} class="form-control" name='email' onChange={handleChange} />
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" value={studentData.password} class="form-control" name='password' onChange={handleChange} id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword" class="form-label">UserName</label>
    <input type="text" value={studentData.username} name='username' class="form-control" onChange={handleChange}  id="exampleInputusername"/>
  </div>
  
  <div className="mb-3">
    <label for="exampleInputEmail1" class="form-label">Interested</label>
    <textarea name='interested_categories' value={studentData.interested_categories} onChange={handleChange} className="form-control" ></textarea>
    <div id='text' onChange={handleChange} class="form-text">Php, Javascript, c++</div>
  </div>
  
  <button type="submit" onClick={submitForm} class="btn btn-primary">Register </button>
</form>

            </div>
          </div>
          </div>
        </div>
      </div>
       
      
    )
}

export default Register;