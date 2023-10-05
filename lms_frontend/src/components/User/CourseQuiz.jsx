import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import CheckQuizStatus from './CheckQuizStatus'
import SideBar from './SideBar';
const baseUrl='http://127.0.0.1:8000/api';
function CourseQuiz(){

const studentId=localStorage.getItem('studentId')

const [quizData,setquizData]=useState([]);

const {course_id}=useParams();
useEffect(()=>{

    try{
        axios.get(baseUrl+'/fetch-assigned-quiz/'+course_id)
        .then((res)=>{
            setquizData(res.data);
            
            
            
        });
    }catch(error){
          console.log("res")
        console.log(error);
      }
      document.title='Quiz List';
    },[]);

    return(
        <div className="container mt-4">
        <div className="row">
            <aside className='col-md-3'>
                <SideBar/>
            </aside>
            <section className='col-md-9'></section>
            <div className='card-body'></div>
        <Link to="/my-course"><h5 className="card-header">Quiz  List</h5></Link>
        <div className="card-body">
            <table className="table table-bordered">
                <thead>
                    <tr>
                     
                        <th>Quiz </th>
                        <th>Action</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {quizData.map((item,index)=>
                    <tr>
                   
                    <td>{item.quiz.title}</td>
                  <CheckQuizStatus quiz={item.quiz.id} student={studentId} />
                    </tr>
                     )}
                    <td>

                    </td>
                </tbody>
            </table>
        </div>
    </div>
    </div>
    )
}
export default CourseQuiz;