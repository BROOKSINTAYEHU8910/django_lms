import TeacherSidebar from './TeacherSidebar';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import ReactDOM from 'react-dom';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';
function AllChapter() {
  
        
            
        const [totalResult, settotalResult]=useState(0);
      const [chapterData, setChapterData]=useState([]);
      const [course_id]=useParams();
    
      
      
    
      useEffect(()=>{
        try{
            axios.get(baseUrl+'course-chapters/'+course_id)
            .then((res)=>{
    
                settotalResult(res.data.length);
                setChapterData(res.data);
                
      
              
              
            });
          }catch(error){
            console.log(error);
          }
        },[]);
    const Swal = require('sweetalert2');
    
    const handleDeleteClick =()=>{
    
        Swal.fire({
            title: 'confirm',
            text: 'Are Sure you want to delete This data?',
            icon: 'info',
            confirmButtonText:'continue',
            showcancelButton: true
        });
    
    
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
                            <td><Link to ={'edit-chapter/'+chapter.id}>{chapter.title}</Link></td>
                            <td> 
                              
                           {/* { ReactDOM.createPortal(<YouTube videoId='i7Xkvxrsn9c' />,document.body)} */}




                     
                            
                                
                            </td>
                            <td> {chapter.remarks}</td>
                            <td>
                                <Link to ={'delete-chapter/'+chapter.id} onClick={handleDeleteClick} className="btn btn-danger btn-sm " ><i class="bi bi-trash2"></i></Link>
                                <button to ={'edit-chapter/'+chapter.id} className='btn btn-info btn-sm'><i class="bi bi-pen"></i></button>
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
        
          
    );
}
}
export default AllChapter;