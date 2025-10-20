// Profile Page JavaScript - Simplified

/**
 * Initialize profile page functionality
 */
function initializeProfile() {
    console.log('Initializing profile page...');
    setupEditProfileModal();
    setupChangePasswordModal();
    setupPasswordToggle();
}

/**
 * Setup Edit Profile Modal functionality
 */
function setupEditProfileModal() {
    $('#saveProfileBtn').off('click').on('click', function() {
        var profileData = {
            name: $('#editName').val(),
            bio: $('#editBio').val(),
            email: $('#editEmail').val(),
            phone: $('#editPhone').val(),
            location: $('#editLocation').val(),
            website: $('#editWebsite').val()
        };

        // Validate form
        if (!validateProfileForm(profileData)) {
            return;
        }

        // Log data for future backend integration
        console.log('Profile Update Data:', profileData);

        // Update UI with new data
        updateProfileUI(profileData);
        $('#editProfileModal').modal('hide');
        showSuccessMessage('Profile updated successfully!');
    });
}

/**
 * Setup Change Password Modal functionality
 */
function setupChangePasswordModal() {
    $('#changePasswordBtn').off('click').on('click', function() {
        var passwordData = {
            currentPassword: $('#currentPassword').val(),
            newPassword: $('#newPassword').val(),
            confirmPassword: $('#confirmPassword').val()
        };

        // Validate password form
        if (!validatePasswordForm(passwordData)) {
            return;
        }

        // Log data for future backend integration
        console.log('Password Change Request');

        // Clear form and close modal
        $('#changePasswordForm')[0].reset();
        $('#changePasswordModal').modal('hide');
        showSuccessMessage('Password changed successfully!');
    });
}

/**
 * Setup password visibility toggle
 */
function setupPasswordToggle() {
    $('.toggle-password').off('click').on('click', function() {
        var targetId = $(this).data('target');
        var input = $('#' + targetId);
        var icon = $(this).find('i');

        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            input.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });
}

/**
 * Validate profile form data
 */
function validateProfileForm(data) {
    // Check required fields
    if (!data.name || data.name.trim() === '') {
        showErrorMessage('Name is required');
        return false;
    }

    if (!data.email || data.email.trim() === '') {
        showErrorMessage('Email is required');
        return false;
    }

    // Validate email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showErrorMessage('Please enter a valid email address');
        return false;
    }

    // Validate bio length
    if (data.bio && data.bio.length > 160) {
        showErrorMessage('Bio must be 160 characters or less');
        return false;
    }

    return true;
}

/**
 * Validate password form data
 */
function validatePasswordForm(data) {
    // Check if all fields are filled
    if (!data.currentPassword || !data.newPassword || !data.confirmPassword) {
        showErrorMessage('All password fields are required');
        return false;
    }

    // Check password length
    if (data.newPassword.length < 8) {
        showErrorMessage('New password must be at least 8 characters long');
        return false;
    }

    // Check if passwords match
    if (data.newPassword !== data.confirmPassword) {
        showErrorMessage('New passwords do not match');
        return false;
    }

    // Check password strength (basic)
    var hasUpperCase = /[A-Z]/.test(data.newPassword);
    var hasLowerCase = /[a-z]/.test(data.newPassword);
    var hasNumber = /[0-9]/.test(data.newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
        showErrorMessage('Password must contain uppercase, lowercase, and numbers');
        return false;
    }

    return true;
}

/**
 * Update profile UI with new data
 */
function updateProfileUI(data) {
    // Update profile header
    $('.profile-name').text(data.name);
    $('.profile-bio').text(data.bio || '');

    // Update profile information card
    $('.profile-info-item').each(function() {
        var label = $(this).find('.info-label span').text().toLowerCase();
        var valueElement = $(this).find('.info-value');
        
        if (label === 'email') {
            valueElement.text(data.email || 'Not provided');
        } else if (label === 'phone') {
            valueElement.text(data.phone || 'Not provided');
        } else if (label === 'location') {
            valueElement.text(data.location || 'Not provided');
        } else if (label === 'website') {
            valueElement.text(data.website || 'Not provided');
        }
    });

    // Update avatar with new name
    var avatar = $('.profile-avatar');
    var nameForAvatar = data.name.replace(' ', '+');
    avatar.attr('src', 'https://ui-avatars.com/api/?name=' + nameForAvatar + '&size=120&background=e91e63&color=fff&bold=true');
}

/**
 * Show success message
 */
function showSuccessMessage(message) {
    // Create alert element
    var alert = $(
        '<div class="alert alert-success alert-dismissible fade show position-fixed" role="alert" style="top: 100px; right: 20px; z-index: 9999; min-width: 300px; max-width: 400px;">' +
            '<i class="fas fa-check-circle me-2"></i>' + message +
            '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
        '</div>'
    );

    // Append to body
    $('body').append(alert);

    // Auto-dismiss after 3 seconds
    setTimeout(function() {
        alert.alert('close');
    }, 3000);
}

/**
 * Show error message
 */
function showErrorMessage(message) {
    // Create alert element
    var alert = $(
        '<div class="alert alert-danger alert-dismissible fade show position-fixed" role="alert" style="top: 100px; right: 20px; z-index: 9999; min-width: 300px; max-width: 400px;">' +
            '<i class="fas fa-exclamation-circle me-2"></i>' + message +
            '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
        '</div>'
    );

    // Append to body
    $('body').append(alert);

    // Auto-dismiss after 3 seconds
    setTimeout(function() {
        alert.alert('close');
    }, 3000);
}

// Make function globally available for route callbacks
window.initializeProfile = initializeProfile;