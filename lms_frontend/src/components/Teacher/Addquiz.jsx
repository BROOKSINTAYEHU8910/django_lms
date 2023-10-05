import { Link } from 'react-router-dom';
import TeacherSideBar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';


const baseUrl='http://127.0.0.1:8000/api';
function Addquiz(){
   

  const [quizData, setquizData]=useState({
    title:'',
    detail:'',
   
  });
  
  
    const handleChange=(event)=>{
        setquizData({
            ...quizData,
            [event.target.name]:event.target.value
        });
    }

     const formSubmit=()=>{
        const teacherId=localStorage.getItem('teacherId')
        const _formData=new FormData();
       
        _formData.append('teacher',teacherId);
        _formData.append('title', quizData.title);
        _formData.append('detail', quizData.detail);
  
        try{
            axios.post(baseUrl +'/quiz/', _formData)
            .then((res)=>{
                // console.log(res.status)
                window.location.href='add-quiz/';
                // console.log("yes")

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
                <h5 className='card-header'> Add Quiz</h5>
                <div className='card-body'>
                    <form>
                    
                        {/* <div className='mb-3'>
                        <label for="staticEmail" className="col-sm-2 col-form-label">Category</label>
                        <select name='category' onChange={handleChange}  class="form-control">
                            {cats.map((category,index)=>{return <option key={index} value={category.id}>{category.title}</option>})}
                        </select>
                        </div> */}
                        
                        
                        <div className='mb-3'>
                        <label for="staticEmail" className="col-sm-2 col-form-label">Title</label>
                        <input type="text" name='title' onChange={handleChange}  className='form-control ' />
                    
                    </div>
                    
                
              
                    <div className='mb-3'>
                        <label for="staticEmail" className="col-sm-2 col-form-label">Detail</label>
                        <textarea onChange={handleChange} name='detail' className='form-control' id="description" ></textarea>
                       
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
export default Addquiz;