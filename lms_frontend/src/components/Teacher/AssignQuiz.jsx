import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import {useEffect,useState} from 'react'; 
import axios from "axios";
import CheckQuizCourse from "./CheckQuizCourse";

const baseUrl='http://127.0.0.1:8000/api';
function AssignQuiz (){
const [quizData, setquizData]=useState([]);
const [courseData, setcourseData]=useState([]);
const [totalResult,settotalResult]=useState(0);

const teacherId=localStorage.getItem('teacherId');

const {course_id}=useParams();

 

useEffect(()=>{
console.log(teacherId)
    try{
        axios.get(baseUrl+'/teacher-quiz/'+teacherId)
        .then((res)=>{
            setquizData(res.data);
          
        });
      }catch(error){
        console.log(error);
      }

      try{
        axios.get(baseUrl+'/add-course/'+course_id)
        .then((res)=>{
            setcourseData(res.data);
         
        });
      }catch(error){
        console.log(error);
      }

    //   try{
    //     axios.get(baseUrl+'/fetch-assign-status/'+teacherId+'/'+quiz_id)
    //     .then((res)=>{
    //         setassignStatus(res.data);
            
  
          
          
    //     });
    //   }catch(error){
    //     console.log(error);
    //   }
    },[]);

    const Swal = require('sweetalert2');

    const AssignQuiz = (quiz_id) => {


        const _formData = new FormData();
        _formData.append('teacher', teacherId);
        _formData.append('course', course_id);
        _formData.append('quiz', quiz_id);

       

        try {
            axios.post(baseUrl+'/quiz-assign-course/', _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                       window.location.reload()

                        
                     //   setassignStatus('success');

                    }


                });
        } catch (error) {

            console.log(error);
        }



    }

    

    return(
        <div className="container mt-4">
        <div className="card">
        <h5 className="card-header">Assign Quiz ( {courseData.title} )</h5>
        <div className="card-body">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
              
                <tbody>
                    {quizData.map((row,index)=>
                    <tr>
                    <td><Link to={`/all-questions/${row.id}`}>{row.title}</Link>
                    
                </td>
                   
                    <td>
                     <CheckQuizCourse quiz={row.id} course={course_id}/>
                    </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
   
    </div>
    )
}
export default AssignQuiz;