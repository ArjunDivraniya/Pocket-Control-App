# PocketControl - Complete App Flow Testing Guide

## ✅ Features Implemented

### 1. **4-Slide Onboarding Carousel**
- **Slide 1**: Track Your Daily Expenses (👛💰)
- **Slide 2**: Understand Your Spending (📊)
- **Slide 3**: Track Cash and UPI (💳📱)
- **Slide 4**: Stay Within Budget (📈)
- Navigation: Next → Back → Let's Start button on last slide
- Skip button available on all slides
- Step indicators showing current slide position

### 2. **Sign Up Screen**
- Form validation (all fields required)
- Password confirmation check
- Minimum 6 character password requirement
- MongoDB integration via backend API
- Auto-login after successful signup
- Loading states with spinner

### 3. **Login Screen**
- Email and password inputs
- Password visibility toggle
- Professional UI with gradients
- Backend API integration
- Token-based authentication (JWT)

### 4. **Dashboard Flow**
- Auto-skip onboarding/signup for returning users
- Persists user token in AsyncStorage
- Automatic navigation to Dashboard after login/signup
- Bottom tab navigation with 5 tabs

---

## 🚀 How to Test

### **Step 1: Start the Backend Server**

```bash
cd backend
npm start
```

Expected output:
```
Server running on port 5000
MongoDB Connected: pocket-control.6jkx75w.mongodb.net
```

### **Step 2: Start the React Native App**

```bash
npx react-native start --reset-cache
```

Then in another terminal:
```bash
# For Android
npx react-native run-android

# For iOS
npx react-native run-ios
```

### **Step 3: Test the Complete Flow**

#### **A. New User Flow (First Time)**
1. App loads → Shows **LoadingScreen** (3 seconds)
2. Navigates to **Onboarding Screen** (Slide 1)
3. Click **Next →** to see all 4 slides
4. Navigate through slides with:
   - **Next →** button (moves forward)
   - **← Back** button (appears after slide 1, goes back)
   - **Skip** button (top right, skips to signup)
5. On **Slide 4**, button changes to **"Let's Start"**
6. Click **"Let's Start"** → Goes to **SignupScreen**

#### **B. Sign Up Test**
1. **Fill the form:**
   - Name: "John Doe"
   - Email: "john@example.com"
   - Password: "password123"
   - Confirm: "password123"

2. **Test Validations:**
   - Leave a field empty → Shows error alert
   - Enter mismatched passwords → Shows error alert
   - Enter password < 6 chars → Shows error alert

3. **Submit:**
   - Click **"Sign Up"** button
   - Loading spinner appears
   - API sends to `/api/auth/signup`
   - Backend creates user in MongoDB
   - Token saved to AsyncStorage
   - Auto-navigates to **Dashboard**

#### **C. Dashboard (After Login)**
1. Shows bottom tab navigation with 5 tabs:
   - 🏠 Home (Active)
   - 💳 Transactions
   - ➕ Add (Floating button)
   - 📊 Reports
   - 👤 Profile

#### **D. Returning User Flow**
1. Close and reopen the app
2. LoadingScreen appears
3. AsyncStorage has token → Skips to Dashboard automatically
4. **No onboarding** is shown for returning users

---

## 🔧 Key Features

### **Onboarding Screen - Multi-Slide Carousel**

```
SLIDES = [
  {
    id: 1,
    title: 'Track Your Daily Expenses Easily',
    emoji: '👛',
    coin_emoji: '💰',
    ...
  },
  // 3 more slides...
]
```

- **State**: `currentSlide` (0-3)
- **Navigation**: 
  - `handleNext()` - Moves to next slide
  - `handlePrev()` - Moves to previous slide
  - `handleGetStarted()` - Navigates to Signup (on last slide)
- **Button Logic**: "Next →" on slides 1-3, "Let's Start" on slide 4
- **Indicators**: Animated dots showing progress

### **Sign Up Screen**

- **Imports**: `AuthContext` from `../../context/AuthContext`
- **Context Method**: `signup(name, email, password)`
- **API Endpoint**: `POST /api/auth/signup`
- **Response**: `{ token, _id, name, email }`
- **Auto-login**: Token saved, user logged in automatically

### **AuthContext - State Management**

```typescript
- isLoading: Shows loading spinner
- userToken: JWT token stored in AsyncStorage
- userInfo: User data { _id, name, email }
- onboardingComplete: Flag to skip onboarding
```

---

## 📱 Test Scenarios

### **Scenario 1: Complete New User Journey**
```
Load App → Onboarding (4 slides) → Sign Up → Dashboard
```

### **Scenario 2: Returning User Quick Flow**
```
Load App → LoadingScreen → Dashboard (1 second)
```

### **Scenario 3: Sign Up with Duplicate Email**
```
Sign Up → Use existing email → Shows error → Stays on signup screen
```

### **Scenario 4: Skip Onboarding**
```
Onboarding Screen 1 → Click "Skip" → Jump to Sign Up Screen
```

---

## 🐛 Troubleshooting

### **Backend Connection Error**
- ✅ Check backend is running: `npm start` from `/backend`
- ✅ Verify MongoDB URI in `.env` is correct
- ✅ Check port 5000 is not in use

### **Sign Up Fails**
- ✅ Check MongoDB connection
- ✅ Verify email is unique (not used before)
- ✅ Check password is 6+ characters
- ✅ Check all fields are filled

### **App Stuck on LoadingScreen**
- ✅ Press Ctrl+C and restart: `npx react-native start --reset-cache`
- ✅ Clear AsyncStorage by uninstalling and reinstalling app

### **Onboarding Button Not Working**
- ✅ Ensure you're on slide 4 (last slide)
- ✅ "Let's Start" button only shows on slide 4
- ✅ Check React Navigation version

---

## 📊 API Endpoints

### **Sign Up**
```
POST /api/auth/signup
Body: { name, email, password }
Response: { _id, name, email, token }
```

### **Login**
```
POST /api/auth/login
Body: { email, password }
Response: { _id, name, email, token }
```

---

## 🎨 Design Details

- **Purple Fintech Theme**: #8B5CF6 (primary), #7C3AED (deep)
- **Gradient Backgrounds**: Each slide has unique gradient
- **Typography**: 28px titles, 16px subtitles
- **Emojis**: Large 120px for main feature, 50px for secondary
- **Animations**: Smooth slide transitions with indicators

---

## ✨ Next Steps After Testing

1. **Test with multiple users** to verify unique email constraint
2. **Test password reset** flow (feature ready)
3. **Add expense transactions** via dashboard
4. **View reports** and analytics
5. **Manage categories** for expenses

---

## 📝 Notes

- All tokens expire after 30 days
- Passwords are hashed with bcrypt (10 salt rounds)
- First-time users see full onboarding
- Returning users skip directly to dashboard
- Data persisted in MongoDB Atlas
- AsyncStorage used for local token storage

Enjoy testing PocketControl! 🎉
