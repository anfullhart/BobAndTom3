import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/home";
import Entry from "./pages/entry";
import AdvancedSearch from "./pages/advancedSearch";
import AddBit from "./pages/addBit";
import LogIn from "./pages/login";
import AddToday from "./pages/addToday";
import CueSheet from "./pages/cueSheet";
import Results from "./pages/results";
import Excel from "./pages/excel";
import DetailedBitResults from "./pages/detailedBitResults";
import SearchMedia from "./pages/searchMedia";
import SearchRunSheet from "./pages/searchRunSheet";
import EditBit from "./pages/editBit";
import LogResults from "./pages/logResults";
import EditLog from "./pages/editLog";
import AddArtist from "./pages/addArtist";
import AdminDashboard from "./pages/adminDashboard";
import DetailedLogResults from "./pages/detailedLogResults";
import ProtectedRoute from "./pages/protectedRoute";
import RoleProtectedRoute from "./pages/roleProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Login is public */}
        <Route path="/login" element={<LogIn />} />

        {/* Home - any logged in user */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* ENTRY - ONLY admin & owner */}
        <Route
          path="/entry"
          element={
            <RoleProtectedRoute allowedRoles={["admin", "owner"]}>
              <Entry />
            </RoleProtectedRoute>
          }
        />

        {/* Search pages - available to all logged-in users */}
        <Route path="/advancedSearch" element={<ProtectedRoute><AdvancedSearch /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        <Route path="/searchMedia" element={<ProtectedRoute><SearchMedia /></ProtectedRoute>} />
        <Route path="/searchRunSheet" element={<ProtectedRoute><SearchRunSheet /></ProtectedRoute>} />
        <Route path="/detailedBitResults" element={<ProtectedRoute><DetailedBitResults /></ProtectedRoute>} />
        <Route path="/detailedLogResults" element={<ProtectedRoute><DetailedLogResults /></ProtectedRoute>} />
        {/* Other admin-level functionality (optional — restrict if needed) */}
        <Route path="/addBit" element={<ProtectedRoute><AddBit /></ProtectedRoute>} />
        <Route path="/addToday" element={<ProtectedRoute><AddToday /></ProtectedRoute>} />
        <Route path="/cueSheet" element={<RoleProtectedRoute allowedRoles={["admin", "owner"]}><CueSheet /></RoleProtectedRoute>} />
        <Route path="/excel" element={<ProtectedRoute><Excel /></ProtectedRoute>} />
                {/* Edit Bit - ONLY admin & owner */}
        <Route
          path="/editBit"
          element={
            <RoleProtectedRoute allowedRoles={["admin", "owner"]}>
              <EditBit />
            </RoleProtectedRoute>
          }
        />

        <Route path="/logResults" element={<ProtectedRoute><LogResults /></ProtectedRoute>} />
        <Route path="/editLog" element={<ProtectedRoute><EditLog /></ProtectedRoute>} />
        <Route path="/addArtist" element={<ProtectedRoute><AddArtist /></ProtectedRoute>} />

        {/* Admin dashboard - admin & owner only */}
        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRoles={["admin", "owner"]}>
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
