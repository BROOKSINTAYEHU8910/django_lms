import {Link} from "react-router-dom";

const Header = () =>{
  const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
  const studentLoginStatus=localStorage.getItem('studentLoginStatus')
 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
    
      <Link className="navbar-brand" to="/">Learning management System</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ms-auto">
          <Link to="/" className="nav-link active" aria-current="page">Home</Link>
          <Link to="all-course" className="nav-link" >Courses</Link>
          <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Teacher 
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            {teacherLoginStatus!='true' && 
           <>
            <li><Link to="/teacher-login" className="dropdown-item"> Login </Link></li>
            <li><Link to="/teacher-register" className="dropdown-item" > Register </Link></li></>
          }
            <li><Link to="/teacher-dashboard" className="dropdown-item" >Dashboard</Link></li>
            <li><Link to="/teacher-logout" class="dropdown-item" href="#">Log Out</Link></li>
          </ul>
        </li>
          <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            User 
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            {studentLoginStatus!='true' && 
           <>
            <li><Link to="/user-login" className="dropdown-item"> Login </Link></li>
            <li><Link to="/user-register" className="dropdown-item" > Register </Link></li></>
          }
            <li><Link to="/user-dashboard" className="dropdown-item" >Dashboard</Link></li>
            <li><Link to="/user-logout" class="dropdown-item" href="#">Log Out</Link></li>
          </ul>
        </li>
          
          
          
        </div>
      </div>
    </div>
  </nav>
  );
}

export default Header;