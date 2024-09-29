// Function to check if the browser supports WebP format
function checkWebPSupport(callback) {
    // Create a canvas element to test WebP support
    const canvas = document.createElement('canvas');

    // Check if the browser can encode an image to WebP format
    const isWebPSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;

    // Call the callback function with the result
    callback(isWebPSupported);
}

// Define the URL to redirect to if WebP is not supported
const fallbackURL = 'https://old.do-something-about-it.com';

// Run the WebP support check
checkWebPSupport(function(isSupported) {
    // If WebP is not supported, redirect the user to the fallback URL
    if (!isSupported) {
        window.location.href = fallbackURL;
    }
});
