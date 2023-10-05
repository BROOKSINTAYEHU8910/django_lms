import Header from "./Header";
import Home from "./Home";
import Login from "./User/Login";
import Register from "./User/Register";
import TeacherDashbord from "./Teacher/TeacherDashbord";
import Dashboard from "./User/Dashboard";
import MyCourses from "./User/MyCourses";
import FavoriteCourse from "./User/FavoriteCourses";
import RecommendedCourses from "./User/RecommendedCourses";
import ChagePassword from "./User/ChangePassword";
import ProfileSetting from "./User/ProfileSetting";
import Add from "./Teacher/Add";
import TeacherProfileSetting from "./Teacher/TeacherProfileSetting";
import TeacherChangePassword from "./Teacher/TeacherChangePassword";
import TeacherLogin from "./Teacher/TeacherLogin";
import TeacherLogout from "./Teacher/TeacherLogout";
import TeacherCourse from "./Teacher/TeacherCourse";
import TeacherUser from "./Teacher/TeacherUser";
import TeacherRegister from "./Teacher/TeacherRegister";
import CourseDetail from "./CourseDetail";
import EditCourse from "./Teacher/EditCourse";
import AddChapter from "./Teacher/AddChapter";
import TeacherDetail from "./TeacherDetail";
import AllChapter from "./Teacher/CourseChapters";
import Footer from "./Footer";
import AllCourse from "./AllCourse";
import EditChapter from "./Teacher/EditChapter";
import CatagoryCourse from "./CatagoryCourse";
import PopularTeacher from "./PopularTeacher";
import TeacherSkillCourse from "./TeacherSkillCourse";
import StudentDashboard from "./User/StudentDashboard";
import StudentLogout from "./User/StudentLogout";
import EnrolledStudents from "./Teacher/EnrolledStudents";
import UserList from "./Teacher/UserList";
import AddAssignment from "./Teacher/AddAsignment";
import ShowAssignment from "./Teacher/ShowAssignment";
import StudentAssignment from "./User/StudentAssignment";

import Addquiz from "./Teacher/Addquiz";
import AllQuiz from "./Teacher/AllQuiz";
import EditQuiz from "./Teacher/EditQuiz";

import CourseQuiz from "./User/CourseQuiz";

import QuizQuestion from "./Teacher/QuizQuestion";
import AddQuizQuestion from "./Teacher/AddQuizQuestion";
import AssignQuiz from "./Teacher/AssignQuiz";
import TakeQuiz from "./User/TakeQuiz";

import AddStudyMaterial from "./Teacher/AddStudyMaterial";

import StudyMaterial from "./Teacher/StudyMaterial";
import UserStudyMaterial from "./User/UserStudyMaterial";
import { Route, Routes as Switch } from "react-router-dom";

const Main = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/detail/:course_id" element={<CourseDetail />} />
        <Route
          exact
          path="/teacher-detail/:teacher_id"
          element={<TeacherDetail />}
        />
        <Route exact path="/user-login" element={<Login />} />
        <Route exact path="/user-register" element={<Register />} />
        <Route exact path="/user-logout" element={<StudentLogout />} />
        <Route exact path="/student-dashboard" element={<Dashboard />} />
        <Route exact path="/teacher-dashboard" element={<TeacherDashbord />} />
        <Route exact path="/user-dashboard" element={<StudentDashboard />} />
        <Route exact path="/my-course" element={<MyCourses />} />
        <Route exact path="/teacher-users" element={<TeacherUser />} />
        <Route exact path="/favorite-courses" element={<FavoriteCourse />} />
        <Route
          exact
          path="/recommended-courses"
          element={<RecommendedCourses />}
        />
        <Route exact path="/profile-setting" element={<ProfileSetting />} />
        <Route
          exact
          path="/teacher-profile-setting"
          element={<TeacherProfileSetting />}
        />
        <Route exact path="/add-course" element={<Add />} />
        <Route exact path="/add-chapter/:course_id" element={<AddChapter />} />
        <Route
          exact
          path="/add-assignment/:student_id/:teacher_id"
          element={<AddAssignment />}
        />
        <Route
          exact
          path="/show-assignment/:student_id/:teacher_id"
          element={<ShowAssignment />}
        />
        <Route exact path="/my-assignments/" element={<StudentAssignment />} />
        <Route exact path="/edit-course/:course_id" element={<EditCourse />} />
        <Route exact path="/change-password" element={<ChagePassword />} />
        <Route
          exact
          path="/teacher-change-password"
          element={<TeacherChangePassword />}
        />
        <Route exact path="/teacher-login" element={<TeacherLogin />} />
        <Route exact path="/teacher-logout" element={<TeacherLogout />} />
        <Route exact path="/teacher-register" element={<TeacherRegister />} />
        <Route exact path="/all-course/" element={<AllCourse />} />
        <Route exact path="/all-chapters/:course_id" element={<AllChapter />} />
        <Route
          exact
          path="/edit-chapter/:chapter_id"
          element={<EditChapter />}
        />
        <Route
          exact
          path="/category/:category_slug"
          element={<CatagoryCourse />}
        />
        <Route exact path="/popular-teacher" element={<PopularTeacher />} />
        <Route exact path="/teacher-course" element={<TeacherCourse />} />
        <Route
          exact
          path="/teacher-skill-courses/:skill_name/:teacher_id"
          element={<TeacherSkillCourse />}
        />
        <Route
          exact
          path="/enrolled-students/:course_id"
          element={<EnrolledStudents />}
        />
        <Route
          exact
          path="/fetch-all-enrolled-students/:teacher_id"
          element={<UserList />}
        />
        <Route exact path="/add-quiz" element={<Addquiz />} />
        <Route exact path="/quiz" element={<AllQuiz />} />

        <Route exact path="/assign-quiz/:course_id" element={<AssignQuiz />} />
        <Route exact path="/course-quiz/:course_id" element={<CourseQuiz />} />
        <Route exact path="/take-quiz/:quiz_id" element={<TakeQuiz />} />

        <Route exact path="/edit-quiz/:quiz_id" element={<EditQuiz />} />
        <Route
          exact
          path="/quiz-questions/:quiz_id"
          element={<AddQuizQuestion />}
        />
        <Route
          exact
          path="/all-questions/:quiz_id"
          element={<QuizQuestion />}
        />

        <Route
          exact
          path="/study-material/:course_id"
          element={<StudyMaterial />}
        />
        <Route
          exact
          path="/add-study/:course_id"
          element={<AddStudyMaterial />}
        />
        <Route
          exact
          path="user/study-material/:course_id"
          element={<UserStudyMaterial />}
        />
      </Switch>
      <Footer />
    </div>
  );
};

export default Main;
