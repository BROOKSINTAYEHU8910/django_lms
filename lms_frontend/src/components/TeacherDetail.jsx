
import {Link, useParams} from 'react-router-dom';


import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';

const TeacherDetail = () =>{
    const [courseData, setCourseData]=useState([]);
    const [teacherData, setteacherData]=useState([]);
    const [skillList, setskillList]=useState([]);
    let {teacher_id}=useParams();

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/teacher-detail/'+teacher_id)
            .then((res)=>{    
                setteacherData(res.data);
                setCourseData(res.data.teacher_courses);
                setskillList(res.data.skill_list);;
                console.log(skillList)
      
              
              
            });
          }catch(error){
            console.log(error);
          }
        },[]);

    return (
        <div className="container" mt-3>
            <div className="row">
                <div className="col-4">
                <img src="/logo512.png" className="img-thumbnail"alt="Teacher Image" />
                </div>
                <div className="col-8">
                    <h3>{teacherData.full_name}</h3>
                    <h4>{teacherData.detail}</h4>
                    <p className="fw-bold">Skills:
 
                    {skillList.map((Skills,index)=>
                    <Link className='badge bg-warning '  to={`/teacher-skill-courses/${Skills.trim()}/${teacherData.id}`}>{Skills.trim() }</Link>
                    )}
                 </p>
                    <p className="fw-bold">{teacherData.qulification} <Link  to={`/teacher-detail/${teacherData.id}`} >Php</Link></p> 
                    <p className="fw-bold">Experence: 0 years</p>
                    <p className="fw-bold">Recent Course</p>
                    <p className="fw-bold">Rating:4.5/5</p> 
                </div>
            </div>
            <div className='card-mt-4'>
                <h5 className='card-header'>Course List</h5>
                <div className='list-group list-group-flush'>
                    {courseData.map((course,index)=>
                    <Link key={course.id} to={`/teacher-detail/${course.id}`} className="list-group-item list-group-action">{course.title}</Link>
                    )}
                </div>
            </div>
        </div>

    );
}
export default TeacherDetail;
