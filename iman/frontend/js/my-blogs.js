var userBlogsData = [
    {
        id: 1,
        title: "My Morning Skincare Journey",
        description: "Sharing my personal experience with developing the perfect morning routine for combination skin.",
        author: "Sarah Johnson",
        date: "2024-10-18",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800",
        tags: ["personal", "morning routine", "combination skin"]
    },
    {
        id: 2,
        title: "Affordable Skincare Finds",
        description: "Discovering amazing drugstore products that deliver luxury results without the high price tag.",
        author: "Sarah Johnson",
        date: "2024-10-12",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
        tags: ["budget", "drugstore", "affordable"]
    }
];

function initializeMyBlogs() {
    console.log('Initializing My Blogs page...');
    setupBlogModals();
    loadUserBlogs();
}

function setupBlogModals() {
    $('#saveBlogBtn').on('click', function() {
        var blogId = $(this).data('blog-id');
        var title = $('#blogTitle').val().trim();
        var description = $('#blogDescription').val().trim();
        var image = $('#blogImage').val().trim();
        var tags = $('#blogTags').val().trim();
        
        if (!title || !description || !image) {
            alert('Please fill in all required fields.');
            return;
        }
        
        var tagsArray = tags ? tags.split(',').map(function(tag) { return tag.trim(); }) : [];
        
        if (blogId) {
            updateBlog(blogId, title, description, image, tagsArray);
        } else {
            addNewBlog(title, description, image, tagsArray);
        }
        
        $('#blogModal').modal('hide');
    });

    $('#confirmDeleteBtn').on('click', function() {
        var blogId = $(this).data('blog-id');
        deleteBlog(blogId);
        $('#deleteModal').modal('hide');
    });
    
    $('#addBlogBtn').on('click', function() {
        resetBlogForm();
        $('#blogModalTitle').text('Add New Blog');
        $('#saveBlogBtn').text('Save Blog').removeData('blog-id');
    });
    
    $('#blogModal').on('hidden.bs.modal', function() {
        resetBlogForm();
    });
}

function loadUserBlogs() {
    var blogsContainer = $('#blogsContainer');
    var noBlogs = $('#noBlogs');
    
    if (userBlogsData.length === 0) {
        blogsContainer.hide();
        noBlogs.show();
        return;
    }
    
    noBlogs.hide();
    blogsContainer.show();
    
    var blogsHtml = userBlogsData.map(function(blog) {
        var tagsHtml = blog.tags.map(function(tag) {
            return '<span class="badge bg-light text-dark me-1">' + tag + '</span>';
        }).join('');
        
        return `
            <div class="col-md-6 col-lg-4" data-blog-id="${blog.id}">
                <div class="card blog-management-card shadow-sm">
                    <img src="${blog.image}" class="blog-management-img" alt="${blog.title}">
                    <div class="card-body blog-management-body">
                        <h5 class="card-title">${blog.title}</h5>
                        <p class="card-text text-muted">${blog.description}</p>
                        <div class="mb-3">
                            ${tagsHtml}
                        </div>
                        <div class="blog-management-actions d-flex gap-2 flex-wrap">
                            <a href="#blog" class="btn btn-outline-success btn-sm btn-action view-blog" data-blog-id="${blog.id}">
                                <i class="fas fa-eye me-1"></i>View
                            </a>
                            <button class="btn btn-outline-primary btn-sm btn-action edit-blog" data-blog-id="${blog.id}">
                                <i class="fas fa-edit me-1"></i>Edit
                            </button>
                            <button class="btn btn-outline-danger btn-sm btn-action delete-blog" data-blog-id="${blog.id}">
                                <i class="fas fa-trash me-1"></i>Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    blogsContainer.html(blogsHtml);
    
    //attach event handler
    $('.view-blog').on('click', function() {
        var blogId = $(this).data('blog-id');
        console.log('Viewing blog with ID:', blogId);
    });
    
    $('.edit-blog').on('click', function() {
        var blogId = $(this).data('blog-id');
        editBlog(blogId);
    });
    
    $('.delete-blog').on('click', function() {
        var blogId = $(this).data('blog-id');
        confirmDelete(blogId);
    });
}

function addNewBlog(title, description, image, tags) {
    var newId = userBlogsData.length + 1
    
    var newBlog = {
        id: newId,
        title: title,
        description: description,
        author: "Sarah Johnson",
        date: new Date().toLocaleDateString(),
        image: image,
        tags: tags
    };
    
    userBlogsData.push(newBlog);
    console.log('Adding new blog:', newBlog);
    loadUserBlogs();
    showMessage('Blog created successfully!', 'success');
}

function editBlog(blogId) {
    var blog = userBlogsData.find(function(b) { return b.id == blogId; });
    if (!blog) return;
    
    $('#blogTitle').val(blog.title);
    $('#blogDescription').val(blog.description);
    $('#blogImage').val(blog.image);
    $('#blogTags').val(blog.tags.join(', '));
    
    $('#blogModalTitle').text('Edit Blog');
    $('#saveBlogBtn').text('Update Blog').data('blog-id', blogId);
    $('#blogModal').modal('show');
}

function updateBlog(blogId, title, description, image, tags) {
    var blogIndex = userBlogsData.findIndex(function(b) { return b.id == blogId; });
    if (blogIndex === -1) return;
    
    userBlogsData[blogIndex].title = title;
    userBlogsData[blogIndex].description = description;
    userBlogsData[blogIndex].image = image;
    userBlogsData[blogIndex].tags = tags;
    
    console.log('Updating blog:', userBlogsData[blogIndex]);
    loadUserBlogs();
    showMessage('Blog updated successfully!', 'success');
}

function confirmDelete(blogId) {
    var blog = userBlogsData.find(function(b) { return b.id == blogId; });
    if (!blog) return;
    
    $('#deleteBlogTitle').text(blog.title);
    $('#confirmDeleteBtn').data('blog-id', blogId);
    $('#deleteModal').modal('show');
}

function deleteBlog(blogId) {
    var blogIndex = userBlogsData.findIndex(function(b) { return b.id == blogId; });
    if (blogIndex === -1) return;
    
    console.log('Deleting blog:', userBlogsData[blogIndex]);
    userBlogsData.splice(blogIndex, 1);

    $('[data-blog-id="' + blogId + '"]').remove();
    
    loadUserBlogs();
    showMessage('Blog deleted successfully!', 'success');
}

function resetBlogForm() {
    $('#blogTitle').val('');
    $('#blogDescription').val('');
    $('#blogImage').val('');
    $('#blogTags').val('');
}

function showMessage(message, type) {
    var alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
    var alert = $(
        '<div class="alert ' + alertClass + ' alert-dismissible fade show position-fixed" style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">' +
            message +
            '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>' +
        '</div>'
    );

    $('body').append(alert);

    setTimeout(function() {
        alert.alert('close');
    }, 3000);
}

window.initializeMyBlogs = initializeMyBlogs;
window.loadUserBlogs = loadUserBlogs;