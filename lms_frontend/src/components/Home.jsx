import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

const Home = () => {
  const [courseData, setCourseData] = useState([]);
  const [popularcourseData, setpopularcourseData] = useState([]);
  const [popularteacherData, setpopularteacherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await axios.get(baseUrl + "/add-course/?result=4");
        setCourseData(courseResponse.data);

        const popularCourseResponse = await axios.get(baseUrl + "/popular-course/?popular=1");
        setpopularcourseData(popularCourseResponse.data);

        const popularTeacherResponse = await axios.get(baseUrl + "/popular-teacher/?popular=1");
        setpopularteacherData(popularTeacherResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      {/* Latest courses */}
      <h3 className="pb-1 mb-4">
        Latest Courses <Link to="/all-course" className="float-end">see All</Link>
      </h3>
      <div className="row mb-4">
        {courseData && courseData.map((course, index) => (
          <div className="col-md-3 mb-4" key={course.id}>
            <div className="card">
              <Link to={`/detail/${course.id}`}>
                <img src={course.featured_img} className="card-img-top" alt={course.title} />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/detail/${course.id}`}>{course.title}</Link>
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popular courses */}
      <h3 className="pb-1 mb-4">
        Popular Courses <Link to="/popular-teacher" className="float-end">see All</Link>
      </h3>
      <div className="row mb-4">
        {popularcourseData && popularcourseData.map((row, index) => (
          <div className="col-md-3 mb-4" key={row.course.id}>
            <div className="card">
              <Link to={`/detail/${row.course.id}`}>
                <img src={row.featured_img} className="card-img-top" alt={row.title} />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/detail/${row.course.id}`}>{row.course.title}</Link>
                </h5>
              </div>
              <div className="card-body">
                <div className="title">
                  <span>Rating: {row.rating}/5</span>
                  <span className="float-end">View: {row.course.course_view}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popular Teachers */}
      <h3 className="pb-1 mb-4">
        Popular Teacher <Link to="/popular-teacher" className="float-end">see All</Link>
      </h3>
      <div className="row mb-4">
        {popularteacherData && popularteacherData.map((teacher, index) => (
          <div className="col-md-3 mb-4" key={teacher.id}>
            <div className="card">
              <Link to={`/teacher-detail/${teacher.id}`}>
                {teacher.course && teacher.course.teacher && teacher.course.teacher.profile_img &&
                <img src={teacher.course.teacher.profile_img} className="card-img-top" alt={teacher.course.teacher.name} />

                }
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/teacher-detail/${teacher.id}`}>{teacher.full_name}</Link>
                </h5>
              </div>
              <div className="card-footer">
                <div className="title">
                  <span className="float-end">Rating: </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Student Testimonial */}
      <h3 className="pb-1 mb-4 mt-5">Student Testimonial</h3>
      <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
          <div className="carousel-item">
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>A -known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
          <div className="carousel-item">
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>A known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
