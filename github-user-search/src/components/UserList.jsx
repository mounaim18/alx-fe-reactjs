// src/components/UserList/UserList.jsx
import React from "react";
import "./UserList.css";
import UserCard from "./UserCard";

const UserList = ({ users, loadMore, hasMore, loading, error }) => {
  return (
    <div className="user-list-container">
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <div className="user-list">
        {users.length > 0 ? (
          users.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          !loading && <p>No users found. Try a different search!</p>
        )}
      </div>

      {loading && <div className="loading">Loading...</div>}

      {hasMore && !loading && (
        <div className="load-more-container">
          <button
            className="load-more-button"
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default UserList;
