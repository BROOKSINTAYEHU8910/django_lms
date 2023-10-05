import { Link } from 'react-router-dom';
import SideBar from './SideBar';


const Dashboard = () =>{
    return (
        <div className="container mt-4" >
            <div className="row">
                <aside className="col-md-3">
              <SideBar/>
                </aside>
                <section className="col-md-9">
         Dashbord
                </section>
            </div>
        </div>
    )
}
export default Dashboard;