// DOM selections and application state

const postForm = document.getElementById("postForm");
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const submitButton = document.getElementById("submitButton");

const titleError = document.getElementById("titleError");
const contentError = document.getElementById("contentError");

const postsContainer = document.getElementById("postsContainer");

let posts = [];
let editingPostId = null;


// Form validation

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


// Render posts dynamically

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
                <button
                    type="button"
                    class="edit-button"
                    data-id="${post.id}"
                    aria-label="Edit ${post.title}"
                >
                    Edit
                </button>

                <button
                    type="button"
                    class="delete-button"
                    data-id="${post.id}"
                    aria-label="Delete ${post.title}"
                >
                    Delete
                </button>
            </div>
        `;

        postsContainer.appendChild(postElement);
    });
}


// localStorage helpers

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function loadPosts() {
    const savedPosts = localStorage.getItem("posts");

    if (savedPosts) {
        posts = JSON.parse(savedPosts);
    }
}


// Create or update blog posts

postForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Stop submission if either required field is empty
    if (!validateForm()) {
        return;
    }

    if (editingPostId !== null) {
        const postToUpdate = posts.find(function (post) {
            return post.id === editingPostId;
        });

        if (postToUpdate) {
            postToUpdate.title = postTitle.value.trim();
            postToUpdate.content = postContent.value.trim();
            postToUpdate.timestamp =
                "Updated: " + new Date().toLocaleString();
        }

        editingPostId = null;
        submitButton.textContent = "Add Post";
    } else {
        const newPost = {
            id: Date.now(),
            title: postTitle.value.trim(),
            content: postContent.value.trim(),
            timestamp: new Date().toLocaleString()
        };

        posts.push(newPost);
    }

    savePosts();
    renderPosts();

    postForm.reset();

    titleError.textContent = "";
    contentError.textContent = "";
});


// Edit and delete post events

postsContainer.addEventListener("click", function (event) {
    const postId = Number(event.target.dataset.id);

    // Delete post
    if (event.target.classList.contains("delete-button")) {
        posts = posts.filter(function (post) {
            return post.id !== postId;
        });

        savePosts();
        renderPosts();
    }

    // Edit post
    if (event.target.classList.contains("edit-button")) {
        const postToEdit = posts.find(function (post) {
            return post.id === postId;
        });

        if (postToEdit) {
            postTitle.value = postToEdit.title;
            postContent.value = postToEdit.content;

            editingPostId = postToEdit.id;

            submitButton.textContent = "Update Post";

            titleError.textContent = "";
            contentError.textContent = "";

            postForm.scrollIntoView({
                behavior: "smooth"
            });

            postTitle.focus();
        }
    }
});


// Load saved posts when the page opens

loadPosts();
renderPosts();