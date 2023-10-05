import { Link } from 'react-router-dom';
import TeacherSideBar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';


const baseUrl='http://127.0.0.1:8000/api/';
function EditChapter(){
   

const [chapterData, setChapterData]=useState({
    course:'',
    title:'',
    description:'',
    video:'',
    remarks:''
  });
  

  
  
const handleChange=(event)=>{
        setChapterData({
            ...chapterData,
            [event.target.name]:event.target.value
        });
    }

const handleFileChange=(event)=>{
        setChapterData({
            ...chapterData,
            [event.target.name]:event.target.files[0]
        });
    }

    const {chapter_id}=useParams();
const formSubmit=()=>{
 const _formData=new FormData();
 _formData.append('course', chapterData.course);
 _formData.append('title', chapterData.title);
 _formData.append('description', chapterData.description);
  if(chapterData.video!=''){ 
    _formData.append('video', chapterData.video,chapterData.video.name);

  }
        _formData.append('remarks', chapterData.remarks);

        try{
            axios.put(baseUrl+'chapter/'+chapter_id, _formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
              
              //console.log(res.data);
              if(res.status==200){
                Swal.fire({
                    title: 'Data has been Updated',
                    icon: 'success',
                    toast: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false


                });
              }
            });
        }catch(error){
            console.log(error);
        }

        

    };
 
    useEffect(()=>{
        try{
            axios.get(baseUrl+'chapter/'+chapter_id)
            .then((res)=>{
                setChapterData({
                    course:res.data.course,
                    title:res.data.title,
                    description:res.data.description,
                    prev_video:res.data.video,
                    remarks:res.data.remarks,
                    video:'' 

    
                })
 
              
            });
          }catch(error){
            console.log(error);
          }
        },[]);
  
  
    return (
        <div className="container mt-4" >
            <div className="row">
                <aside className="col-md-3">
            <TeacherSideBar/>
                </aside>
                <div className="col-9">
                <div class="card">
                    <h5 className='card-header'> Edit Course</h5>
                    <div className='card-body'>
                        <form>
                            <div className='mb-3'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">Title</label>
                            <input type="text" value={chapterData.title} name='title' onChange={handleChange}  className='form-control ' />
                        
                        </div>
                        
                    
                  
                        <div className='mb-3'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">Description</label>
                            <textarea onChange={handleChange} value={chapterData.description} name='description' className='form-control' id="description" ></textarea>
                           
                        </div>
                    
 
                            <div className='mb-3'>
                            <label for="video" className="form-label">video</label>
    
                            <input type="file" onChange={handleFileChange}  className='form-control ' name='video' id='video' />
                            {chapterData.prev_video && 
                             <video controls width="50%" className='mt-2'>
                                
                                <source src={chapterData.prev_video} type="video/mb4" /> 
                            </video> } 
                                

                                </div>
                            
                                <div className='col-sm-10'>
                                <label for="staticEmail" className="col-sm-2 col-form-label">Remarks</label>
                                <textarea onChange={handleChange} value={chapterData.remarks} name='remarks' id="remarks" ></textarea>
                                   
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
export default EditChapter;