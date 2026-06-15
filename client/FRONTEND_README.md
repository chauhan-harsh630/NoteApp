# NoteApp Frontend Documentation

## Overview
This frontend is built according to your backend API structure using **React + Vite** with modern state management using Context API for authentication.

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Top navigation with user info & logout
│   ├── NoteCard.jsx        # Single note display card
│   ├── NoteForm.jsx        # Form to create/edit notes
│   ├── NoteList.jsx        # Grid of all notes
│   └── ProtectedRoute.jsx  # Route protection for authenticated users
├── context/
│   └── AuthContext.jsx     # Authentication state management
├── pages/
│   ├── Dashboard.jsx       # Main app page (create, view, edit notes)
│   ├── Login.jsx           # Login page
│   └── Register.jsx        # Registration page
├── services/
│   └── api.js              # All API calls to backend
├── styles/
│   ├── App.css
│   ├── Auth.css
│   ├── Dashboard.css
│   ├── Header.css
│   ├── NoteCard.css
│   ├── NoteForm.css
│   └── NoteList.css
├── App.jsx                 # Main routing component
└── main.jsx               # Entry point
```

## API Integration

### Backend Endpoints Connected
All endpoints from your backend are integrated:

**Authentication** (`/api/auth/v1`):
- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /refreshToken` - Refresh access token

**Notes** (`/api/v1`):
- `POST /create/note` - Create note (requires auth)
- `GET /get/notes` - Get all user notes (requires auth)
- `GET /get/note/:id` - Get single note (requires auth)
- `PUT /update/note/:id` - Update note (requires auth)
- `POST /delete/note/:id` - Delete note (requires auth)

### API Service (`services/api.js`)
The API service exports two main objects:
- `authAPI` - Auth-related API calls
- `notesAPI` - Note-related API calls

All requests include:
- Content-Type headers
- Credentials for cookie handling
- Proper error handling

## Features Implemented

### 1. **Authentication System**
- Register new users
- Login with email & password
- Logout functionality
- Protected routes (only authenticated users can access dashboard)
- User session persistence using localStorage
- AuthContext for global auth state

### 2. **Note Management**
- Create new notes with title & content
- Pin important notes
- Edit existing notes
- Delete notes with confirmation
- View all notes in a grid layout
- Sort notes by creation date (newest first)

### 3. **User Interface**
- Clean, modern design with gradient colors (purple theme)
- Responsive layout for mobile & desktop
- Header with user welcome message
- Sidebar with "New Note" button
- Note cards with metadata (date, pin status)
- Empty state message
- Loading states
- Error handling with user feedback

### 4. **State Management**
- **AuthContext**: Manages user login state globally
- **Component State**: Local state for forms and lists
- **localStorage**: Persists user session

## Getting Started

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Update Backend URL (if different from localhost:5000)
Edit `src/services/api.js`:
```javascript
const API_URL = 'http://localhost:5000/api'; // Change if needed
```

### 3. Start Development Server
```bash
npm run dev
```

The app will run at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

## Key Components

### **AuthContext** (`context/AuthContext.jsx`)
Provides:
- `user` - Current user object
- `isAuthenticated` - Boolean flag
- `loading` - Loading state
- `error` - Error message
- `register()` - Register function
- `login()` - Login function
- `logout()` - Logout function

Usage:
```javascript
const { user, login, logout, isAuthenticated } = useAuth();
```

### **ProtectedRoute** (`components/ProtectedRoute.jsx`)
Wraps routes that require authentication. Redirects to login if not authenticated.

### **NoteForm** (`components/NoteForm.jsx`)
Handles both create and edit modes:
- Auto-fills data when editing
- Validates required fields
- Shows loading state during submission
- Displays success/error messages

### **NoteList** (`components/NoteList.jsx`)
Displays notes with:
- Fetching from backend
- Edit & delete actions
- Empty state
- Error handling
- Auto-refresh on changes

## Workflow

### Registration Flow
1. User fills registration form
2. Form validates inputs
3. API call to backend
4. Redirect to login page

### Login Flow
1. User enters email & password
2. API authenticates with backend
3. User data saved to localStorage
4. Redirect to dashboard

### Dashboard Flow
1. User sees header with logout button
2. Sidebar with "New Note" button
3. Click to show form or hide it
4. Create/Edit notes
5. View all notes in grid
6. Click edit to modify note
7. Click delete to remove note

## Styling

All CSS is modular and organized by component:
- **Auth.css** - Login & Register pages
- **Dashboard.css** - Main layout
- **NoteForm.css** - Form styling
- **NoteCard.css** - Note card styling
- **NoteList.css** - Grid layout
- **Header.css** - Header styling

### Color Scheme
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Text**: Dark gray (#333)
- **Background**: Light gray (#f5f7fa)
- **Accents**: Yellow for pinned notes

## Error Handling

The app handles:
- Network errors
- API validation errors
- Form validation errors
- Authentication failures
- Missing data

All errors are displayed to users with clear messages.

## Testing the App

1. **Register**: Create a new account
2. **Login**: Use your credentials
3. **Create Note**: Click "New Note", fill form, submit
4. **Edit Note**: Click edit icon on note card
5. **Pin Note**: Check the pin checkbox in form
6. **Delete Note**: Click delete icon with confirmation
7. **Logout**: Click logout button in header

## Improvements Made

✅ Proper folder structure
✅ Component separation of concerns
✅ Global auth state management
✅ Protected routes
✅ API service layer
✅ Responsive design
✅ Error handling & validation
✅ User feedback (loading, errors, success)
✅ Local persistence (localStorage)
✅ Modern React patterns (hooks, context)

## Next Steps (Optional Enhancements)

- [ ] Search/filter notes
- [ ] Categories/tags for notes
- [ ] Rich text editor for content
- [ ] Sharing notes with others
- [ ] Dark mode toggle
- [ ] Note archiving
- [ ] Export notes
- [ ] Password reset functionality

---

**Built with React 19 + Vite + React Router v6**
