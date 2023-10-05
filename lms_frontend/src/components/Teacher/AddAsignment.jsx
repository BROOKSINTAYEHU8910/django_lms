import { Link } from 'react-router-dom';
import TeacherSideBar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';


const baseUrl='http://127.0.0.1:8000/api';
function AddAssignment(){


  

const [AssignmentData, setAssignmentData]=useState({
   // course_id:'',
    title:'',
    detail:'',
   
  });

  
  
  
const handleChange=(event)=>{
    setAssignmentData({
            ...AssignmentData,
            [event.target.name]:event.target.value
        });
    }

/*const handleFileChange=(event)=>{
    window.URL =window.URL || window.webkitURL;
    var video =document.createElement('video');
    video.preload='metadata';
    video.onloadedmetadata = function(){
        window.URL.revokeObjectURL(video.src);
        setvideoDuration(video.duration);
    }
    video.src =URL.createObjectURL(event.target.files[0]);
        setChapterData({
            ...chapterData,
            [event.target.name]:event.target.files[0]
        });
    }*/

    const {student_id}=useParams();
    const {teacher_id}=useParams();
    const formSubmit=()=>{
        const _formData=new FormData();
            _formData.append('teacher', teacher_id);
            _formData.append('title', AssignmentData.title);
            _formData.append('detail', AssignmentData.detail);
            _formData.append('student', student_id);

                try{
                    axios.post(baseUrl+'/student-assignment/'+teacher_id+'/'+student_id, _formData,{
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    })
                    .then((res)=>{
                        if(res.status==200||res.status==201){
                            Swal.fire({
                                title: 'Assignment has been added',
                                icon: 'success',
                                toast: true,
                                timer:8000,
                                position: 'top right',
                                timerProgressBar:true,
                                showConfirmButton: false
                                 
                            });
                       const _notifData=new FormData();
                         _notifData.append('teacher',teacher_id);
                         _notifData.append('notif_subject','assignment');
                         _notifData.append('notif_for','student_id');
                         _notifData.append('student',student_id);
           
                    axios.post(baseUrl+'/save-notification/',_notifData,{
                        headers:{
                            'content-type':'multipart/form-data'
                        }
                    }).then((res)=>{
                        console.log('Notification Added')
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
                    <h5 className='card-header'> Add Assignment</h5>
                    <div className='card-body'>
                        <form>
                            <div className='mb-3'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">Title</label>
                            <input type="text" name='title' onChange={handleChange}  className='form-control ' />
                        
                        </div>
                        
                    
                  
                        <div className='mb-3'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">detail</label>
                            <textarea onChange={handleChange} name='detail' className='form-control' id="detail" ></textarea>
                           
                        </div>
                    
                            <button type='button' onClick={formSubmit} className='btn btn-primary'><i class="bi bi-clipboard2-plus-fill"></i></button>
                            </form>
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>

                            
                        
    )

}
export default AddAssignment;