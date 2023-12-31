import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import SideBar from './SideBar';
const baseUrl = 'http://127.0.0.1:8000/api';
function StudentAssignment() {

    const studentId = localStorage.getItem('studentId')
    const [assignmentStatus, setassignmentStatus] = useState({});

    const [assignmentData, setassignmentData] = useState([]);


    useEffect(() => {

        try {
            axios.get(baseUrl + '/my-assignments/' + studentId)
                .then((res) => {
                    setassignmentData(res.data);
                    setassignmentStatus(res.data )


                });
        } catch (error) {
            console.log("res")
            console.log(error);
        }

    }, []);


    const MarkAsDone = (assignment_id, title, detail, student, teacher) => {


        const _formData = new FormData();

        _formData.append('student_status', true);
        _formData.append('title', title);
        _formData.append('student', student);
        _formData.append('teacher', teacher);
        _formData.append('detail', detail);






        try {
            axios.put(baseUrl + '/update-assignment/' + assignment_id, _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        Swal.fire({
                            title: 'You have sucessfully completed  this assignment',
                            icon: 'success',
                            toast: true,
                            timer: 1000,
                            position: 'top right',
                            timerProgressBar: true,
                            showConfirmButton: false

                        })
                  
                    }

                });
        } catch (error) {

            console.log(error);
        }
        window.location.reload();

    }

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <SideBar />
                </aside>
                <section className='col-md-9'></section>
                <div className='card-body'></div>
                <h5 className="card-header">My Assignments</h5>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Detail</th>
                                <th>Created By</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {assignmentData.map((row, index) =>
                                <tr key={row.id}>

                                    <td>{row.title}</td>
                                    <td>{row.detail}</td>
                                    <td>{row.teacher.full_name}</td>
                                    <td>

                    
                                        {row.student_status ? <span className='badge bg-primary'>Completed</span> : <button onClick={() => MarkAsDone(row.id, row.title, row.detail, row.student.id, row.teacher.id)} className="btn btn-success bt-sm" type='button'>Mark as Done </button> }



                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default StudentAssignment;