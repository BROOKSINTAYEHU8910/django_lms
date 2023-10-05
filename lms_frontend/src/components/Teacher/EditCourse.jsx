import { Link, useParams } from 'react-router-dom';
import TeacherSideBar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';
function EditCourse() {
    const teacherId = localStorage.getItem('teacherId');

    const [cats, setCats] = useState([]);

    const [courseData, setCourseData] = useState({
        category: '',
        title: '',
        description: '',
        f_img: '',
        techs: ''
    });


    const { course_id } = useParams();

    useEffect(() => {
        try {
            axios.get(baseUrl + '/category').then((res) => {

                setCats(res.data);

            });
        } catch (error) {
            console.log(error);
        }

        try {
            axios.get(baseUrl + '/teacher-course-detail/'+course_id)
                .then((res) => {
                    // console.log(res.data.title)

                    setCourseData({
                        category: res.data.category,
                        title: res.data.title,
                        description: res.data.description,
                        f_img: res.data.featured_img,
                        techs: res.data.techs,
                        
                        
                    })
                    console.log(courseData)
                    
                    
                });
        } catch (error) {
            console.log(error);
        }
        console.log(course_id)
    }, []);

    const handleChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.value
        });
    }

    const handleFileChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.files[0]
        });
    }
    const formSubmit = () => {
        const _formData = new FormData();
        _formData.append('category', courseData.category);
        _formData.append('teacher', teacherId);
        _formData.append('title', courseData.title);
        _formData.append('description', courseData.description);
        _formData.append('featured_img', courseData.f_img);
        _formData.append('techs', courseData.techs);

        try {
            axios.put(baseUrl + '/teacher-course-detail/'+course_id, _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    if(res.status==200){
                        Swal.fire({
                            title:'Data has been Updated',
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
                        <h5 className='card-header'> Edit Course</h5>
                        <div className='card-body'>
                            <form>

                                <div className='mb-3'>
                                    <label for="staticEmail" className="col-sm-2 col-form-label">Category</label>
                                    <select name='category' value={courseData.category} onChange={handleChange} class="form-control">
                                        {cats.map((category, index) => { return <option key={index} value={category.id}>{category.title}</option> })}
                                    </select>
                                </div>


                                <div className='mb-3'>
                                    <label for="staticEmail" className="col-sm-2 col-form-label">Title</label>
                                    <input type="text" value={courseData.title} name='title' onChange={handleChange} className='form-control ' />

                                </div>



                                <div className='mb-3'>
                                    <label for="staticEmail" className="col-sm-2 col-form-label">Description</label>
                                    <textarea onChange={handleChange} value={courseData.description} name='description' className='form-control' id="description" ></textarea>

                                </div>



                                <div className='mb-3'>

                                    <div className='mb-3'>
                                        <label for="video" className="form-label">Featured Image</label>

                                        <input type="file" onChange={handleFileChange} className='form-control ' name='f_img' id='video' />
                                    </div>
                                </div>



                                <div className='col-sm-10'>
                                    <label for="staticEmail" className="col-sm-2 col-form-label">Technologies</label>
                                    <textarea onChange={handleChange} name='techs' value={courseData.techs} id="techs" ></textarea>

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
export default EditCourse;