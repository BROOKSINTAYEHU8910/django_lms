import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";
const AllCourse = () => {
  const [courseData, setCourseData] = useState([]);
  const { course_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + "/add-course/").then((res) => {
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="pb-1 mb-4">Latest Courses</h3>
      <div className="row mb-4">
        {courseData &&
          courseData.map((course, index) => (
            <div className="col-md-3 mb-4">
              <div className="card">
                <Link to={"/detail/${course.id}"}>
                  <img
                    src={course.featured_img}
                    className="card-img-top"
                    alt={course.title}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/teacher-detail/${course.id}`}>
                      {course.title}
                    </Link>{" "}
                  </h5>
                </div>
              </div>
            </div>
          ))}
      </div>

      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link">Previous</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default AllCourse;
