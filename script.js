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


// localStorage data persistence (Commit 7)

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function loadPosts() {
    const savedPosts = localStorage.getItem("posts");

    if (savedPosts) {
        posts = JSON.parse(savedPosts);
    }
}


postForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const newPost = {
        id: Date.now(),
        title: postTitle.value.trim(),
        content: postContent.value.trim(),
        timestamp: new Date().toLocaleString()
    };

    posts.push(newPost);

    savePosts();

    renderPosts();

    console.log(posts);

    postForm.reset();

    titleError.textContent = "";
    contentError.textContent = "";
});


loadPosts();
renderPosts();


// Render blog posts dynamically (Commit 6)

function renderPosts() {
    // Clear current posts before re-rendering
    postsContainer.innerHTML = "";

    // Show a message if there are no posts
    if (posts.length === 0) {
        postsContainer.innerHTML = "<p>No posts yet.</p>";
        return;
    }

    // Create and display each post
    posts.forEach(function (post) {
        const postElement = document.createElement("article");

        postElement.classList.add("blog-post");

        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small>${post.timestamp}</small>

            <div class="post-actions">
                <button class="edit-button" data-id="${post.id}">
                    Edit
                </button>

                <button class="delete-button" data-id="${post.id}">
                    Delete
                </button>
            </div>
        `;

        postsContainer.appendChild(postElement);
    });
}