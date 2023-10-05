import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/";

const CourseDetail = () => {
  const [teacherData, setteacherData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [techListData, settechListData] = useState([]);
  const [userLoginStatus, setuserLoginStatus] = useState([]);
  const [enrollStatus, setenrollStatus] = useState("");
  const [ratingStatus, setratingStatus] = useState();
  const [AvgRating, setAvgRating] = useState(0);
  const [favoriteStatus, setfavoriteStatus] = useState();

  const [CourseView, setCourseView] = useState(0);

  const [chapterData, setChapterData] = useState([]);

  let { course_id } = useParams();

  const studentId = localStorage.getItem("studentId");
  useEffect(() => {
    try {
      axios.get(baseUrl + "add-course/" + course_id).then((res) => {
        setCourseData(res.data);
        setChapterData(res.data.course_chapters);
        setteacherData(res.data.teacher);
        settechListData(res.data.tech_list);
        if (res.data.course_rating != "" && res.data.course_rating != null) {
          setAvgRating(res.data.course_rating);
        }

        axios.get(baseUrl + "/update-view" + course_id).then((res) => {
          setCourseView(res.data.views);
        });
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios
        .get(baseUrl + "fetch-favorite-status/" + studentId + "/" + course_id)
        .then((res) => {
          if (res.data.bool == true) {
            setfavoriteStatus("success");
          } else {
            setfavoriteStatus("");
          }
        });
    } catch (error) {
      console.log(error);
    }

    try {
      axios
        .get(baseUrl + "fetch-enroll-status/" + studentId + "/" + course_id)
        .then((res) => {
          console.log(res);
          if (res.data.bool == true) {
            setenrollStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }

    try {
      axios
        .get(baseUrl + "fetch-rating-status/" + studentId + "/" + course_id)
        .then((res) => {
          console.log(res);
          if (res.data.bool == true) {
            setratingStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }

    const studentLoginStatus = localStorage.getItem("studentLoginStatus");

    if (studentLoginStatus === "true") {
      setuserLoginStatus("success");
    }
  }, []);

  const markFavorite = () => {
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("student", studentId);
    _formData.append("status", true);
    console.log(_formData.data);
    try {
      axios
        .post(
          baseUrl +
            "student-add-favorite-course/" +
            course_id +
            "/" +
            studentId,
          _formData,
          {
            headers: {
              "context-type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            Swal.fire({
              title: "This course has been added in your wish list",
              icon: "success",
              toast: true,
              timer: 4000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = (pk) => {
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("student", studentId);
    _formData.append("status", true);

    try {
      axios
        .get(
          baseUrl + "student-remove-favorite/",
          +course_id + "/" + studentId,
          {
            headers: {
              "context-type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            Swal.fire({
              title: "This course has been removed in your wish list",
              icon: "success",
              toast: true,
              timer: 4000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setfavoriteStatus("");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const enrollCourse = () => {
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("student", studentId);

    try {
      axios
        .post(baseUrl + "student-enroll-course/", _formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Swal.fire({
              title: "You have sucessfully enrolled in this course",
              icon: "success",
              toast: true,
              timer: 1000,
              position: "top right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setenrollStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [ratingData, setratingData] = useState({
    rating: "",
    review: "",
  });

  const handleChange = (event) => {
    setratingData({
      ...ratingData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = () => {
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("student", studentId);
    _formData.append("rating", ratingData.rating);
    _formData.append("review", ratingData.review);

    try {
      axios.post(baseUrl + "course-rating/", _formData, {}).then((res) => {
        if (res.status == 200 || res.status == 201) {
          Swal.fire({
            title: "You have been rated this course",
            icon: "success",
            toast: true,
            timer: 7000,
            position: "top right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container" mt-3>
      <div className="row">
        <div className="col-4">
          <img
            src={courseData.featured_img}
            className="img-thumbnail"
            alt={courseData.title}
          />
        </div>
        <div className="col-8">
          <h2>{courseData.title}</h2>
          <h3>{courseData.description}</h3>
          <p className="fw-bold">
            Instructor:{" "}
            <Link to={"/teacher-detail/" + teacherData.id}>
              {teacherData.full_name}
            </Link>
          </p>
          <p className="fw-bold">
            Technologies:&nbsp;
            {techListData.map(
              (tech, index) => (
                <Link className="badge bg-warning" to={"/category/" + tech}>
                  {tech}
                </Link>
              ) //'/category/${tech,trim()}'
            )}
          </p>
          <p className="fw-bold">Duration: 3 hrs</p>
          <p className="fw-bold">
            Total Enrolled: {courseData.total_enrolled_students} Student
          </p>
          <p className="fw-bold">
            <p className="fw-bold">View: {CourseView}</p>
            Rating:{AvgRating}/5
            {enrollStatus === "success" && userLoginStatus === "success" && (
              <>
                {ratingStatus !== "success" &&
                  userLoginStatus === "success" && (
                    <button
                      onClick={enrollCourse}
                      type="button"
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#ratingModal"
                    >
                      Rate
                    </button>
                  )}
                {ratingStatus === "success" &&
                  userLoginStatus === "success" && (
                    <small className="badge bg-info text-dark ">
                      You already rated this course
                    </small>
                  )}

                <div
                  class="modal fade"
                  id="ratingModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Rate For {courseData.title}
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">
                              Rating
                            </label>
                            <select
                              classname="form-control"
                              onChange={handleChange}
                              name="rating"
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div>
                          <div class="mb-3">
                            <label
                              for="exampleInputPassword1"
                              class="form-label"
                            >
                              Review
                            </label>
                            <textarea
                              name="review"
                              cols="25"
                              rows="5"
                            ></textarea>
                          </div>
                          <button
                            type="button"
                            onClick={formSubmit}
                            className="btn btn-primary"
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </p>
          {enrollStatus === "success" && userLoginStatus == "success" && (
            <p>
              <span>You have already enrolled in this course</span>
            </p>
          )}
          {userLoginStatus === "success" && enrollStatus !== "success" && (
            <p>
              <button
                onClick={enrollCourse}
                type="button"
                className="btn btn-success"
              >
                Enroll in this course
              </button>
            </p>
          )}
          {userLoginStatus === "success" && favoriteStatus !== "success" && (
            <p>
              <button
                onClick={markFavorite}
                type="button"
                title="Add in your favorite course list"
                className="btn btn-outline-danger "
              >
                <i class="bi bi-heart"></i>
              </button>
            </p>
          )}
          {userLoginStatus === "success" && favoriteStatus === "success" && (
            <p>
              <button
                onClick={removeFavorite}
                type="button"
                title="remove from your favorite course list"
                className="btn btn-outline-danger "
              >
                <i class="bi bi-heart"></i>
              </button>
            </p>
          )}
          {userLoginStatus !== "success" && (
            <p>
              <Link></Link>Please Login to Enroll in this Course
            </p>
          )}
        </div>
      </div>

      <div className="card mt-4">
        <h5 className="card-header">course Chapter</h5>
        <ul className="list-group list-group-flush">
          {chapterData.map((chapter, index) => (
            <li className="list-group-item">{courseData.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default CourseDetail;
