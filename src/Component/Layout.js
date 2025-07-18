import { Link, Outlet } from 'react-router-dom';
import Btn from './Btn';

function Layout() {
    return (
        <div>
            <header className="container round mt-0 mt-sm-4 bgmi text-white py-4 px-4 px-md-5">
                <div className="row align-items-center">
                    <div className="col-6">
                        <Link to='/' className='text-decoration-none' ><h1 className="h4 m-0 job m">Jobhere</h1></Link>
                    </div>
                    <div className="col-6 text-end">
                        <Link to='/add-job'><Btn btn="Add New Job" /></Link>
                    </div>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
            <footer className="w-100 bg-black text-white py-5 text-center">
                <small>&copy; 2025 Job Portal. All rights reserved.</small>
            </footer>

        </div>
    );
}

export default Layout;
