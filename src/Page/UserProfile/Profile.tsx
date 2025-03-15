import { useState, useEffect } from 'react';
import axios from 'axios';
import './styleProfile.css';
import Header from '../../components/Header';

import Footer from '../../components/Footer/Footer';

const ProfilePage = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('https://be-exe-cho-do-cu.onrender.com/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data.user);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Header />
            <div className="profile-container">
                {/* Sidebar */}
                <div className="profile-sidebar">
                    <h3>Tài khoản của tôi</h3>
                    <ul>
                        <li><a href="/profile">Thông tin cá nhân</a></li>
                        <li><a href="/orders">Lịch sử đơn hàng</a></li>
                        <li><a href="/logout">Đăng xuất</a></li>
                    </ul>
                </div>

                {/* Nội dung chính */}
                <div className="profile-main">
                    <h2>Tài khoản của tôi</h2>

                    <div className="profile-card">
                        <div>
                            <strong>{user.username || 'Họ và Tên'}</strong>
                            {user.email}
                        </div>
                        <div>
                            <strong>Sinh nhật</strong>
                            {user.birthday || 'N/A'}
                        </div>
                        <div>
                            <strong>Điện thoại</strong>
                            {user.phone || 'N/A'}
                        </div>
                        <div>
                            <strong>Đã chi tiêu</strong>
                            {user.spent || '0 VNĐ'}
                        </div>
                        <div>
                            <strong>Điểm tích lũy</strong>
                            {user.points || '0'}
                        </div>
                    </div>

                    {/* Thông tin thêm */}
                    <div className="profile-details">
                        <h3>Thông tin cá nhân</h3>
                        <p>Địa chỉ nhận hàng: {user.address || 'Chưa cập nhật'}</p>
                        <h3>Lịch sử đơn hàng</h3>
                        <p>Xem các đơn hàng tại đây.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default ProfilePage;
