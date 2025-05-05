import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  // Targets for the icons within the button
  static targets = [ "sunIcon", "moonIcon" ]
  // Define the two themes to toggle between
  static values = { lightTheme: String, darkTheme: String }

  connect() {
    this.loadTheme()
  }

  // Call this method on button click
  toggle() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === this.lightThemeValue ? this.darkThemeValue : this.lightThemeValue;
    this.setTheme(newTheme);
  }

  // Sets the theme on the <html> element, saves it, and updates icons
  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
    this.updateIcons(theme)
  }

  // Loads the theme from local storage or uses the light theme as default
  loadTheme() {
    const savedTheme = localStorage.getItem("theme")
    // Default to light theme if no saved theme or if saved theme isn't one of the two options
    const currentTheme = (savedTheme === this.lightThemeValue || savedTheme === this.darkThemeValue) ? savedTheme : this.lightThemeValue;
    this.setTheme(currentTheme)
  }

  // Shows/hides the correct icon based on the current theme
  updateIcons(theme) {
    if (theme === this.darkThemeValue) {
      this.sunIconTarget.classList.remove('hidden'); // Show sun (to switch to light)
      this.moonIconTarget.classList.add('hidden');  // Hide moon
    } else {
      this.sunIconTarget.classList.add('hidden');   // Hide sun
      this.moonIconTarget.classList.remove('hidden'); // Show moon (to switch to dark)
    }
  }
}