import { useState, useEffect, useRef } from "react";

function TopHeader({
  notificationList,
  markAsRead,
  currentPage
}) {
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const [showProfileDropdown, setShowProfileDropdown] =
    useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotificationDropdown(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="top-header">
      <div className="header-left">
        <h2>{currentPage}</h2>
      </div>

      <div className="header-right">

        {/* 🔔 Notification */}
        <div
          className="notification-wrapper"
          ref={notificationRef}
        >
          <div
            className="notification-bell"
            onClick={() =>
              setShowNotificationDropdown(
                !showNotificationDropdown
              )
            }
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/></svg>
            {notificationList.length > 0 && (
              <span className="notification-badge">
                {notificationList.length}
              </span>
            )}
          </div>

          {showNotificationDropdown && (
            <div className="notification-dropdown">
              {notificationList.length === 0 && (
                <p>No notifications</p>
              )}

              {notificationList.map((alert) => (
                <div
                  key={alert._id}
                  className="dropdown-item"
                  onClick={() => markAsRead(alert)}
                >
                  <strong>
                    {alert.details?.typeDescription}
                  </strong>
                  <p>
                    {alert.driver?.firstName}{" "}
                    {alert.driver?.lastName}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 👤 Profile */}
        <div className="profile-wrapper" ref={profileRef}>
          <div
            className="profile-avatar"
            onClick={() =>
              setShowProfileDropdown(!showProfileDropdown)
            }
          >
            A
          </div>

          {showProfileDropdown && (
            <div className="profile-dropdown">
              <div
                className="profile-item"
                onClick={() => alert("Logout Executed")}
              >
                Logout
              </div>
              {/* <div
                className="profile-item"
                onClick={() => alert("Link 2 clicked")}
              >
                Link 2
              </div>
              <div
                className="profile-item"
                onClick={() => alert("Link 3 clicked")}
              >
                Link 3
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopHeader;