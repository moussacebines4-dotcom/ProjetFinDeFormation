import FloatingShape from "./components/FloatingShape.jsx"
import { Route, Routes, Navigate } from "react-router-dom"
import SignUpPage from "./Pages/SignUpPage.jsx"
import LoginPage from "./Pages/LoginPage.jsx"
import EmailVerificationPage from "./Pages/EmailVerificationPage.jsx"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./Store/authStore.js"
import { useEffect } from "react"
import Dashboard from "./Pages/Dashboard.jsx"
import ForgotPasswordPage from "./Pages/ForgotPasswordPage.jsx"
import ResetPasswordPage from "./Pages/ResetPasswordPage.jsx"


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />
  }
  return children

}
const RedirectAuthentificatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()
  if (isAuthenticated && user.isVerified) return <Navigate to="/" replace />
  return children
}

function App() {
  const { isChekingAuth, checkAuth } = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-green-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-green-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        <Route path="/signup" element={
          <RedirectAuthentificatedUser>
            <SignUpPage />
          </RedirectAuthentificatedUser>} />

        <Route path="/login" element={
          <RedirectAuthentificatedUser>
            <LoginPage />
          </RedirectAuthentificatedUser>
        } />

        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="forgot-password" element={
          <RedirectAuthentificatedUser>
            <ForgotPasswordPage />

          </RedirectAuthentificatedUser>} />
        <Route path="reset-password" element={
          <RedirectAuthentificatedUser>
            <ResetPasswordPage />

          </RedirectAuthentificatedUser>} />

        {/* <Route path="*" element ={
          <navigate to="/" replace />
        } /> */}

      </Routes>

      <Toaster/>

    </div>
  )
}

export default App
