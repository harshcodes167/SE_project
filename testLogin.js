import axios from 'axios';

const loginUser = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/users/login', {
      email: 'sweetyyy1759906515053@example.com',
      password: 'mypassword123'  // same password used during registration
    });
    console.log('✅ Login Successful:', res.data);
  } catch (err) {
    console.error('❌ Server responded with error:', err.response.data);
  }
};

loginUser();
