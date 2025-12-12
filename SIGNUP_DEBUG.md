# 🐛 Signup Troubleshooting Guide

## ✅ What I Just Fixed

### 1. **Enhanced Error Messages**
- Backend now shows specific error messages (not just "Signup Failed")
- Frontend displays actual error from backend
- Added console logging throughout the flow

### 2. **Added Debug Logging**
- ✅ API requests/responses logged with emojis
- ✅ Backend logs every signup attempt
- ✅ Shows exact error messages

### 3. **Improved Error Handling**
- ✅ Field validation on backend
- ✅ Better duplicate email detection
- ✅ Network error messages
- ✅ Server error details

---

## 🧪 How to Test Signup Now

### **Step 1: Check Metro Bundler Logs**
Open the terminal running `npx react-native start` and look for:
```
🚀 API Request: POST /auth/signup
📦 Request data: {name, email, password}
```

### **Step 2: Check Backend Logs**
Open the terminal running `node server.js` and look for:
```
📝 Signup request received: {name, email}
✅ User created successfully: [user_id]
```

### **Step 3: Try Signup**
1. Fill the form with:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "password123"
   - Confirm: "password123"

2. Click "Sign Up"

3. **Check for errors in logs:**

---

## 🔍 Common Errors & Solutions

### **Error: "User already exists"**
**Cause**: Email already registered in database

**Solution**:
```javascript
// Use a different email or delete existing user from MongoDB
// In MongoDB Atlas: Database → Browse Collections → users → Delete document
```

### **Error: "Network Error: No response received"**
**Cause**: Backend server not running or wrong URL

**Solution**:
```bash
# Make sure backend is running
cd backend
node server.js

# Should see:
# "Server running on port 5000"
# "MongoDB Connected: ..."
```

### **Error: "timeout of 10000ms exceeded"**
**Cause**: Backend is slow or MongoDB connection issue

**Solution**:
- Check MongoDB Atlas is accessible
- Verify MONGO_URI in backend/.env
- Check internet connection

### **Error: "Server Error: ..."**
**Cause**: Backend database or validation issue

**Solution**:
- Check backend terminal for detailed error
- Verify User model has all required fields
- Check MongoDB connection

---

## 📊 Debug Checklist

Run through this checklist:

- [ ] Backend server running (`node server.js` in backend folder)
- [ ] MongoDB connected (see "MongoDB Connected" message)
- [ ] Metro bundler running (`npx react-native start`)
- [ ] App running on device/emulator
- [ ] All form fields filled correctly
- [ ] Password ≥ 6 characters
- [ ] Passwords match
- [ ] Email not already used

---

## 🔧 Live Debugging

### **View Real-Time Logs**

**Frontend (React Native):**
```bash
# In Metro bundler terminal, you'll see:
🚀 API Request: POST /auth/signup
📦 Request data: {...}
✅ API Response: /auth/signup 201
```

**Backend (Node.js):**
```bash
# In backend terminal, you'll see:
📝 Signup request received: {name: "Test", email: "test@example.com"}
✅ User created successfully: 64abc123def456...
```

---

## 🎯 Test Scenarios

### **Scenario 1: First Time Signup** ✅
```
1. Use unique email
2. Fill all fields
3. Password ≥ 6 chars
4. Click Sign Up
Expected: ✅ Navigate to Dashboard
```

### **Scenario 2: Duplicate Email** ⚠️
```
1. Use existing email
2. Click Sign Up
Expected: ❌ Alert: "User already exists with this email"
```

### **Scenario 3: Validation Errors** ⚠️
```
1. Leave field empty → "Please fill all fields"
2. Password < 6 chars → "Password must be at least 6 characters"
3. Passwords don't match → "Passwords do not match"
```

---

## 📱 What to Check Now

### **In Metro Bundler Terminal:**
Look for these messages when you click Sign Up:

```
🚀 API Request: POST /auth/signup
📦 Request data: {name: "...", email: "...", password: "..."}
```

If you see this → API call is being made ✅

If you see `❌ Network Error` → Backend not reachable ❌

### **In Backend Terminal:**
Look for:

```
📝 Signup request received: {name: "...", email: "..."}
✅ User created successfully: [id]
```

If you see this → User created in MongoDB ✅

If you see `❌ Signup error:` → Check the error message ❌

---

## 🚀 Quick Fix Commands

```bash
# Restart backend with logs
cd backend
node server.js

# Clear React Native cache
npx react-native start --reset-cache

# Rebuild app
npx react-native run-android --reset-cache
```

---

## 📋 What Changed

### **Files Updated:**

1. **src/context/AuthContext.tsx**
   - Better error messages
   - Console logging
   - Shows backend error to user

2. **src/api/client.ts**
   - Request/response interceptors
   - Logs all API calls
   - Network error detection

3. **backend/routes/authRoutes.js**
   - Field validation
   - Detailed error messages
   - Console logging for debugging

---

## ✅ Next Steps

1. **Try signup again** with the improved logging
2. **Check both terminals** for error messages
3. **Look for specific errors** (not just "Signup Failed")
4. **Share the exact error message** you see

The app will now tell you exactly what's wrong! 🎯

---

**Backend Server**: ✅ Running on port 5000
**MongoDB**: ✅ Connected
**Error Logging**: ✅ Enhanced
**Ready to Debug**: ✅ YES!

Try signup now and check the console logs in both terminals to see the exact error! 📱
