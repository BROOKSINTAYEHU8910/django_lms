import { Link } from 'react-router-dom';
import TeacherSideBar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';


const baseUrl='http://127.0.0.1:8000/api';
function AddStudyMaterial(){
   

const [studyData, setstudyData]=useState({
    course_id:'',
    title:'',
    description:'',
    upload:'',
    remarks:''
  });

  
  

  
  
const handleChange=(event)=>{
        setstudyData({
            ...studyData,
            [event.target.name]:event.target.value
        });
    }

const handleFileChange=(event)=>{
    window.URL =window.URL || window.webkitURL;
    var upload =document.createElement('upload');
    upload.src =URL.createObjectURL(event.target.files[0]);
    setstudyData({
            ...studyData,
            [event.target.name]:event.target.files[0]
        });
    }

    const {course_id}=useParams();
        const formSubmit=()=>{
        const _formData=new FormData();
        _formData.append('course', course_id);
        _formData.append('title', studyData.title);
        _formData.append('description', studyData.description);
        _formData.append('upload', studyData.upload,studyData.upload.name);
        _formData.append('remarks', studyData.remarks);

                try{
                    axios.post(baseUrl+'/study-material/'+course_id, _formData,{
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
                    <h5 className='card-header'> Add Study Material</h5>
                    <div className='card-body'>
                        <form>

                        <div className='mb-3'>
                            <label for="staticEmail" className="col-sm-2 col-form-label">Category</label>
                            <input type="text" name='course' onChange={handleChange}  className='form-control ' />
                        
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
                            <label for="upload" className="form-label">File</label>
    
                            <input type="file" onChange={handleFileChange}  className='form-control ' name='upload' id='upload' />
                                </div>
                            </div>
                                <div className='col-sm-10'>
                                <label for="staticEmail" className="col-sm-2 col-form-label">Remarks</label>
                                <textarea onChange={handleChange} name='remarks' id="remarks" ></textarea>
                                   
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
export default AddStudyMaterial;