import { HomePage, DashboardPage, MapPage, Login, AdminTable, Registration, ResetPassword, VerificationCode, ProfileSettings, SimulationMapPage, HealthSimulationMapPage} from "./pages"
import { Route, BrowserRouter as Router, Routes, Outlet } from "react-router-dom"
import { AppLayout, HomeLayout } from "./layouts"
import { wip } from "./assets"
import { RegistrationProvider } from "./hooks/backend/useRegistrationProcessor"
import {AuthenticationProvider} from "./hooks/backend/useAuthenticationProcessor"

const App = () => {

  const AuthWrapper = () => (
    <AuthenticationProvider>
      <Outlet />
    </AuthenticationProvider>
  );

  const RegistrationWrapper = () => (
    <RegistrationProvider>
      <Outlet />
    </RegistrationProvider>
  );

  return (
    <Router>
      <Routes >
        <Route element={<AuthWrapper />}>
          <Route path="/" element={<HomeLayout/>} >
            <Route path="home" element={<HomePage />} />
            <Route path="signin" element={<Login />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route element={<RegistrationWrapper />}>
              <Route path="signup" element={<Registration />} />
              <Route path="verification" element={<VerificationCode />} />
            </Route>
          </Route>

          <Route path="/app" element={<AppLayout />}>
            <Route path="map" element={<MapPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="trees-simulations" element={<SimulationMapPage/>} />
            <Route path="health-simulations" element={<HealthSimulationMapPage/>} />
            <Route path="management" element={<AdminTable />} />
            <Route path="profile-settings" element={<ProfileSettings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}





export default App
