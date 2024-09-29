// Function to check if the browser supports WebP format
function checkWebPSupport(callback) {
    // Create a canvas element to test WebP support
    const canvas = document.createElement('canvas');

    // Try encoding an image to WebP format and check the result
    const isWebPSupported = canvas.toDataURL('image/webp').startsWith('data:image/webp');

    // Call the callback function with the result
    callback(isWebPSupported);
}

// Function to replace all .webp extensions in <img> tags with .jpg
function replaceWebPWithJpg() {
    // Get all <img> tags on the page
    const images = document.querySelectorAll('img');

    // Loop through each image and replace .webp with .jpg in the src attribute
    images.forEach(img => {
        if (img.src.endsWith('.webp')) {
            img.src = img.src.replace('.webp', '.jpg');
        }
    });
}

// Run the WebP support check
checkWebPSupport(function(isSupported) {
    // If WebP is not supported, replace .webp images with .jpg
    if (!isSupported) {
        replaceWebPWithJpg();
    }
});
