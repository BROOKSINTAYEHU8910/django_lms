import {Link} from "react-router-dom";

function TeacherSidebar(){
    return(

<div className="card">
<h6 className="card-header">Dashboard</h6>
<div className="list-group list-group-flush">
<Link to="/teacher-dashbord  " className="list-group-item list-group-item-action">Dashbord</Link>
<Link to="/teacher-course" className="list-group-item list-group-item-action">My Courses</Link>
<Link to="/add-course" className="list-group-item list-group-item-action">Add Course</Link>
<Link to="/fetch-all-enrolled-students/:teacher_id " className="list-group-item list-group-item-action">My Users</Link>
<Link to="/quiz " className="list-group-item list-group-item-action">Quiz</Link>
<Link to="/add-quiz" className="list-group-item list-group-item-action"> Add Quiz</Link>
<Link to="/teacher-profile-setting" className="list-group-item list-group-item-action">Profile Setting</Link>
<Link to="/teacher-change-password" className="list-group-item list-group-item-action">Change Password</Link>
<Link to="/teacher-logout" className="list-group-item list-group-item-action text-danger">LogOut</Link>

</div>
</div>
  )

}
export default TeacherSidebar;