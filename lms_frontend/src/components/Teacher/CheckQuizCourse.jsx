import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useEffect, useState } from 'react';
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api';
const CheckQuizCourse=({ course, quiz })=> {

    const [quizData, setquizData] = useState([]);

    const teacherId = localStorage.getItem('teacherId');

    // const {course_id}=useParams();


    console.log("teacherId")

    useEffect(() => {
        try {
            axios.get(baseUrl + `/fetch-quiz-assign-status/${quiz}/${course}`)
                .then((res) => {
                    setquizData(res.data);
                    console.log(res.data);



                });
        } catch (error) {
            console.log(error);
        }


    }, []);

    const Swal = require('sweetalert2');

    const AssignQuiz = (quiz_id) => {


        const _formData = new FormData();
        _formData.append('teacher', teacherId);
        _formData.append('course', course);
        _formData.append('quiz', quiz);



        try {
            axios.post(baseUrl + '/quiz-assign-course/', _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        window.location.reload()


                        //   setassignStatus('success');

                    }


                });
        } catch (error) {

            console.log(error);
        }



    }



    return (
        <td>
            {quizData.bool == false &&

                <button onClick={() => AssignQuiz(quiz)} className='btn btn-success btn-sm ms-2'>Assign Quiz</button>


            }
            {quizData.bool == true &&

                <span className="text-success">Assigned</span>


            }
        </td>
    )
}
export default CheckQuizCourse;