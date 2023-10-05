import SideBar from './SideBar';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';



const baseUrl='http://127.0.0.1:8000/api';

const UserStudyMaterial = () =>{

    
    const [totalResult, settotalResult]=useState(0);
  const [studyData, setstudyData]=useState([]);
  const {course_id}=useParams();

  
  

  useEffect(()=>{
    try{
        axios.get(baseUrl+'/study-material/'+course_id)
        .then((res)=>{

            settotalResult(res.data.length);
            setstudyData(res.data);
            
  
          
          
        });
      }catch(error){
        console.log(error);
      }
    },[]);
const Swal = require('sweetalert2');

const downloadFile =(file_url)=>{
    window.location.href=file_url;
}

const handleDeleteClick =(study_id)=>{

    Swal.fire({
        title: 'confirm',
        text: 'Are Sure you want to delete this course?',
        icon: 'info',
        confirmButtonText:'continue',
        showCancelButton:true
    }).then((result)=>{
        if(result.isConfirmed){
            try{
                axios.delete(baseUrl+'/study-material/'+study_id)
                .then((res)=>{
                    Swal.fire('success', 'Data has been deleted.');

                    try{
                        axios.get(baseUrl+'/study-material/'+course_id)
                        .then((res)=>{
                
                            settotalResult(res.data.length);
                            setstudyData(res.data);
                            
                  
                          
                          
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
                <SideBar/>
            </aside>
            <section className='col-md-9'>
                <div className='card'>
                    <h5 className='card-header'>All Study Material ({totalResult}) </h5>
                    <div className='card-body'>
                    <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Detail</th>
                        <th>File</th>
                        <th>Remarks</th>
                       
                    </tr>
                </thead>
                
                <tbody>
                    {studyData.map((row,index)=>
                    <tr>
                    <td>{row.title}</td>
                    <td>{row.description}</td>
                    <td> 

                    <button className='btn btn-outline-primary' onClick={()=>downloadFile(row.upload)}>download File</button>
                
                    </td>
                    <td> {row.remarks}</td>

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
  export default UserStudyMaterial