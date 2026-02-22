import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Nav,
  Bars,
  NavMenu,
  StyledNavButton,
  LogoutButton
} from "./navbarElements";

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);

  const location = useLocation();

  const syncAuth = () => {
    const auth = localStorage.getItem("isAuthenticated") === "true";

    let storedRole = null;
    let storedUsername = null;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      storedRole = user?.role || null;
      storedUsername = user?.username || null;
    } catch (err) {}

    setIsAuthenticated(auth);
    setRole(storedRole);
    setUsername(storedUsername);
  };

  useEffect(() => {
    syncAuth();
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    window.location.href = "/login";
  };

  const isAdmin = role === "admin" || role === "owner";

  // 🔥 Hide navbar on login page
  if (location.pathname === "/login") return null;

  return (
    <Nav>
      <Bars />
      <NavMenu style={{ justifyContent: "space-between" }}>

        {/* LEFT SIDE */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <a
            href="https://www.bobandtom.com"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://media-cdn.socastsrm.com/uploads/station/3397/fbShare.png?r=84568"
              alt="BOB & TOM"
              style={{ paddingLeft: "10px", width: "130px" }}
            />
          </a>

          {isAuthenticated && (
            <StyledNavButton to="/">Search</StyledNavButton>
          )}

          {isAuthenticated && isAdmin && (
            <StyledNavButton to="/entry">Entry</StyledNavButton>
          )}

          {isAuthenticated && isAdmin && (
            <StyledNavButton to="/cueSheet">Cue Sheet</StyledNavButton>
          )}

          {isAuthenticated && isAdmin && (
            <StyledNavButton to="/admin">Admin</StyledNavButton>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {isAuthenticated && username && (
            <span style={{ color: "white", fontWeight: "bold" }}>
              Welcome, {username}
            </span>
          )}

          {!isAuthenticated ? (
            <StyledNavButton to="/login">Login</StyledNavButton>
          ) : (
            <LogoutButton onClick={handleLogout}>
              Logout
            </LogoutButton>
          )}
        </div>

      </NavMenu>
    </Nav>
  );
};

export default NavBar;
