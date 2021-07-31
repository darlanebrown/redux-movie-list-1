import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/movie-list">Movie List</Link>
        </div>
    );
}

export default Navbar;