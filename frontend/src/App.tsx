import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LeadsPage from './pages/LeadsPage';
import CreateLeadPage from './pages/CreateLeadPage';
import EditLeadPage from './pages/EditLeadPage';
import LeadDetailPage from './pages/LeadDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/"                    element={<Navigate to="/leads" replace />} />
            <Route path="/leads"               element={<LeadsPage />} />
            <Route path="/leads/new"           element={<CreateLeadPage />} />
            <Route path="/leads/:id"           element={<LeadDetailPage />} />
            <Route path="/leads/:id/edit"      element={<EditLeadPage />} />
            <Route path="*"                    element={<Navigate to="/leads" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
