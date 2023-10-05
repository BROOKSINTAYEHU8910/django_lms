import { Link, useParams } from 'react-router-dom';
import TeacherSideBar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';
function EditQuiz() {
    const teacherId = localStorage.getItem('teacherId');

  

    const [quizData, setquizData] = useState({
        title: '',
        detail: '',
    });


    const { quiz_id } = useParams();

    useEffect(() => {

        try {
            axios.get(baseUrl + '/teacher-quiz-detail/'+quiz_id)
                .then((res) => {
                    // console.log(res.data.title)

                    setquizData ({
                       
                        title: res.data.title,
                        detail: res.data.detail,
                        
                        
                    })
                    console.log(quizData)
                    
                    
                });
        } catch (error) {
            console.log(error);
        }
        console.log(quiz_id)
    }, []);

    const handleChange = (event) => {
        setquizData({
            ...quizData,
            [event.target.name]: event.target.value
        });
    }

    // const handleFileChange = (event) => {
    //     setCourseData({
    //         ...courseData,
    //         [event.target.name]: event.target.files[0]
    //     });
    // }
    const formSubmit = () => {
        const _formData = new FormData();
        _formData.append('teacher', teacherId);
        _formData.append('title', quizData.title);
        _formData.append('detail', quizData.detail);
      

        try {
            axios.put(baseUrl + '/teacher-quiz-detail/'+quiz_id, _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    if(res.status==200){
                        Swal.fire({
                            title:'Quiz has been Updated',
                            icon:'success',
                            toast:true,
                            timer:3000,
                            position:'top-right',
                            timerProgressBar:true,
                            showConfirmButton:false
                        })
                    }

                });
        } catch (error) {
            console.log(error);
        }


    };


    return (
        <div className="container mt-4" >
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSideBar />
                </aside>
                <div className="col-9">
                    <div class="card">
                        <h5 className='card-header'> Edit Quiz</h5>
                        <div className='card-body'>
                            <form>

                                <div className='mb-3'>
                                    <label for="staticEmail" className="col-sm-2 col-form-label">Title</label>
                                    <input type="text" value={quizData.title} name='title' onChange={handleChange} className='form-control ' />

                                </div>



                                <div className='mb-3'>
                                    <label for="staticEmail" className="col-sm-2 col-form-label">Detail</label>
                                    <textarea onChange={handleChange} value={quizData.detail} name='detail' className='form-control' id="detail" ></textarea>

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
export default EditQuiz;