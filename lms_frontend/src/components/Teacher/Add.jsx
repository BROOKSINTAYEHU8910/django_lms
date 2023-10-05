import { Link } from 'react-router-dom';
import TeacherSideBar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';


const baseUrl='http://127.0.0.1:8000/api';
function Add(){
    const teacherId=localStorage.getItem('teacherId');

  const [cats, setCats]=useState([]);

  const [courseData, setCourseData]=useState({
    category:'1',
    title:'',
    description:'',
    f_img:'',
    techs:''
  });
  

  useEffect(()=>{
    try{
        axios.get(baseUrl+'/category').then((res)=>{
          
            setCats(res.data);
  
          
          
        });
      }catch(error){
        console.log(error);
      }
    },[]);
  
    const handleChange=(event)=>{
        setCourseData({
            ...courseData,
            [event.target.name]:event.target.value
        });
    }

    const handleFileChange=(event)=>{
        setCourseData({
            ...courseData,
            [event.target.name]:event.target.files[0]
        });
    }
     const formSubmit=()=>{
        
        const _formData=new FormData();
        _formData.append('category', courseData.category);
        _formData.append('teacher',teacherId);
        _formData.append('title', courseData.title);
        _formData.append('description', courseData.description);
        _formData.append('featured_img', courseData.f_img,courseData.f_img.name);
        _formData.append('techs', courseData.techs);

        try{
            axios.post(baseUrl +'/add-course', _formData)
            .then((res)=>{
                console.log(res.status)
                window.location.href='add-course/';
                console.log("yes")

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
                <h5 className='card-header'> Add Course</h5>
                <div className='card-body'>
                    <form>
                    
                        <div className='mb-3'>
                        <label for="staticEmail" className="col-sm-2 col-form-label">Category</label>
                        <select name='category' onChange={handleChange}  class="form-control">
                            {cats.map((category,index)=>{return <option key={index} value={category.id}>{category.title}</option>})}
                        </select>
                        </div>
                        
                        
                        <div className='mb-3'>
                        <label for="staticEmail" className="col-sm-2 col-form-label">Title</label>
                        <input type="text" name='title' onChange={handleChange}  className='form-control ' />
                    
                    </div>
                    
                
              
                    <div className='mb-3'>
                        <label for="staticEmail" className="col-sm-2 col-form-label">Description</label>
                        <textarea onChange={handleChange} name='description' className='form-control' id="description" ></textarea>
                       
                    </div>
                
                
                
                    <div className='mb-3'>
                       
                        <div className='mb-3'>
                        <label for="video" className="form-label">Featured Image</label>

                        <input type="file" onChange={handleFileChange}  className='form-control ' name='f_img' id='video' />
                            </div>
                        </div>
                    
                    
                           
                            <div className='col-sm-10'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">Technologies</label>
                            <textarea onChange={handleChange} name='techs' id="techs" ></textarea>
                               
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
export default Add;