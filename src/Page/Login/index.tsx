import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/'); // Redirect to home if token exists
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            // Gửi yêu cầu đăng nhập
            const response = await axios.post('http://localhost:8080/api/users/login', {
                email,
                password,
            });
    
            if (response.status === 200) {
                const token = response.data.token;
    
                // Lưu token vào localStorage
                localStorage.setItem('token', token);
    
                // Lấy thông tin hồ sơ người dùng bằng token
                const profileResponse = await axios.get('http://localhost:8080/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (profileResponse.status === 200) {
                    const { role, username } = profileResponse.data.user;
    
                    // Lưu role và username vào localStorage
                    localStorage.setItem('role', role);
                    localStorage.setItem('username', username);
    
                    setMessage('Login successful');
                    navigate('/'); // Chuyển hướng về trang chủ
                }
            }
        } catch (error) {
            setMessage('Login failed. Please check your credentials.');
        }
    };
    

    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#e3f2fd' }}>
            <div className="card shadow-lg" style={{ width: '400px', borderRadius: '10px' }}>
                <div className="card-body p-4">
                    <h3 className="card-title text-center mb-4">Sign In</h3>
                    {message && <p className="text-danger text-center">{message}</p>}
                    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="emailInput"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="passwordInput"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>

                    <div className="text-center mt-3">
                        <a href="/forgot-password" className="small text-muted">Forgot Password?</a>
                    </div>
                    <div className="text-center mt-2">
                        <p className="small">
                            Don't have an account? <a href="/register" className="text-primary">Register here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
