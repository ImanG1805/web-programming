// Sample Blog Data
const blogsData = [
    {
        id: 1,
        title: "The Ultimate Guide to Morning Skincare Routine",
        excerpt: "Discover the perfect morning skincare routine that will leave your skin glowing all day long. Learn about cleansing, toning, and moisturizing techniques.",
        author: "Sarah Mitchell",
        date: "2024-10-15",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800",
        tags: ["morning routine", "skincare basics", "tips"]
    },
    {
        id: 2,
        title: "Top 5 Ingredients for Anti-Aging Skincare",
        excerpt: "Unlock the secrets to youthful skin with these scientifically-proven anti-aging ingredients that actually work.",
        author: "Sarah Mitchell",
        date: "2024-10-12",
        image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800",
        tags: ["anti-aging", "ingredients", "skincare science"]
    },
    {
        id: 3,
        title: "How to Build a Skincare Routine on a Budget",
        excerpt: "You don't need to break the bank for great skin. Learn how to create an effective skincare routine without spending a fortune.",
        author: "Sarah Mitchell",
        date: "2024-10-10",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
        tags: ["budget skincare", "affordable", "tips"]
    },
    {
        id: 4,
        title: "Understanding Your Skin Type: A Complete Guide",
        excerpt: "Identify your skin type and learn how to care for it properly with targeted products and techniques.",
        author: "Sarah Mitchell",
        date: "2024-10-08",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800",
        tags: ["skin types", "basics", "guide"]
    },
    {
        id: 5,
        title: "The Power of Double Cleansing: Why You Need It",
        excerpt: "Learn about the double cleansing method and why it's become a staple in Korean skincare routines worldwide.",
        author: "Sarah Mitchell",
        date: "2024-10-05",
        image: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=800",
        tags: ["cleansing", "korean skincare", "techniques"]
    },
    {
        id: 6,
        title: "Nighttime Skincare: The Best Time for Skin Repair",
        excerpt: "Maximize your skin's natural repair process with the perfect nighttime skincare routine.",
        author: "Sarah Mitchell",
        date: "2024-10-03",
        image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800",
        tags: ["night routine", "repair", "sleep"]
    },
    {
        id: 7,
        title: "Sunscreen 101: Everything You Need to Know",
        excerpt: "The ultimate guide to choosing and using sunscreen for maximum protection and healthy skin.",
        author: "Sarah Mitchell",
        date: "2024-10-01",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800",
        tags: ["sunscreen", "protection", "spf"]
    },
    {
        id: 8,
        title: "Dealing with Acne: A Comprehensive Approach",
        excerpt: "Understand the causes of acne and learn effective strategies to achieve clearer skin.",
        author: "Sarah Mitchell",
        date: "2024-09-28",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800",
        tags: ["acne", "treatment", "clear skin"]
    },
    {
        id: 9,
        title: "Hydration vs Moisture: Understanding the Difference",
        excerpt: "Learn the crucial difference between hydration and moisture, and why your skin needs both.",
        author: "Sarah Mitchell",
        date: "2024-09-25",
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800",
        tags: ["hydration", "moisture", "skincare science"]
    }
];

//state
let currentFilter = 'all';

function formatDate(dateString) {
    return dateString; 
}

function createBlogCard(blog) {
    const tags = blog.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('');
    
    return `
        <div class="col-md-6 col-lg-4">
            <div class="card blog-card">
                <img src="${blog.image}" class="blog-card-img" alt="${blog.title}">
                <div class="blog-card-body">
                    <div class="blog-tags">
                        ${tags}
                    </div>
                    <h3 class="blog-card-title">${blog.title}</h3>
                    <p class="blog-card-excerpt">${blog.excerpt}</p>
                    <div class="blog-meta">
                        <div class="blog-author">
                            <i class="fas fa-user-circle"></i>
                            <span>${blog.author}</span>
                        </div>
                        <span><i class="far fa-calendar"></i> ${formatDate(blog.date)}</span>
                    </div>
                    <a href="#blog" class="btn btn-read-more">
                        Read More <i class="fas fa-arrow-right ms-2"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Filter blogs using jQuery
function getFilteredBlogs() {
    let filtered = blogsData.slice();
    
    // Apply tag filter
    if (currentFilter !== 'all') {
        // Using jQuery.grep for filtering by tag
        filtered = $.grep(filtered, function(blog) {
            const lowerCaseTags = $.map(blog.tags, function(tag) { return tag.toLowerCase(); });
            return $.inArray(currentFilter.toLowerCase(), lowerCaseTags) !== -1;
        });
    }
    
    return filtered;
}

function renderBlogs() {
    const $blogContainer = $('#blogContainer');
    const $noResults = $('#noResults');
    const filteredBlogs = getFilteredBlogs();
    
    if (filteredBlogs.length === 0) {
        $blogContainer.empty();
        $noResults.show();
    } else {
        $noResults.hide();
        const blogsHtml = $.map(filteredBlogs, function(blog) {
            return createBlogCard(blog);
        }).join('');
        $blogContainer.html(blogsHtml);
    }
    
    // reattaching because of spa
    attachFilterHandlers();
}

// Function to attach/re-attach event handlers
function attachFilterHandlers() {
    // Filter functionality using jQuery
    $('.filter-btn').off('click').on('click', function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        currentFilter = $(this).data('filter');
        renderBlogs();
    });
}

$(document).ready(function() {
    renderBlogs();
    attachFilterHandlers();
});