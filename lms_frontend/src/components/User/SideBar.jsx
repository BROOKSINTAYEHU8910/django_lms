import {Link} from 'react-router-dom';
import {useState,useEffect} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';

function SideBar(){

  const [notifData,setnotifData]=useState([]);
  const studentId=localStorage.getItem('studentId');


  useEffect(()=>{
    try{
      axios.get(baseUrl+'/student/fetch-all-notications/'+studentId)
      .then((res)=>{
        console.log(res);
        setnotifData(res.data);

      });
    }catch(error){
      console.log(error);
    }
  })



    return(

<div className="card">
<h6 className="card-header">Dashboard</h6>
<div className="list-group list-group-flush">
<Link to="/student-dashboard" className="list-group-item list-group-item-action">Dashbord</Link>
<Link to="/my-course" className="list-group-item list-group-item-action">My courses</Link>
<Link to="/favorite-courses" className="list-group-item list-group-item-action">Favorite Courses</Link>
<Link to="/recommended-courses" className="list-group-item list-group-item-action">Recommended Courses</Link>
<Link to="/my-assignments" className="list-group-item list-group-item-action">Assignments <span className="float-end badge bg-primary">{notifData.length}</span></Link>
<Link to="/profile-setting" className="list-group-item list-group-item-action">Profile Setting</Link>
<Link to="/change-password" className="list-group-item list-group-item-action">Change Password</Link>
<Link to="/user-logout" className="list-group-item list-group-item-action text-danger">LogOut</Link>

</div>
</div>
  )

}
export default SideBar;