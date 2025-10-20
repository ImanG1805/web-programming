function initializeLogin() {
    console.log('Initializing login page...');
    setupLoginForm();
    updateNavbar(true);
}

function initializeSignup() {
    console.log('Initializing signup page...');
    setupSignupForm();
    updateNavbar(true);
}

function setupLoginForm() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
    
        setLoggedInState(true);
        window.location.hash = 'landing-page';
    });
}

function setupSignupForm() {
    $('#signupForm').on('submit', function(e) {
        e.preventDefault();
        
        setLoggedInState(true);
        window.location.hash = 'landing-page';
    });
}

function updateNavbar(isLoggedIn) {
    var myBlogsTab = $('a[href="#my-blogs"]').parent();
    var profileTab = $('a[href="#profile"]').parent();
    
    if (isLoggedIn) {
        myBlogsTab.show();
        profileTab.show();
    } else {
        myBlogsTab.hide();
        profileTab.hide();
    }
}

function setLoggedInState(isLoggedIn) {
    window.isUserLoggedIn = isLoggedIn;
    updateNavbar(isLoggedIn);
}

function checkLoginState() {
    var isLoggedIn = window.isUserLoggedIn || false;
    updateNavbar(isLoggedIn);
}

window.initializeLogin = initializeLogin;
window.initializeSignup = initializeSignup;
window.updateNavbar = updateNavbar;
window.setLoggedInState = setLoggedInState;
window.checkLoginState = checkLoginState;