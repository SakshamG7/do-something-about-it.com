(function () {
  // Polyfill for Promise (for older browsers)
  if (typeof Promise === "undefined") {
    window.Promise = function (executor) {
      var resolveCallbacks = [];
      var rejectCallbacks = [];
      var state = "pending";
      var value;

      function resolve(result) {
        if (state !== "pending") return;
        state = "fulfilled";
        value = result;
        setTimeout(function () {
          resolveCallbacks.forEach(function (callback) {
            callback(value);
          });
        }, 0);
      }

      function reject(reason) {
        if (state !== "pending") return;
        state = "rejected";
        value = reason;
        setTimeout(function () {
          rejectCallbacks.forEach(function (callback) {
            callback(value);
          });
        }, 0);
      }

      this.then = function (onFulfilled, onRejected) {
        return new Promise(function (resolveNext, rejectNext) {
          function handleCallback(callback, resolveNext, rejectNext) {
            try {
              var result = callback(value);
              resolveNext(result);
            } catch (err) {
              rejectNext(err);
            }
          }

          if (state === "fulfilled") {
            handleCallback(onFulfilled, resolveNext, rejectNext);
          } else if (state === "rejected") {
            if (onRejected) {
              handleCallback(onRejected, resolveNext, rejectNext);
            } else {
              rejectNext(value);
            }
          } else {
            resolveCallbacks.push(function (value) {
              handleCallback(onFulfilled, resolveNext, rejectNext);
            });
            rejectCallbacks.push(function (value) {
              if (onRejected) {
                handleCallback(onRejected, resolveNext, rejectNext);
              } else {
                rejectNext(value);
              }
            });
          }
        });
      };

      this.catch = function (onRejected) {
        return this.then(null, onRejected);
      };

      try {
        executor(resolve, reject);
      } catch (err) {
        reject(err);
      }
    };
  }

  // Fallback for DOMContentLoaded
  function onDocumentReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  onDocumentReady(function () {
    // Optimized WebP check function using a data URI for faster performance
    function checkWebPSupport() {
      return new Promise(function (resolve) {
        var img = new Image();
        img.onload = img.onerror = function () {
          resolve(img.width === 1);
        };
        img.src =
          "data:image/webp;base64,UklGRhYAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSAIAAAARAAAAUQAA";
      });
    }

    // Single function to update <img> tags and the banner background
    function updateImagesBasedOnSupport(isSupported) {
      // Update <img> tags
      var images = document.querySelectorAll('img[src$=".webp"]');
      for (var i = 0; i < images.length; i++) {
        var img = images[i];
        if (!isSupported) {
          img.src = img.src.replace(".webp", ".jpg");
        }
      }

      // Update banner background
      var banner = document.querySelector(".banner");
      if (banner) {
        banner.style.backgroundImage =
          'url("images/earth banner.' + (isSupported ? "webp" : "jpg") + '")';
      }
    }

    // Run WebP support check and update images
    checkWebPSupport().then(updateImagesBasedOnSupport);
  });
})();
