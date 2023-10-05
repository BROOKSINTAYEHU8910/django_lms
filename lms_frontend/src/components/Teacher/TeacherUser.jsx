import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
function TeacherUser(){
    return(
        <div className="container mt-4">
        <div className="card">
        <Link to="/my-course"><h5 className="card-header">My courses</h5></Link>
        <div className="card-body">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created By</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <td>Art</td>
                    <td><Link to="/">Mr.Mikiyas Gashaw S/gebreal</Link></td>
                    <td>
                        <button className="btn btn-danger btn-sm active">Delete</button>
                    </td>
                </tbody>
            </table>
        </div>
    </div>
    </div>
    )
}
export default TeacherUser;