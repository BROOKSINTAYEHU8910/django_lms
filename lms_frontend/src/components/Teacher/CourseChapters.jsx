import TeacherSidebar from './TeacherSidebar';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';



const baseUrl='http://127.0.0.1:8000/api';

const CourseChapters = () =>{

    
    const [totalResult, settotalResult]=useState(0);
  const [chapterData, setChapterData]=useState([]);
  const {course_id}=useParams();

  
  

  useEffect(()=>{
    try{
        axios.get(baseUrl+'/course-chapters/'+course_id)
        .then((res)=>{

            settotalResult(res.data.length);
            setChapterData(res.data);
            
  
          
          
        });
      }catch(error){
        console.log(error);
      }
    },[]);
const Swal = require('sweetalert2');

const handleDeleteClick =(chapter_id)=>{

    Swal.fire({
        title: 'confirm',
        text: 'Are Sure you want to delete this course?',
        icon: 'info',
        confirmButtonText:'continue',
        showCancelButton:true
    }).then((result)=>{
        if(result.isConfirmed){
            try{
                axios.delete(baseUrl+'/chapter/'+chapter_id)
                .then((res)=>{
                    Swal.fire('success', 'Data has been deleted.');

                    try{
                        axios.get(baseUrl+'/course-chapters/'+course_id)
                        .then((res)=>{
                
                            settotalResult(res.data.length);
                            setChapterData(res.data);
                            
                  
                          
                          
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
                    <h5 className='card-header'>All Chapters ({totalResult}) </h5>
                    <div className='card-body'>
                    <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>video</th>
                        <th>Remarks</th>
                        <th>Action</th>
                    </tr>
                </thead>
                
                <tbody>
                    {chapterData.map((chapter,index)=>
                    <tr>
                    <td><Link to ={'/edit-chapter/'+chapter.id}>{chapter.title}</Link></td>
                    <td> 
                        <video controls width="250">
                            <source src={chapter.video.url} type="video/webm"/>
                            <source src={chapter.video.url} type="video/mp4"/>
                            sorry,your browser desnt support embedded videos.

                        </video>
                    
                        
                    </td>
                    <td> {chapter.remarks}</td>
                    <td>
                        <button  onClick={()=>handleDeleteClick(chapter.id)} className="btn btn-danger btn-sm " ><i class="bi bi-trash2"></i></button>
                        <Link to ={'/edit-chapter/'+chapter.id} className='btn btn-info btn-sm'><i class="bi bi-pen"></i></Link>
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
  export default CourseChapters;