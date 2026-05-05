import React, { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState("all");

  // Fetch Data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Search + Filter Logic
  useEffect(() => {
    let temp = posts;

    if (search) {
      temp = temp.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (userId !== "all") {
      temp = temp.filter((post) => post.userId === Number(userId));
    }

    setFilteredPosts(temp);
  }, [search, userId, posts]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📘 Post Dashboard</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "10px",
        }}
      />

      {/* Filter */}
      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ padding: "10px", marginBottom: "20px" }}
      >
        <option value="all">All Users</option>
        {[...Array(10)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            User {i + 1}
          </option>
        ))}
      </select>

      {/* States */}
      {loading && <p>⏳ Loading...</p>}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {/* Posts */}
      {!loading && !error && (
        <div>
          {filteredPosts.length === 0 ? (
            <p>No posts found</p>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                style={{
                  border: "1px solid #ccc",
                  margin: "10px 0",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <small>User ID: {post.userId}</small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;