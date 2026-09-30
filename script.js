// DOM selections and blog state (Commit 3)

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


// Custom form validation (Commit 4)

function validateForm() {
    let isValid = true;

    // Clear previous error messages
    titleError.textContent = "";
    contentError.textContent = "";

    // Validate title
    if (postTitle.value.trim() === "") {
        titleError.textContent = "Please enter a post title.";
        isValid = false;
    }

    // Validate content
    if (postContent.value.trim() === "") {
        contentError.textContent = "Please enter post content.";
        isValid = false;
    }

    return isValid;
}

// Test validation when the form is submitted
postForm.addEventListener("submit", function (event) {
    event.preventDefault();

    validateForm();
});