// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeGreeting();
    initializeThemeToggle();
    initializeReadMore();
    initializeEditFeature();
    initializeAnimations();
});

// Greeting Message Functionality
function initializeGreeting() {
    const greetings = [
        "Welcome to my CV!",
        "Hello there!",
        "Great to see you!",
        "Welcome aboard!",
        "Nice to meet you!"
    ];
    
    // Get user's name
    let userName = prompt("What's your name?");
    if (!userName || userName.trim() === "") {
        userName = "Visitor";
    }
    
    // Get current time for time-based greeting
    const currentHour = new Date().getHours();
    let timeGreeting = "";
    
    if (currentHour < 12) {
        timeGreeting = "Good Morning";
    } else if (currentHour < 17) {
        timeGreeting = "Good Afternoon";
    } else if (currentHour < 21) {
        timeGreeting = "Good Evening";
    } else {
        timeGreeting = "Good Night";
    }
    
    // Combine time greeting with random welcome message
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    const fullGreeting = `${timeGreeting}, ${userName}! ${randomGreeting}`;
    
    // Display greeting
    const greetingElement = document.getElementById('greetingText');
    if (greetingElement) {
        greetingElement.textContent = fullGreeting;
        
        // Auto-hide greeting after 5 seconds
        setTimeout(() => {
            const greetingContainer = document.getElementById('greeting');
            if (greetingContainer) {
                greetingContainer.style.transform = 'translateX(-100%)';
                greetingContainer.style.opacity = '0';
                setTimeout(() => {
                    greetingContainer.style.display = 'none';
                }, 500);
            }
        }, 5000);
    }
}

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.className = 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Update icon
        if (body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
            
            // Add transition effect
            themeToggle.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'rotate(0deg)';
            }, 300);
        } else {
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
            
            // Add transition effect
            themeToggle.style.transform = 'rotate(-180deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'rotate(0deg)';
            }, 300);
        }
    });
}

// Read More Functionality
function initializeReadMore() {
    const readMoreBtn = document.getElementById('readMoreBtn');
    const hiddenSkills = document.querySelectorAll('.hidden-skills');
    let isExpanded = false;
    
    readMoreBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;
        
        hiddenSkills.forEach(skill => {
            if (isExpanded) {
                skill.classList.remove('hidden-skills');
                skill.style.animation = 'fadeInUp 0.3s ease-out';
            } else {
                skill.classList.add('hidden-skills');
            }
        });
        
        // Update button text with animation
        readMoreBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            readMoreBtn.textContent = isExpanded ? 'Read Less' : 'Read More';
            readMoreBtn.style.transform = 'scale(1)';
        }, 150);
    });
}

// Edit Feature for Skills and Courses
function initializeEditFeature() {
    const editBtn = document.getElementById('editBtn');
    const coursesList = document.getElementById('coursesList');
    const skillsList = document.getElementById('skillsList');
    let isEditing = false;
    
    editBtn.addEventListener('click', function() {
        isEditing = !isEditing;
        
        if (isEditing) {
            // Enable editing mode
            coursesList.style.border = '2px dashed var(--primary-color)';
            coursesList.style.background = 'var(--surface-color)';
            
            // Make skill items editable
            const skillItems = skillsList.querySelectorAll('.skill-item:not(.hidden-skills)');
            skillItems.forEach(item => {
                item.contentEditable = true;
                item.style.border = '1px dashed var(--primary-color)';
                item.style.cursor = 'text';
            });
            
            // Update button
            editBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
            editBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            
            // Add instructions
            showNotification('You can now edit the courses and skills sections!', 'info');
            
        } else {
            // Disable editing mode
            coursesList.style.border = '1px solid var(--border-color)';
            coursesList.style.background = 'var(--background-color)';
            
            // Make skill items non-editable
            const skillItems = skillsList.querySelectorAll('.skill-item');
            skillItems.forEach(item => {
                item.contentEditable = false;
                item.style.border = '1px solid var(--border-color)';
                item.style.cursor = 'pointer';
            });
            
            // Update button
            editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Skills & Courses';
            editBtn.style.background = 'var(--gradient)';
            
            // Save changes notification
            showNotification('Changes saved successfully!', 'success');
            
            // Save to localStorage
            saveChanges();
        }
    });
    
    // Load saved changes on page load
    loadSavedChanges();
}

// Save changes to localStorage
function saveChanges() {
    const coursesList = document.getElementById('coursesList');
    const coursesData = coursesList.innerHTML;
    localStorage.setItem('coursesData', coursesData);
    
    const skillItems = document.querySelectorAll('.skill-item');
    const skillsData = Array.from(skillItems).map(item => item.textContent);
    localStorage.setItem('skillsData', JSON.stringify(skillsData));
}

// Load saved changes from localStorage
function loadSavedChanges() {
    const savedCourses = localStorage.getItem('coursesData');
    if (savedCourses) {
        document.getElementById('coursesList').innerHTML = savedCourses;
    }
    
    const savedSkills = localStorage.getItem('skillsData');
    if (savedSkills) {
        const skillsData = JSON.parse(savedSkills);
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            if (skillsData[index]) {
                item.textContent = skillsData[index];
            }
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize Scroll Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Add hover effects for project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });
});

// Add typing effect for profile description
function initializeTypingEffect() {
    const description = document.querySelector('.brief-description p');
    if (description) {
        const text = description.textContent;
        description.textContent = '';
        description.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                description.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            } else {
                description.style.borderRight = 'none';
            }
        }
        
        // Start typing effect when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(description);
    }
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeTypingEffect, 1000);
});
