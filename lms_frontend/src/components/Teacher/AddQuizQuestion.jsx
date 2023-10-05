import { Link } from 'react-router-dom';
import TeacherSideBar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';


const baseUrl='http://127.0.0.1:8000/api/';
function AddQuizQuestion(){
   

const [questionData, setquestionData]=useState({
    quiz:'',
    questions:'',
    ans1:'',
    ans2:'',
    ans3:'',
    ans4:'',
    right_ans:'',
  });
  
const handleChange=(event)=>{
    setquestionData({
            ...questionData,
            [event.target.name]:event.target.value
        });
    }


    const {quiz_id}=useParams();
        const formSubmit=()=>{
        const _formData=new FormData();
        _formData.append('quiz', quiz_id);
        _formData.append('questions', questionData.questions);
        _formData.append('ans1', questionData.ans1);
        _formData.append('ans2', questionData.ans2);
        _formData.append('ans3', questionData.ans3);
        _formData.append('ans4', questionData.ans4);
        _formData.append('right_ans', questionData.right_ans);

                try{
                    axios.post(baseUrl+'quiz-questions/'+quiz_id, _formData,{
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    })
                    .then((res)=>{
                        if(res.status==200||res.status==201){
                            Swal.fire({
                                title: 'Data has been added',
                                icon: 'success',
                                toast: true,
                                timer:3000,
                                position: 'top right',
                                timerProgressBar:true,
                                showConfirmButton: false
                                 
                            })
                            window.location.reload();
                        }
                    });
                }catch(error){
                    console.log(error);
                }
                

    };
 
  
  
    return (
        <div className="container mt-4" >
            <div className="row">
                <aside className="col-md-3">
            <TeacherSideBar/>
                </aside>
                <div className="col-9">
                <div class="card">
                    <h5 className='card-header'> Add Question</h5>
                    <div className='card-body'>
                        <form>
                            <div className='mb-3'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">Question</label>
                            <input type="text" name='questions' onChange={handleChange}  className='form-control ' id='questions' />
                        
                        </div>
                        <div className='mb-3'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">Ans 1</label>
                            <input type="text" name='ans1' onChange={handleChange}  className='form-control ' id='ans1'/>
                        
                        </div>
                        <div className='mb-3'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">Ans 2</label>
                            <input type="text" name='ans2' onChange={handleChange}  className='form-control ' id='ans2'/>
                        
                        </div>
                        <div className='mb-3'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">Ans 3</label>
                            <input type="text" name='ans3' onChange={handleChange}  className='form-control 'id='ans3' />
                        
                        </div>
                        <div className='mb-3'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">Ans 4</label>
                            <input type="text" name='ans4' onChange={handleChange}  className='form-control 'id='ans4' />
                        
                        </div>
                        <div className='mb-3'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">Right Answer</label>
                            <input type="text" name='right_ans' onChange={handleChange}  className='form-control 'id='right_ans' />
                        
                        </div>
                        
                    
                  
            
                             
                            <button type='button' onClick={formSubmit} className='btn btn-primary'>Submit</button>
                            </form>
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>

                            
                        
    )

}
export default AddQuizQuestion;