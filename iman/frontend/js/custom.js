$(document).ready(function() {
    var app = $.spapp({
        defaultView: 'landing-page',
        templateDir: './views/', 
    });

    app.route({
        view : 'landing-page',
        load : 'landing-page.html',
        onReady: function() {
            if (typeof renderBlogs === 'function') {
                renderBlogs();
            } else {
                console.error("renderBlogs function not found. Ensure landing.js is loaded.");
            }
        }
    });

    app.route({
        view: 'blog',
        load: 'blog.html',
        onReady: function() {
            if (typeof initializeBlog === 'function') {
                initializeBlog();
            } else {
                console.error("initializeBlog function not found");
            }
        }
    });

    app.route({
        view: 'my-blogs',
        load: 'my-blogs.html',
        onReady: function() {
            if (typeof initializeMyBlogs === 'function') {
                initializeMyBlogs();
            } else {
                console.error("initializeMyBlogs function not found");
            }
        }
    });

    app.route({
        view: 'profile',
        load: 'profile.html',
        onReady: function() {
            // Initialize profile page functionality
            if (typeof initializeProfile === 'function') {
                initializeProfile();
            } else {
                console.error("initializeProfile function not found");
            }
        }
    });

    app.route({
        view: 'login',
        load: 'login.html',
        onReady: function() {
            if (typeof initializeLogin === 'function') {
                initializeLogin();
            } else {
                console.error("initializeLogin function not found");
            }
        }
    });

    app.route({
        view: 'signup',
        load: 'signup.html',
        onReady: function() {
            if (typeof initializeSignup === 'function') {
                initializeSignup();
            } else {
                console.error("initializeSignup function not found");
            }
        }
    });

    app.run();
});