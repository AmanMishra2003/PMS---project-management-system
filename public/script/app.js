//sidebar-toggle
const burgerToogle = document.querySelector('.hamburger')
const svgIcon = burgerToogle.querySelector('svg')
const sidebar = document.querySelector('.sidebar-container')
const profileSidebar = document.querySelector('.profile-sidebar-container')
const profileToggleButton = document.querySelector('.profile')

burgerToogle.addEventListener('click', () => {
    sidebar.classList.toggle('openSidebar')
    if (sidebar.classList.contains('openSidebar')) {
        svgIcon.style.transform = 'rotate(90deg)';
        profileSidebar.classList.remove('openSidebar')
    } else {
        svgIcon.style.transform = 'rotate(0deg)';
    }
})

profileToggleButton.addEventListener('click', () => {
    profileSidebar.classList.toggle('openSidebar');
    if(sidebar.classList.contains('openSidebar')){
        sidebar.classList.remove('openSidebar')
    }
    if (window.innerWidth >= 700) {
        if (profileSidebar.classList.contains('openSidebar')) {
            sidebar.classList.add('closeSlider')
        } else {
            sidebar.classList.remove('closeSlider')
        }

    }
})





