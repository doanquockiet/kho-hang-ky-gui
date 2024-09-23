import './styleHeader.css'; // Linking the CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../../assets/logo.jpg'
const Header = () => {
    return (
        <header className="header">
            <div className="header__app-wrapper">
                {/* Logo Section */}
                <div className="header__logo-container">
                    <a className="header__logo-link" href="https://www.chotot.com/">
                        <picture>
                            
                            <img
                                className="header__logo"
                                src={img}
                                alt="Kho Hang Ky Gui"
                              
                            />
                        </picture>
                    </a>
                </div>

                {/* Category Dropdown */}
                <div className="header__category">
                    <button className="header__category-button" aria-label="Danh mục">
                        {/* Hamburger Icon */}
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4 18.5H20C20.55 18.5 21 18.05 21 17.5C21 16.95 20.55 16.5 20 16.5H4C3.45 16.5 3 16.95 3 17.5C3 18.05 3.45 18.5 4 18.5ZM4 13.5H20C20.55 13.5 21 13.05 21 12.5C21 11.95 20.55 11.5 20 11.5H4C3.45 11.5 3 11.95 3 12.5C3 13.05 3.45 13.5 4 13.5ZM3 7.5C3 8.05 3.45 8.5 4 8.5H20C20.55 8.5 21 8.05 21 7.5C21 6.95 20.55 6.5 20 6.5H4C3.45 6.5 3 6.95 3 7.5Z"
                                fill="#222222"
                            />
                        </svg>
                        <span className="header__category-text">Danh mục</span>

                        {/* Dropdown Arrow Icon */}
                        <svg width="1rem" height="1rem" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.67154 5.99959C4.9323 5.74067 5.35336 5.74141 5.6132 6.00125L8.19653 8.58458L10.7863 6.00048C11.0461 5.74125 11.4668 5.74148 11.7263 6.00099C11.986 6.26071 11.986 6.68179 11.7263 6.94151L8.90364 9.76414C8.51312 10.1547 7.87995 10.1547 7.48943 9.76414L4.66987 6.94459C4.40872 6.68344 4.40947 6.25981 4.67154 5.99959Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Main Section */}
            <div className="header__main">
                {/* Search Bar */}
                <div className="header__search-container">
                    <form id="autoComplete" className="header__search-form">
                        <button aria-label="Search Button Desktop" className="header__search-button">
                            {/* Search Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" data-type="monochrome" viewBox="0 0 16 16" width="1em" height="1em" fill="none">
                                <path
                                    fill="currentColor"
                                    d="M6.4 0a6.369 6.369 0 00-4.525 1.873A6.425 6.425 0 00.502 3.906v.002A6.383 6.383 0 000 6.398a6.372 6.372 0 001.875 4.524 6.385 6.385 0 008.428.537l-.006.006 4.295 4.293a.827.827 0 001.166-1.166l-4.295-4.295a6.368 6.368 0 00-.537-8.424A6.372 6.372 0 006.4 0zm0 1.615a4.75 4.75 0 013.383 1.4c.44.44.785.95 1.028 1.522h-.002c.249.59.377 1.214.377 1.861 0 .648-.128 1.27-.377 1.862h.002a4.783 4.783 0 01-2.55 2.545c-.59.25-1.213.377-1.86.377a4.761 4.761 0 01-1.864-.377A4.749 4.749 0 013.016 9.78c-.44-.44-.783-.95-1.024-1.521a4.735 4.735 0 01-.377-1.862c0-.647.127-1.272.377-1.863a4.75 4.75 0 011.024-1.52 4.754 4.754 0 013.384-1.4z"
                                />
                            </svg>
                        </button>
                        <input
                            autoComplete="off"
                            placeholder="Tìm kiếm sản phẩm trên Chợ Tốt"
                            id="searchInput"
                            type="text"
                            className="header__search-input"
                            value=""
                        />
                    </form>
                </div>

                {/* Action Icons */}
                <div className="header__actions">
                    {/* Chat Icon */}
                    <a className="header__action-link" href="https://chat.chotot.com/chat" aria-label="Chat">
                        {/* Chat SVG Icon */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.7499 4.34844C3.71012 4.34844 3.67197 4.36424 3.64384 4.39237C3.61571 4.4205 3.5999 4.45866 3.5999 4.49844V15.2422L6.33529 13.0318C6.44205 12.9455 6.57515 12.8984 6.7124 12.8984H15.7499C15.7897 12.8984 15.8278 12.8826 15.856 12.8545C15.8841 12.8264 15.8999 12.7882 15.8999 12.7484V4.49844C15.8999 4.45865 15.8841 4.4205 15.856 4.39237C15.8278 4.36424 15.7897 4.34844 15.7499 4.34844H3.7499ZM2.79531 3.54384C3.04848 3.29067 3.39186 3.14844 3.7499 3.14844H15.7499C16.1079 3.14844 16.4513 3.29067 16.7045 3.54384C16.9577 3.79702 17.0999 4.1404 17.0999 4.49844V12.7484C17.0999 13.1065 16.9577 13.4499 16.7045 13.703C16.4513 13.9562 16.1079 14.0984 15.7499 14.0984H6.92453L3.37701 16.9651C3.19721 17.1104 2.94992 17.1395 2.74132 17.0399C2.53271 16.9402 2.3999 16.7296 2.3999 16.4984V4.49844C2.3999 4.14039 2.54213 3.79702 2.79531 3.54384Z"
                                fill="#222222"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M15.8999 8.24844C15.8999 7.91707 16.1685 7.64844 16.4999 7.64844H20.2499C20.6079 7.64844 20.9513 7.79067 21.2045 8.04384C21.4577 8.29702 21.5999 8.6404 21.5999 8.99844V20.9984C21.5999 21.2296 21.4671 21.4402 21.2585 21.5399C21.0499 21.6395 20.8026 21.6104 20.6228 21.4651L17.0753 18.5984H8.2499C7.89186 18.5984 7.54848 18.4562 7.29531 18.203C7.04213 17.9499 6.8999 17.6065 6.8999 17.2484V13.4984C6.8999 13.1671 7.16853 12.8984 7.4999 12.8984C7.83127 12.8984 8.0999 13.1671 8.0999 13.4984V17.2484C8.0999 17.2882 8.11571 17.3264 8.14384 17.3545C8.17197 17.3826 8.21012 17.3984 8.2499 17.3984H17.2874C17.4247 17.3984 17.5578 17.4455 17.6645 17.5318L20.3999 19.7422V8.99844C20.3999 8.95865 20.3841 8.9205 20.356 8.89237C20.3278 8.86424 20.2897 8.84844 20.2499 8.84844H16.4999C16.1685 8.84844 15.8999 8.57981 15.8999 8.24844Z"
                                fill="#222222"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6.7998 7.23047C6.7998 6.95433 6.99168 6.73047 7.22838 6.73047H12.3712C12.6079 6.73047 12.7998 6.95433 12.7998 7.23047C12.7998 7.50661 12.6079 7.73047 12.3712 7.73047H7.22838C6.99168 7.73047 6.7998 7.50661 6.7998 7.23047Z"
                                fill="#222222"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6.7998 10.2305C6.7998 9.95433 6.99168 9.73047 7.22838 9.73047H12.3712C12.6079 9.73047 12.7998 9.95433 12.7998 10.2305C12.7998 10.5066 12.6079 10.7305 12.3712 10.7305H7.22838C6.99168 10.7305 6.7998 10.5066 6.7998 10.2305Z"
                                fill="#222222"
                            />
                        </svg>
                        <div className="header__chat-unread" style={{ display: 'none' }}>0</div>
                    </a>

                    {/* Orders Dropdown */}
                    <div className="header__dropdown">
                        <a className="header__dropdown-toggle" href="/" aria-haspopup="true" aria-expanded="false">
                            {/* Orders Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.38278 7.30078H18.6172C19.8276 7.30078 20.8486 8.20207 20.9987 9.4031L22.2487 19.4031C22.4277 20.8355 21.3108 22.1008 19.8672 22.1008H4.13278C2.68918 22.1008 1.57225 20.8355 1.75131 19.4031L3.00131 9.4031C3.15144 8.20207 4.1724 7.30078 5.38278 7.30078ZM5.38278 8.70078H18.6172C19.1215 8.70078 19.5469 9.07632 19.6095 9.57675L20.8595 19.5767C20.9341 20.1736 20.4687 20.7008 19.8672 20.7008H4.13278C3.53128 20.7008 3.06589 20.1736 3.1405 19.5767L4.3905 9.57675C4.45305 9.07632 4.87845 8.70078 5.38278 8.70078Z"
                                    fill="currentColor"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 4.2C10.3713 4.2 9.05105 5.46639 9.05105 7.02857V10.8C9.05105 11.1314 8.77099 11.4 8.42552 11.4C8.08005 11.4 7.79999 11.1314 7.79999 10.8V7.02857C7.79999 4.80365 9.68039 3 12 3C14.3196 3 16.2 4.80365 16.2 7.02857V10.8C16.2 11.1314 15.9199 11.4 15.5745 11.4C15.229 11.4 14.9489 11.1314 14.9489 10.8V7.02857C14.9489 5.46639 13.6286 4.2 12 4.2Z"
                                    fill="currentColor"
                                />
                            </svg>
                            <ul className="header__dropdown-menu">
                                <li><a href="https://www.chotot.com/escrow/my-orders/identity/buyer" rel="nofollow">Đơn mua</a></li>
                                <li><a href="https://www.chotot.com/escrow/my-orders/identity/seller" rel="nofollow">Đơn bán</a></li>
                            </ul>
                        </a>
                    </div>

                    {/* Manage Ads Link */}
                    <a className="header__manage-ads-link" href="https://id.chotot.com/login" rel="nofollow">
                        {/* Manage Ads Icon */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.28571 2C5.14907 2 4.05898 2.45153 3.25526 3.25526C2.45153 4.05898 2 5.14907 2 6.28571V17.7143C2 18.8509 2.45153 19.941 3.25526 20.7447C4.05898 21.5485 5.14907 22 6.28571 22H17.7143C18.8509 22 19.941 21.5485 20.7447 20.7447C21.5485 19.941 22 18.8509 22 17.7143V6.28571C22 5.14907 21.5485 4.05898 20.7447 3.25526C19.941 2.45153 18.8509 2 17.7143 2H6.28571ZM3.42857 6.28571C3.42857 5.52795 3.72959 4.80123 4.26541 4.26541C4.80123 3.72959 5.52795 3.42857 6.28571 3.42857H17.7143C18.472 3.42857 19.1988 3.72959 19.7346 4.26541C20.2704 4.80123 20.5714 5.52795 20.5714 6.28571V17.7143C20.5714 18.472 20.2704 19.1988 19.7346 19.7346C19.1988 20.2704 18.472 20.5714 17.7143 20.5714H6.28571C5.52795 20.5714 4.80123 20.2704 4.26541 19.7346C3.72959 19.1988 3.42857 18.472 3.42857 17.7143V6.28571Z"
                                fill="currentColor"
                            />
                            <rect x="6" y="7" width="3" height="3" rx="1.5" fill="currentColor" />
                            <path
                                d="M12 8.5C12 8.08579 12.3358 7.75 12.75 7.75H17.25C17.6642 7.75 18 8.08579 18 8.5C18 8.91421 17.6642 9.25 17.25 9.25H12.75C12.3358 9.25 12 8.91421 12 8.5Z"
                                fill="currentColor"
                            />
                            <rect x="6" y="14" width="3" height="3" rx="1.5" fill="currentColor" />
                            <path
                                d="M12 15.5C12 15.0858 12.3358 14.75 12.75 14.75H17.25C17.6642 14.75 18 15.0858 18 15.5C18 15.9142 17.6642 16.25 17.25 16.25H12.75C12.3358 16.25 12 15.9142 12 15.5Z"
                                fill="currentColor"
                            />
                        </svg>
                        <span className="header__manage-ads-text">Quản lý tin</span>
                    </a>
                </div>

                {/* User Account Dropdown */}
                <div className="header__account">
                    <div className="header__account-dropdown">
                        <button className="header__account-button" aria-haspopup="true" aria-expanded="false">
                            {/* User Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M11.9998 4.20078C7.41584 4.20078 3.6998 7.91682 3.6998 12.5008C3.6998 17.0847 7.41584 20.8008 11.9998 20.8008C16.5838 20.8008 20.2998 17.0847 20.2998 12.5008C20.2998 7.91682 16.5838 4.20078 11.9998 4.20078Z"
                                    fill="currentColor"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M11.9998 8.70078C10.3153 8.70078 8.9498 10.0663 8.9498 11.7508C8.9498 13.4352 10.3153 14.8008 11.9998 14.8008C13.6843 14.8008 15.0498 13.4352 15.0498 11.7508C15.0498 10.0663 13.6843 8.70078 11.9998 8.70078Z"
                                    fill="currentColor"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12.0001 16.2008C10.8829 16.2008 9.78747 16.5102 8.83528 17.0946C7.88309 17.6791 7.11134 18.5158 6.60557 19.512C6.43056 19.8567 6.00923 19.9943 5.66452 19.8193C5.3198 19.6443 5.18222 19.2229 5.35723 18.8782C5.98004 17.6515 6.93038 16.6211 8.10291 15.9014C9.27544 15.1817 10.6244 14.8008 12.0001 14.8008C13.3759 14.8008 14.7249 15.1817 15.8974 15.9014C17.0699 16.6211 18.0203 17.6515 18.6431 18.8782C18.8181 19.2229 18.6805 19.6443 18.3358 19.8193C17.9911 19.9943 17.5697 19.8567 17.3947 19.512C16.889 18.5158 16.1172 17.6791 15.165 17.0946C14.2128 16.5102 13.1174 16.2008 12.0001 16.2008Z"
                                    fill="currentColor"
                                />
                            </svg>
                            <span className="header__account-text">Tài khoản</span>

                            {/* Dropdown Arrow Icon */}
                            <svg width="1rem" height="1rem" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.67154 5.99959C4.9323 5.74067 5.35336 5.74141 5.6132 6.00125L8.19653 8.58458L10.7863 6.00048C11.0461 5.74125 11.4668 5.74148 11.7263 6.00099C11.986 6.26071 11.986 6.68179 11.7263 6.94151L8.90364 9.76414C8.51312 10.1547 7.87995 10.1547 7.48943 9.76414L4.66987 6.94459C4.40872 6.68344 4.40947 6.25981 4.67154 5.99959Z" fill="currentColor" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        <ul className="header__account-dropdown-menu">
                            <li><a href="https://id.chotot.com/login" rel="nofollow">Đăng nhập</a></li>
                            <li><a href="https://id.chotot.com/register" rel="nofollow">Đăng ký</a></li>
                        </ul>
                    </div>
                </div>
                </div>
            </header>

           
    );
};

export default Header;
