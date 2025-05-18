// VIDEO POPUP FUNCTIONALITY
function openPopup(videoSrc) {
    const popup = document.getElementById("videoPopup");
    const popupVideo = document.getElementById("popupVideo");
    popup.style.display = "flex";
    popupVideo.src = videoSrc;
}

function closePopup() {
    const popup = document.getElementById("videoPopup");
    const popupVideo = document.getElementById("popupVideo");
    popup.style.display = "none";
    popupVideo.pause();
    popupVideo.src = "";
}

// LOADING SCREEN FUNCTIONALITY
window.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const backgroundVideos = document.querySelectorAll('.highlight-video');

    // Initially pause all background videos
    backgroundVideos.forEach(video => video.pause());

    // Set timeout to match your loading GIF duration (4 seconds)
    setTimeout(() => {
        // Hide the loading screen
        loadingScreen.style.display = 'none';

        // Remove blur effect from main content
        mainContent.classList.remove('blurred');

        // Play all background videos
        backgroundVideos.forEach(video => {
            video.play().catch(e => console.log('Autoplay failed:', e));
        });

    }, 4000); // Adjust this time if your loading animation is longer/shorter
});

// Schedule Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    // Initialize schedule data for all days
    const scheduleData = {
        day1: [
            {
                time: '9:00 AM - 10:30 AM',
                title: 'Registration & Welcome Kit Distribution',
                location: 'Main Auditorium'
            },
            {
                time: '11:00 AM - 12:30 PM',
                title: 'Inaugural Ceremony',
                location: 'Main Auditorium'
            },
            {
                time: '1:30 PM - 2:30 PM',
                title: 'Lunch Break',
                location: 'University Cafeteria'
            },
            {
                time: '3:00 PM - 5:00 PM',
                title: 'Ice Breaking Sessions',
                location: 'Department-wise Activity Areas'
            }
        ],
        day2: [
            {
                time: '9:30 AM - 11:00 AM',
                title: 'University Tour',
                location: 'Campus Grounds'
            },
            {
                time: '11:30 AM - 1:00 PM',
                title: 'Department Introduction',
                location: 'Respective Departments'
            },
            {
                time: '1:00 PM - 2:00 PM',
                title: 'Lunch Break',
                location: 'University Cafeteria'
            },
            {
                time: '2:30 PM - 4:30 PM',
                title: 'Industry Expert Talk',
                location: 'Seminar Hall'
            },
            {
                time: '5:00 PM - 7:00 PM',
                title: 'Cultural Activities',
                location: 'Central Lawn'
            }
        ],
        day3: [
            {
                time: '9:30 AM - 11:30 AM',
                title: 'Workshop: Career Planning',
                location: 'Lecture Hall 1'
            },
            {
                time: '12:00 PM - 1:30 PM',
                title: 'Alumni Interaction',
                location: 'Seminar Hall'
            },
            {
                time: '1:30 PM - 2:30 PM',
                title: 'Lunch Break',
                location: 'University Cafeteria'
            },
            {
                time: '3:00 PM - 6:00 PM',
                title: 'Sports & Games',
                location: 'Sports Complex'
            }
        ],
        day4: [
            {
                time: '9:30 AM - 12:30 PM',
                title: 'Technical Workshop',
                location: 'Computer Labs'
            },
            {
                time: '12:30 PM - 1:30 PM',
                title: 'Lunch Break',
                location: 'University Cafeteria'
            },
            {
                time: '2:00 PM - 4:00 PM',
                title: 'Entrepreneurship Session',
                location: 'E-Cell Hub'
            },
            {
                time: '4:30 PM - 6:30 PM',
                title: 'Talent Hunt Preliminaries',
                location: 'Auditorium'
            }
        ],
        day5: [
            {
                time: '10:00 AM - 12:00 PM',
                title: 'Motivational Talk',
                location: 'Main Auditorium'
            },
            {
                time: '12:30 PM - 1:30 PM',
                title: 'Lunch Break',
                location: 'University Cafeteria'
            },
            {
                time: '2:00 PM - 5:00 PM',
                title: 'Cultural Night & Talent Hunt Finals',
                location: 'Main Auditorium'
            },
            {
                time: '5:30 PM - 7:00 PM',
                title: 'Closing Ceremony',
                location: 'Main Auditorium'
            }
        ]
    };
    
    // Function to create schedule HTML
    function createScheduleHTML(day) {
        const scheduleItems = scheduleData[day];
        let html = '';
        
        scheduleItems.forEach(item => {
            html += `
                <div class="schedule-item">
                    <div class="time">${item.time}</div>
                    <div class="event-details">
                        <h3>${item.title}</h3>
                        <p>${item.location}</p>
                    </div>
                </div>
            `;
        });
        
        return html;
    }
    
    // Initially load day 1 schedule
    const day1Content = document.getElementById('day1');
    if (day1Content) {
        day1Content.innerHTML = createScheduleHTML('day1');
    }
    
    // Tab switching
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the day data attribute
                const day = this.getAttribute('data-day');
                
                // Hide all tab panes
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                });
                
                // Show the selected tab pane
                const tabPane = document.getElementById(day);
                if (!tabPane) {
                    // Create tab pane if it doesn't exist
                    const newPane = document.createElement('div');
                    newPane.id = day;
                    newPane.className = 'tab-pane active';
                    newPane.innerHTML = createScheduleHTML(day);
                    document.querySelector('.tab-content').appendChild(newPane);
                } else {
                    tabPane.classList.add('active');
                    // Update content if it's empty
                    if (tabPane.innerHTML.trim() === '') {
                        tabPane.innerHTML = createScheduleHTML(day);
                    }
                }
            });
        });
    }