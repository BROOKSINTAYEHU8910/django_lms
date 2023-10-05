import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import {useEffect,useState} from 'react'; 
import axios from "axios";

const baseUrl='http://127.0.0.1:8000/api';
function AllQuiz(){
const [quizData, setquizData]=useState([]);
const [totalResult,settotalResult]=useState(0);

const teacherId=localStorage.getItem('teacherId');



 

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
    },[]);

    const Swal = require('sweetalert2');

const handleDeleteClick =(quiz_id)=>{

    Swal.fire({
        title: 'confirm',
        text: 'Are Sure you want to delete this Quiz?',
        icon: 'info',
        confirmButtonText:'continue',
        showCancelButton:true
    }).then((result)=>{
        if(result.isConfirmed){
            try{
                axios.delete(baseUrl+'/quiz/'+quiz_id)
                .then((res)=>{
                    Swal.fire('success', 'Quiz has been deleted.');

                    try{
                        axios.get(baseUrl+'/teacher-quiz/'+teacherId)
                        .then((res)=>{
                
                            settotalResult(res.data.length);
                            setquizData(res.data);
                            
                  
                          
                          
                        });
                      }catch(error){
                        console.log(error);
                      }

                   /* console.log(res);
                    settotalResult(res.data.length);
                    setChapterData(res.data);*/
                });
                
            }catch(error){
                Swal.fire('error','Quiz has not been deleted');
            }
        }else{
            Swal.fire('error', 'Quiz has not been deleted');
        }
    })

}

    

    return(
        <div className="container mt-4">
        <div className="card">
        <h5 className="card-header">All Quiz </h5>
        <div className="card-body">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Total Question</th>
                        <th>Action</th>
                    </tr>
                </thead>
              
                <tbody>
                    {quizData.map((row,index)=>
                    <tr>
                    <td><Link to={`/all-questions/${row.id}`}>{row.title}</Link>
                    
                </td>
                   
                    
                    <td><Link to="#"> 123</Link></td>
                    <td>
                         <Link className="btn btn-info" to={`/edit-quiz/${row.id}`}><i class="bi bi-brush"></i></Link>
                        <Link className="btn btn-success  btn-sm ms-2 " to={`/quiz-questions/${row.id}`}><i class="bi bi-question-octagon-fill"></i></Link>
                        <button onClick={()=>handleDeleteClick(row.id)} className="btn btn-danger btn-sm "  >Delete</button>
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
export default AllQuiz;