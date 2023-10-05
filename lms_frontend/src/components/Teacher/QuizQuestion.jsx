import TeacherSidebar from './TeacherSidebar';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';



const baseUrl='http://127.0.0.1:8000/api';

const QuizQuestion = () =>{

    
    const [totalResult, settotalResult]=useState(0);
  const [questionData, setquestionData]=useState([]);
  const {quiz_id}=useParams();

  
  

  useEffect(()=>{
    try{
        axios.get(baseUrl+'/quiz-questions/'+quiz_id)
        .then((res)=>{

            settotalResult(res.data.length);
            setquestionData(res.data);
            
  
          
          
        });
      }catch(error){
        console.log(error);
      }
    },[]);
const Swal = require('sweetalert2');

const handleDeleteClick =(question_id)=>{

    Swal.fire({
        title: 'confirm',
        text: 'Are Sure you want to delete this course?',
        icon: 'info',
        confirmButtonText:'continue',
        showCancelButton:true
    }).then((result)=>{
        if(result.isConfirmed){
            try{
                axios.delete(baseUrl+'/question/'+question_id)
                .then((res)=>{
                    Swal.fire('success', 'Data has been deleted.');

                    try{
                        axios.get(baseUrl+'/quiz-questions/'+quiz_id)
                        .then((res)=>{
                
                            settotalResult(res.data.length);
                            setquestionData(res.data);
                            
                  
                          
                          
                        });
                      }catch(error){
                        console.log(error);
                      }

                   /* console.log(res);
                    settotalResult(res.data.length);
                    setChapterData(res.data);*/
                });
                
            }catch(error){
                Swal.fire('error','Data has not been deleted');
            }
        }else{
            Swal.fire('error', 'Data has not been deleted');
        }
    })

}

  return(
    <div className='container mt-4'>
        <div className='row'>
            <aside className='col-md-3'>
                <TeacherSidebar/>
            </aside>
            <section className='col-md-9'>
                <div className='card'>
                    <h5 className='card-header'>All Questions ({totalResult})  </h5>
                    <div className='card-body'>
                    <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Question</th>
                       
                        <th>Action</th>
                    </tr>
                </thead>
                
                <tbody>
                    {questionData.map((row,index)=>
                    <tr>
                    <td><Link to ={'/edit-question/'+row.id}>{row.questions}</Link></td>
                   
                    <td><Link to ={'/edit-question/'+row.id} className="btn btn-sm text-white btn-info"><i class="bi bi-activity"></i></Link></td>
                    <td>
                        <button  onClick={()=>handleDeleteClick(row.id)} className="btn btn-danger btn-sm " ><i class="bi bi-trash2"></i></button>
                     
                    </td>
                    </tr>
                    )}
                </tbody>
            </table>
                    </div>
                </div> 
            </section>
        </div>

    </div>
  )
}
  export default QuizQuestion;