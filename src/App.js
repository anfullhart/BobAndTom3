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
import EditAlbum from "./pages/editAlbum";
import EditBit from "./pages/editBit";
import LogResults from "./pages/logResults";
import EditLog from "./pages/editLog";
import EditCelebrity from "./pages/editCelebrity";
import EditSeason from "./pages/editSeason";
import EditSport from "./pages/editSport";
import EditSubject from "./pages/editSubject";
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
        <Route path="/addToday" element={<RoleProtectedRoute allowedRoles={["admin", "owner"]}><AddToday /></RoleProtectedRoute>} />
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
        <Route path="/editLog" element={<RoleProtectedRoute allowedRoles={["admin", "owner"]}><EditLog /></RoleProtectedRoute>} />
        <Route path="/addArtist" element={<RoleProtectedRoute allowedRoles={["admin", "owner"]}><AddArtist /></RoleProtectedRoute>} />
        <Route path="/editCelebrity" element={<RoleProtectedRoute allowedRoles={["admin", "owner"]}><EditCelebrity /></RoleProtectedRoute>} />
        <Route path="/editSeason" element={<RoleProtectedRoute allowedRoles={["admin", "owner"]}><EditSeason /></RoleProtectedRoute>} />
        <Route path="/editSport" element={<RoleProtectedRoute allowedRoles={["admin", "owner"]}><EditSport /></RoleProtectedRoute>} />
        <Route path="/editSubject" element={<RoleProtectedRoute allowedRoles={["admin", "owner"]}><EditSubject /></RoleProtectedRoute>} />
        <Route path="/editAlbum" element={<RoleProtectedRoute allowedRoles={["admin", "owner"]}><EditAlbum /></RoleProtectedRoute>} />

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
