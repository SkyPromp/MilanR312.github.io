import './Header.css';
import test from './data.json'
import {Outlet,Link} from "react-router-dom";

function header() {
    return (
        <div className="Header">
            <nav>
                <Link to="ieee">ieee</Link>
                <Link to="int">int</Link>
            </nav>
            <Outlet />
        </div>
    );
}

export default header;
