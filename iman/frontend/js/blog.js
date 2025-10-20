var commentsData = [
    {
        id: 1,
        author: "Emma Wilson",
        text: "This routine completely transformed my skin! The vitamin C serum made such a difference.",
        date: "2024-10-20",
        timeAgo: "2 days ago"
    },
    {
        id: 2,
        author: "Jessica Brown",
        text: "I never realized how important toner was until I started using it regularly. Great tips!",
        date: "2024-10-15",
        timeAgo: "1 week ago"
    },
    {
        id: 3,
        author: "Mike Davis",
        text: "As someone new to skincare, this guide was incredibly helpful. Thank you!",
        date: "2024-10-10",
        timeAgo: "2 weeks ago"
    }
];

function initializeBlog() {
    console.log('Initializing blog page...');
    setupCommentModal();
    loadComments();
}

function setupCommentModal() {
    $('#submitComment').on('click', function() {
        var commentText = $('#commentText').val().trim();
        
        if (!commentText) {
            alert('Please write a comment before submitting.');
            return;
        }
        
        var newComment = {
            id: commentsData.length + 1,
            author: "Current User",
            text: commentText,
            date: new Date().toLocaleDateString(),
            timeAgo: "Just now"
        };
        
        commentsData.unshift(newComment);
        
        loadComments();
        
        console.log('New comment submitted:', newComment);
        
        showCommentSuccess();

        $('#commentText').val('');
        $('#commentModal').modal('hide');
    });
    
    $('#commentModal').on('hidden.bs.modal', function() {
        $('#commentText').val('');
    });
}

function loadComments() {
    var commentsContainer = $('#commentsContainer');
    var commentCount = $('#commentCount');
    
    commentCount.text(commentsData.length);
    
    if (commentsData.length === 0) {
        commentsContainer.html(`
            <div class="text-center py-4 text-muted">
                <i class="fas fa-comments fa-2x mb-3"></i>
                <p>No comments yet. Be the first to comment!</p>
            </div>
        `);
        return;
    }

    var commentsHtml = commentsData.map(function(comment) {
        return `
            <div class="col-12 mb-3" data-comment-id="${comment.id}">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start mb-2">
                            <div class="fw-bold mb-1 mb-md-0">${comment.author}</div>
                            <small class="text-muted">${comment.timeAgo}</small>
                        </div>
                        <p class="mb-0">${comment.text}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    commentsContainer.html(`
        <div class="row g-3">
            ${commentsHtml}
        </div>
    `);
}

function addCommentToBackend(commentText) {
    console.log('Saving comment to backend:', commentText);
}

function showCommentSuccess() {
    var alert = $(
        '<div class="alert alert-success alert-dismissible fade show position-fixed" style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">' +
            'Comment submitted successfully!' +
            '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>' +
        '</div>'
    );

    $('body').append(alert);

    setTimeout(function() {
        alert.alert('close');
    }, 3000);
}

window.initializeBlog = initializeBlog;
window.loadComments = loadComments;
window.addCommentToBackend = addCommentToBackend;