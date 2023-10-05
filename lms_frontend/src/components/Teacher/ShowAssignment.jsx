import TeacherSidebar from './TeacherSidebar';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';



const baseUrl='http://127.0.0.1:8000/api';

const ShowAssignment = () =>{

    
    const [totalResult, settotalResult]=useState(0);
  const [assignmentData, setAssignmentData]=useState([]);

  const {teacher_id}=useParams();
  const {student_id}=useParams();

  
  

  useEffect(()=>{
    try{
        axios.get(baseUrl+'/student-assignment/'+teacher_id+'/'+student_id)
        .then((res)=>{

            settotalResult(res.data.length);
            setAssignmentData(res.data);
            
  
          
          
        });
      }catch(error){
        console.log(error);
      }
    },[]);
const Swal = require('sweetalert2');



  return(
    <div className='container mt-4'>
        <div className='row'>
            <aside className='col-md-3'>
                <TeacherSidebar/>
            </aside>
            <section className='col-md-9'>
                <div className='card'>
                    <h5 className='card-header'>All Assignment ({totalResult})</h5>
                    <div className='card-body'>
                    <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>student Status</th>
                        </tr>
                       
                </thead>
                
                <tbody>
                    {assignmentData.map((row,index)=>
                    <tr>
                    <td>{row.title}</td>
                    <td>{row.student_status==false && 
                     <span className='badge bg-warning'>Incomplete</span>
                    }
                    {row.student_status==true && 
                     <span className='badge bg-success'>completed</span>
                    }
                    
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
  export default ShowAssignment;