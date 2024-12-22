import './styleHeader.css'; // Linking the CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../../assets/logo.jpg'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink, useNavigate } from 'react-router-dom';
const Header = () => {
    const role = localStorage.getItem('role');
    const navigate = useNavigate()
    
    const handleLogout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        navigate('/login'); 
    };
    return (
        <header className="header">
            {/* Logo Section */}
            <div className="header__logo-container">
                <a className="header__logo-link" href="/">
                    <img
                        className="header__logo"
                        src={img}
                        alt="Logo"
                    />
                </a>
            </div>

            {/* Navigation Menu */}
            <nav className="header__nav">
                <ul className="header__menu">
                    <li><a href="/">TRANG CHỦ</a></li>
                    <li><a href="/deals">DECEMBER DEAL</a></li>
                    <li className="dropdown">
                        <a href="#" className="dropdown__toggle">SẢN PHẨM</a>
                        <ul className="dropdown__menu">
                            <li><a href="#">JACKETS</a></li>
                            <li><a href="#">HOODIE & SWEATER</a></li>
                            <li><a href="#">PANTS</a></li>
                            <li><a href="#">SHIRTS</a></li>
                            <li><a href="#">JEANS</a></li>
                            <li><a href="#">SHORTS</a></li>
                            <li><a href="#">T-SHIRT</a></li>
                            <li><a href="#">POLO</a></li>
                            <li><a href="#">ACCESSORIES</a></li>
                        </ul>
                    </li>
                    <li><a href="/outlet">OUTLET STORE</a></li>
                </ul>
            </nav>

            {/* User Account and Icons */}
            <div className="header__icons">
                <button className="header__icon-button" aria-label="Search">
                    <SearchIcon />
                </button>

                {role ? (
                    <button
                        onClick={handleLogout}
                        className="header__button header__button--logout"
                    >
                        Logout
                    </button>
                ) : (
                    <NavLink to="/login" className="header__button header__button--login">
                        <AccountCircleIcon /> Login
                    </NavLink>
                )}
                <button className="header__icon-button" aria-label="Cart">
                    <span className="header__cart-icon">🛒</span>
                </button>
                {role === 'admin' && (
                    <NavLink to="/add-product" className="dangtin">
                        Đăng Tin
                    </NavLink>
                )}
            </div>
        </header>


    );
};

export default Header;
