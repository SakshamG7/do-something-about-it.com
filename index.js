document.addEventListener("DOMContentLoaded", function () {
    // Optimized WebP check function using a data URI for faster performance
    function checkWebPSupport() {
        return new Promise(function (resolve) {
            const img = new Image();
            img.onload = img.onerror = function () {
                resolve(img.width === 1);
            };
            img.src = 'data:image/webp;base64,UklGRhYAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSAIAAAARAAAAUQAA';
        });
    }

    // Single function to update <img> tags and the banner background
    function updateImagesBasedOnSupport(isSupported) {
        // Update <img> tags
        document.querySelectorAll('img[src$=".webp"]').forEach(img => {
            if (!isSupported) {
                img.src = img.src.replace('.webp', '.jpg');
            }
        });

        // Update banner background
        const banner = document.querySelector('.banner');
        if (banner) {
            banner.style.backgroundImage = `url("images/earth banner.${isSupported ? 'webp' : 'jpg'}")`;
        }
    }

    // Run WebP support check and update images
    checkWebPSupport().then(updateImagesBasedOnSupport);
});
