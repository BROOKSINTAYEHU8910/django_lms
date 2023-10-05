import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


const baseUrl='http://127.0.0.1:8000/api';
function CheckQuizStatus(props){

const studentId=localStorage.getItem('studentId')

const [quizData,setquizData]=useState([]);


useEffect(()=>{

    try{
        axios.get(`${baseUrl}/fetch-quiz-attempt-status/${props.quiz}/${props.student}`)
        .then((res)=>{
            setquizData(res.data);
            
            
            
        });
    }catch(error){
         // console.log("res")
        console.log(error);
      }
      document.title='Quiz List';
    },[]);


  /*  const AssignQuiz = (quiz_id) => {


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
                        window.location.reload();


                        //   setassignStatus('success');

                    }


                });
        } catch (error) {

            console.log(error);
        }



    }*/



    return (
        <td>
            {quizData.bool == true &&

<span className="text-success">Attempted</span>


            }
            {quizData.bool == false &&

<Link to={`/take-quiz/${props.quiz}`} className='btn btn-success btn-sm ms-2'>Take Quiz</Link>

               


            }
        </td>
    )
}
export default CheckQuizStatus;