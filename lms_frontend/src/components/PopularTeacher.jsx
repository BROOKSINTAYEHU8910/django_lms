import {Link} from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';

const PopularTeacher = () =>{
    const [teacher,setTeacher]=useState(null);
    useEffect(()=>{
        axios.get(baseUrl+'/teacher/').then((response)=>{
            console.log(response.data);
            
        });
      },[]);
        
       
   
  return(
    <div className="container mt-4">
    {/*Latest courses*/} 
    <h3 className="pb-1 mb-4">web Development Courses </h3>  
     <div className="row mb-4">
       <div className="col-md-3 mb-4">
         <div className="card">
           <Link to="/detail/1"><img src="/teacher.png" className="card-img-top" alt="..." /></Link>
            <div className="card-body">
           <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
          </div>
        </div>
      </div>
      <div className="col-md-3">
       <div className="card">
         <a href="#"><img src="/teacher.png" className="card-img-top" alt="..." /></a>
         <div className="card-body">
           <h5 className="card-title"><a href="#">Card title</a></h5>
          </div>
        </div>
      </div>
      <div className="col-md-3">
       <div className="card">
         <a href="#"><img src="/teacher.png" className="card-img-top" alt="..." /></a>
         <div className="card-body">
           <h5 className="card-title"><a href="#">Card title</a></h5>
          </div>
        </div>
      </div>
      <div className="col-md-3">
       <div className="card">
         <a href="#"><img src="/teacher.png" className="card-img-top" alt="..." /></a>
         <div className="card-body">
           <h5 className="card-title"><a href="#">Card title</a></h5>
          </div>
        </div>
      </div>
  </div>
  <div className="container mt-4">
    {/*Latest courses*/} 
    <h3 className="pb-1 mb-4">Latest Courses </h3>  
     <div className="row mb-4">
       <div className="col-md-3 mb-4">
         <div className="card">
           <Link to="/detail/1"><img src="/teacher.png" className="card-img-top" alt="..." /></Link>
            <div className="card-body">
           <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
          </div>
        </div>
      </div>
      <div className="col-md-3">
       <div className="card">
         <a href="#"><img src="/teacher.png" className="card-img-top" alt="..." /></a>
         <div className="card-body">
           <h5 className="card-title"><a href="#">Card title</a></h5>
          </div>
        </div>
      </div>
      <div className="col-md-3">
       <div className="card">
         <a href="#"><img src="/teacher.png" className="card-img-top" alt="..." /></a>
         <div className="card-body">
           <h5 className="card-title"><a href="#">Card title</a></h5>
          </div>
        </div>
      </div>
      <div className="col-md-3">
       <div className="card">
         <a href="#"><img src="/teacher.png" className="card-img-top" alt="..." /></a>
         <div className="card-body">
           <h5 className="card-title"><a href="#">Card title</a></h5>
          </div>
        </div>
      </div>
  </div>
  </div>

  <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item disabled">
      <a class="page-link">Previous</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
  </div>

  
  )
}
export default PopularTeacher;
