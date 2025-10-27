# Setup Instructions

## Environment Configuration

### 1. Create Backend Environment File

Create a `.env` file in the `backend` directory with the following content:

```env
# Environment Configuration
NODE_ENV=development
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb+srv://gvamsikrishna71817:chronvirkcr7@cluster0.y2z6c3m.mongodb.net/library-management

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_EXPIRE=7d

# Optional: Cloudinary Configuration (if you want to use it for image uploads)
# CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
# CLOUDINARY_API_KEY=your_cloudinary_api_key
# CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 2. Quick Setup Commands

```bash
# Install all dependencies
npm run install-all

# Start both backend and frontend
npm run dev
```

### 3. Manual Setup (Alternative)

```bash
# Backend setup
cd backend
npm install
# Create .env file with the content above
npm run dev

# Frontend setup (in a new terminal)
cd frontend
npm install
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### 5. Default Admin Account

You can register a new admin account by:
1. Going to the registration page
2. Selecting "Admin" as the role
3. Creating your admin account

### 6. Environment Variables Explained

- `NODE_ENV`: Set to 'development' for development mode
- `PORT`: Backend server port (default: 5000)
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for JWT token signing (change this in production)
- `JWT_EXPIRE`: JWT token expiration time (7 days)
- `CLOUDINARY_*`: Optional configuration for image uploads

### 7. Security Notes

- Change the `JWT_SECRET` to a strong, random string in production
- Never commit the `.env` file to version control
- Use environment variables for all sensitive configuration




