import React, { useState, useEffect } from 'react';
import './styleHeader.css'; // Liên kết tệp CSS cho kiểu dáng
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../../assets/logo.jpg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonPinCircleSharpIcon from '@mui/icons-material/PersonPinCircleSharp';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [username, setUsername] = useState('Guest');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        // Lấy username từ localStorage
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
        } else {
            setUsername('Guest'); // Nếu không có username thì mặc định là 'Guest'
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        // Xóa thông tin đăng nhập khi logout
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername('Guest');  // Đặt lại username về Guest khi đăng xuất
        navigate('/login');
    };

    const renderTooltip = (props: any) => (
        <Tooltip id="profile-tooltip" {...props}>
            Xin chào, {username}
        </Tooltip>
    );

    return (
        <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
            <div className="header__logo-container">
                <a className="header__logo-link" href="/">
                    <img className="header__logo" src={img} alt="Logo" />
                </a>
            </div>

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
                    <li><a href="/outlet">NEW POST</a></li>
                </ul>
            </nav>

            <div className="header__icons">
                <button className="header__icon-button" aria-label="Search">
                    <SearchIcon fontSize='medium' />
                </button>
                <button className="header__icon-button" aria-label="Cart">
                    <span className="header__cart-icon">🛒</span>
                </button>
                {role === 'admin' && (
                    <NavLink to="/add-product">
                        <PostAddIcon fontSize='medium' />
                    </NavLink>
                )}
                {role ? (
                    <div className="header-icon-profile">
                        <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                            <NavLink to="/profile">
                                <PersonPinCircleSharpIcon fontSize="medium" />
                            </NavLink>
                        </OverlayTrigger>
                        <div onClick={handleLogout} className="logout">
                            <LogoutIcon fontSize="medium" />
                        </div>
                    </div>
                ) : (
                    <NavLink to="/login">
                        <AccountCircleIcon fontSize='medium' />
                    </NavLink>
                )}
            </div>

        </header>
    );
};

export default Header;
