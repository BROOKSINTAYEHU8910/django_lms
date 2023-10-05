import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";
function TeacherCourse() {
  const [courseData, setCourseData] = useState([]);

  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    console.log(teacherId);
    try {
      axios.get(baseUrl + "/teacher-course/" + teacherId).then((res) => {
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-4">
      <div className="card">
        <Link to="/my-course">
          <h5 className="card-header">My courses</h5>
        </Link>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Total Enrolled</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {courseData.map((course, index) => (
                <tr>
                  <td>
                    <Link to={`/all-chapters/${course.id}`}>
                      {course.title}
                    </Link>
                    <hr />
                    {course.course_rating && (
                      <span> Rating: {course.course_rating}/5</span>
                    )}
                    {!course.course_rating && <span> Rating: 0/5</span>}
                  </td>
                  <td>
                    <img
                      src={course.featured_img}
                      width="80"
                      className="rounded"
                      alt={course.title}
                    />
                  </td>

                  <td>
                    <Link to={`/enrolled-students/${course.id}`}>
                      {" "}
                      {course.total_enrolled_students}
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="btn btn-info btn-sm ms-2"
                      to={`/edit-course/${course.id}`}
                    >
                      <i class="bi bi-pen"></i>
                    </Link>
                    <Link
                      className="btn btn-primary  btn-sm ms-2 "
                      to={`/study-material/${course.id}`}
                    >
                      <i class="bi bi-book"></i>
                    </Link>
                    <Link
                      className="btn btn-success  btn-sm ms-2 "
                      to={`/add-chapter/${course.id}`}
                    >
                      <i class="bi bi-folder-plus"></i>
                    </Link>
                    <Link
                      className="btn btn-warning btn-sm ms-2  "
                      to={`/assign-quiz/${course.id}`}
                    >
                      <i class="bi bi-activity"></i>
                    </Link>
                    <button className="btn btn-danger  btn-sm ms-2 ">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default TeacherCourse;
