// DOM selections and blog state (Commit 3)

const postForm = document.getElementById("postForm");
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const submitButton = document.getElementById("submitButton");

const titleError = document.getElementById("titleError");
const contentError = document.getElementById("contentError");

const postsContainer = document.getElementById("postsContainer");

let posts = [];
let editingPostId = null;


// Custom form validation (Commit 4)

function validateForm() {
    let isValid = true;

    titleError.textContent = "";
    contentError.textContent = "";

    if (postTitle.value.trim() === "") {
        titleError.textContent = "Please enter a post title.";
        isValid = false;
    }

    if (postContent.value.trim() === "") {
        contentError.textContent = "Please enter post content.";
        isValid = false;
    }

    return isValid;
}


// Render blog posts dynamically (Commit 6)

function renderPosts() {
    postsContainer.innerHTML = "";

    if (posts.length === 0) {
        postsContainer.innerHTML = "<p>No posts yet.</p>";
        return;
    }

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


// Add new blog post functionality (Commit 5)

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


// Delete post functionality (Commit 8)

postsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
        const postId = Number(event.target.dataset.id);

        posts = posts.filter(function (post) {
            return post.id !== postId;
        });

        savePosts();
        renderPosts();
    }
});


// Load saved posts when the page opens

loadPosts();
renderPosts();