document.addEventListener("DOMContentLoaded", function () {
    // Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to handle animations
    function handleAnimations() {
        const animatedElements = document.querySelectorAll(".animated");
        
        animatedElements.forEach(function (element) {
            if (isInViewport(element)) {
                element.classList.add("fadeInUp");
            }
        });
    }

    // Initial check on page load
    handleAnimations();

    // Check for animations on scroll
    window.addEventListener("scroll", function () {
        handleAnimations();
    });
});
