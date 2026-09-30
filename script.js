// DOM selections and blog state

// Select form elements
const postForm = document.getElementById("postForm");
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const submitButton = document.getElementById("submitButton");

// Select error message elements
const titleError = document.getElementById("titleError");
const contentError = document.getElementById("contentError");

// Select posts display container
const postsContainer = document.getElementById("postsContainer");

// Application state
let posts = [];

// Tracks the post currently being edited
let editingPostId = null;