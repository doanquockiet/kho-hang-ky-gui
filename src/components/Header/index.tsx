import React, { useState, useEffect } from 'react';
import './styleHeader.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../../assets/l1.jpg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonPinCircleSharpIcon from '@mui/icons-material/PersonPinCircleSharp';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [username, setUsername] = useState('Guest');
    const [cartCount, setCartCount] = useState(0);
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        setUsername(savedUsername || 'Guest');
    }, []);

    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://localhost:8080/api/cart', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const cartItems = response.data.items || [];
                    const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
                    setCartCount(totalCount);
                }
            } catch (error) {
                console.error('Error fetching cart count:', error);
            }
        };

        fetchCartCount();

        const updateCartCountListener = (event) => {
            setCartCount(event.detail);
        };

        window.addEventListener('updateCartCount', updateCartCountListener);

        return () => {
            window.removeEventListener('updateCartCount', updateCartCountListener);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            // Cập nhật trạng thái isScrolled nếu vị trí cuộn > 50
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername('Guest');
        setCartCount(0);
        navigate('/login');
    };

    const renderTooltip = (props) => (
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
                    <SearchIcon fontSize="medium" />
                </button>
                <NavLink to="/cart" className="header__icon-button" aria-label="Cart">
                    <span className="header__cart-icon">
                        <ShoppingCartIcon fontSize="medium" />
                    </span>
                    {cartCount > 0 && <span className="header__cart-count">{cartCount}</span>}
                </NavLink>
                {role === 'admin' && (
                    <NavLink to="/add-product" className="header__icon-button">
                        <PostAddIcon fontSize="medium" />
                    </NavLink>
                )}
                {role ? (
                    <>
                        <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                            <NavLink to="/profile" className="header__icon-button">
                                <PersonPinCircleSharpIcon fontSize="medium" />
                            </NavLink>
                        </OverlayTrigger>
                        <button
                            className="header__icon-button"
                            onClick={handleLogout}
                            aria-label="Logout"
                        >
                            <LogoutIcon fontSize="medium" />
                        </button>
                    </>
                ) : (
                    <NavLink to="/login" className="header__icon-button">
                        <AccountCircleIcon fontSize="medium" />
                    </NavLink>
                )}
            </div>
        </header>
    );
};

export default Header;
