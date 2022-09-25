/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 *
*/
const navbar = document.getElementById("navbar__list")
const landingContainers = document.getElementsByClassName("landing__container")
/**
 * End Global Variables
 * Start Helper Functions
 *
*/
// helper functions are scoped inside main functions
/**
 * End Helper Functions
 * Begin Main Functions
 *
*/
// build the nav
function buildNavigationBarMenu ( landingContainers ) {
  for (let i = 1; i < landingContainers.length + 1; i++) {
    let newMenuItem = buildNavigationBarMenuItem(i)
    navbar.appendChild(newMenuItem)
  }
  function buildNavigationBarMenuItem(i) {
    let menuItemHeaderSelector = "#section-" + i + "-title"
    let menuItemHeader = document.querySelector(menuItemHeaderSelector)
    let menuItemHeaderText = menuItemHeader.textContent
    let menuItemHeaderTextItem = document.createTextNode(menuItemHeaderText)
    let newMenuItem = document.createElement("li")
    let menuItemId = "menu-item-nav-" + i
    newMenuItem.setAttribute("id", menuItemId)
    newMenuItem.setAttribute("class", "menu__link")
    newMenuItem.appendChild(menuItemHeaderTextItem)
    return newMenuItem
  }
}
// Add class 'active' to section when near top of viewport
function differentiateSectionBeingViewed() {
  for (let i = 1; i < landingContainers.length + 1; i++) {
    let sectionActivelyBeingViewed = document.getElementById("section" + i)
    document.addEventListener(
      "scroll",
      function (event) {
        if (isElementActivelyBeingViewed(sectionActivelyBeingViewed)) {
          sectionActivelyBeingViewed.classList.add("section-active-class")
        } else {
          sectionActivelyBeingViewed.classList.remove("section-active-class")
        }
      }
    )
  }
  function isElementActivelyBeingViewed(element) {
    let bounding = element.getBoundingClientRect()
    return (
      bounding.top <= 50 &&
      bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
    )
  }
}
// Smooth scroll
function handleClickToSmoothScroll() {
  document.querySelectorAll(".menu__link").forEach(function (navBarMenuItem) {
    let sectionLandingContainer = document.getElementById("section" + getNavBarMenuItemNumber(navBarMenuItem))
    listenToClickEvent(navBarMenuItem, sectionLandingContainer)
    function getNavBarMenuItemNumber(navMenuItem) {
      return navMenuItem.id.split('-')[3];
    }
    function listenToClickEvent(menuItem, section) {
      menuItem.addEventListener("click", function (evt) {
        evt.preventDefault()
        section.scrollIntoView({
          behavior: "smooth"
        })
      })
    }
  })
}
/**
 * End Main Functions
 * Begin Events
 *
*/
// Build menu
buildNavigationBarMenu(landingContainers)
// Handle click to smooth scroll to section
handleClickToSmoothScroll()
// Set sections as active
differentiateSectionBeingViewed()

