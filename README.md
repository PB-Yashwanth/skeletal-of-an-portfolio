# Skeletal Portfolio Template

[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/PB-Yashwanth/skeletal-of-an-portfolio.git)

A clean, modern, and responsive single-page portfolio template designed for academics, researchers, and professionals. This template features a dynamic typing effect, an interactive particle background, and a comprehensive structure to showcase your work and experience.

## Features

-   **Responsive Design:** A fluid layout that looks great on desktops, tablets, and mobile devices.
-   **Dynamic Typing Effect:** An engaging hero section with a typewriter effect that cycles through customizable roles like "Mentor," "Educator," and "Researcher."
-   **Interactive Particle Background:** Utilizes `particles.js` to create a visually appealing and interactive animated background.
-   **Sticky Navigation:** A navigation bar that remains fixed to the top for easy access to all sections.
-   **Comprehensive Sections:** Includes 13 pre-defined sections tailored for academic and professional profiles, such as Research, Publications, Experience, and Teaching Skills.
-   **Back-to-Top Button:** A convenient button that appears on scroll, allowing users to return to the top of the page smoothly.
-   **Easy Theme Customization:** Uses CSS variables for straightforward modification of the color palette.

## Technologies Used

-   HTML5
-   CSS3
-   Vanilla JavaScript
-   [Particles.js](https://github.com/VincentGarreau/particles.js/)

## Getting Started

No complex build process is required. Simply clone the repository and open the main HTML file in your browser.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/PB-Yashwanth/skeletal-of-an-portfolio.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd skeletal-of-an-portfolio/public
    ```

3.  **Open in your browser:**
    Open the `index.html` file in your preferred web browser to view the portfolio.

## Customization

You can easily customize this template to fit your personal brand and content. All modifications are made directly within the `public` directory.

### 1. Update Content

-   **Personal Information:** Open `public/index.html` and change the name in the `<h1>` tag within the `hero` section.
-   **Section Content:** Edit the text content within each `<section>` tag (e.g., `<section id="research">`).
-   **Footer:** Update the name and year in the `<footer>` section.

### 2. Customize Typing Effect

-   In `public/index.html`, find the inline `<script>` tag near the end of the body.
-   Locate the `words` array and modify its contents to reflect your roles:
    ```javascript
    const words = ["Your First Role", "Your Second Role", "Your Third Role"];
    ```

### 3. Modify Navigation & Sections

-   To add, remove, or rename sections, edit the navigation links in the `<ul class="navbar">` list within `public/index.html`.
-   Ensure that the `href` attribute of each link (e.g., `href="#research"`) matches the `id` of the corresponding `<section>` tag.

### 4. Change Color Scheme

-   The color theme can be easily adjusted by changing the CSS variables defined at the top of the `<style>` block in the `<head>` of `public/index.html`.
    ```css
    :root {
      --bg-color: #111;
      --text-color: #e6e6e6;
      --primary-color: #ffffff;
      --accent-color: #888;
      --hover-color: #1e3a8a; /* Change this for section hover color */
    }
    ```

### 5. Configure Particle Animation

-   The appearance and behavior of the background animation are controlled by `public/particles.json`. You can modify values like particle `number`, `color`, `size`, and `speed` in this file. Refer to the [Particles.js documentation](https://github.com/VincentGarreau/particles.js/) for all available options.