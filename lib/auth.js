const MOCK_USERS_KEY = 'mock_users';
const SESSION_KEY = 'auth_session';
const OTP_STORE_KEY = 'otp_store';

// Helper: load users
export const getUsers = () => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(MOCK_USERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Helper: save users
export const saveUsers = (users) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
  }
};

// Initialize mock users if empty
export const initMockUsers = () => {
  const users = getUsers();
  if (users.length === 0) {
    users.push({
      id: '1',
      name: 'David Smith',
      email: 'david@example.com',
      phone: '+1234567890',
      password: 'Demo@1234',
      profilePicture: null,
    });
    saveUsers(users);
  }
};

// Signup – does not auto-login, returns user and generates OTP
export const mockSignup = ({ name, phone, email, password }) => {
  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    throw new Error('Email already registered');
  }
  const newUser = {
    id: Date.now().toString(),
    name,
    phone,
    email,
    password,
    profilePicture: null,
    isVerified: false, // added flag
  };
  users.push(newUser);
  saveUsers(users);

  // Generate 6-digit OTP and store temporarily
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  localStorage.setItem(OTP_STORE_KEY, JSON.stringify({ email, otp, expires: Date.now() + 10 * 60 * 1000 })); // 10 min expiry
  return { userId: newUser.id, email, otp }; // return OTP for display (mock)
};

// Verify OTP
export const mockVerifyOtp = (email, enteredOtp) => {
  const stored = localStorage.getItem(OTP_STORE_KEY);
  if (!stored) throw new Error('No OTP request found');
  const { email: storedEmail, otp, expires } = JSON.parse(stored);
  if (storedEmail !== email) throw new Error('Email mismatch');
  if (Date.now() > expires) throw new Error('OTP expired');
  if (otp !== enteredOtp) throw new Error('Invalid OTP');

  // Mark user as verified
  const users = getUsers();
  const userIndex = users.findIndex((u) => u.email === email);
  if (userIndex === -1) throw new Error('User not found');
  users[userIndex].isVerified = true;
  saveUsers(users);
  localStorage.removeItem(OTP_STORE_KEY);

  // Auto-login after verification
  const session = { userId: users[userIndex].id, email: users[userIndex].email, name: users[userIndex].name };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
};

// Login (only if verified)
export const mockLogin = ({ email, password }) => {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password');
  if (!user.isVerified) throw new Error('Please verify your email first');
  const session = { userId: user.id, email: user.email, name: user.name };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
};

// Forgot password
export const mockForgotPassword = (email) => {
  const users = getUsers();
  const user = users.find((u) => u.email === email);
  if (!user) throw new Error('No account found with this email');
  const resetToken = Math.random().toString(36).substring(2, 15);
  localStorage.setItem(`reset_token_${email}`, resetToken);
  return { success: true, token: resetToken };
};

// Reset password
export const mockResetPassword = (email, newPassword, token) => {
  const storedToken = localStorage.getItem(`reset_token_${email}`);
  if (!storedToken || storedToken !== token) {
    throw new Error('Invalid or expired reset token');
  }
  const users = getUsers();
  const userIndex = users.findIndex((u) => u.email === email);
  if (userIndex === -1) throw new Error('User not found');
  users[userIndex].password = newPassword;
  saveUsers(users);
  localStorage.removeItem(`reset_token_${email}`);
  return true;
};

// Update profile picture
export const mockUpdateProfilePicture = (email, imageDataUrl) => {
  const users = getUsers();
  const userIndex = users.findIndex((u) => u.email === email);
  if (userIndex === -1) throw new Error('User not found');
  users[userIndex].profilePicture = imageDataUrl;
  saveUsers(users);
  // Update session
  const session = { userId: users[userIndex].id, email: users[userIndex].email, name: users[userIndex].name };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
};

// Logout
export const mockLogout = () => {
  localStorage.removeItem(SESSION_KEY);
};

// Get current session
export const getCurrentSession = () => {
  if (typeof window === 'undefined') return null;
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
};