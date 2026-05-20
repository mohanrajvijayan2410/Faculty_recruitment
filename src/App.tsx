import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecruitmentProvider } from "@/context/RecruitmentContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import CareersPage from "./pages/CareersPage";
import ApplyPage from "./pages/ApplyPage";
import ResumeAnalysisPage from "./pages/ResumeAnalysisPage";
import TechnicalTestPage from "./pages/TechnicalTestPage";
import PsychometricTestPage from "./pages/PsychometricTestPage";
import ResultsPage from "./pages/ResultsPage";
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <RecruitmentProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/apply" element={<ApplyPage />} />
              <Route path="/resume-analysis" element={<ResumeAnalysisPage />} />
              <Route path="/technical-test" element={<TechnicalTestPage />} />
              <Route path="/psychometric-test" element={<PsychometricTestPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </RecruitmentProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
