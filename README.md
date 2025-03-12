# React Native User Profile Viewer

A sleek and modern React Native application that displays user profiles with a beautiful UI, animations, and navigation. This app fetches user data from an API and allows users to navigate through profiles with "Next" and "Previous" buttons, featuring smooth animations using `react-native-reanimated`.

## Features

- **Modern UI Design**: Gradient background, shadowed cards, and a circular avatar for a polished look.
- **Smooth Animations**: Fade-in animations (`FadeInDown`, `FadeInUp`) for avatar, name, email, and user info cards, triggered on initial load and when navigating between users.
- **User Navigation**: "Next" and "Previous" buttons to cycle through user profiles with re-triggered animations.
- **Password Toggle**: Show/hide password functionality with an eye icon.
- **Robust Data Handling**: Fallbacks for missing data (e.g., avatar, name, email) to ensure a seamless experience.
- **Loading State**: Displays a loading indicator (`ActivityIndicator`) while fetching user data.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or Yarn
- Expo CLI (if using Expo)
- A simulator/emulator or physical device for testing

### Steps

1. **Clone the Repository**
   ```sh
   git clone https://github.com/Abhi23-tiw/UserInfoApp.git
   cd UserInfoApp
   ```

2. **Install Dependencies**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Run the App**
   
   **For Expo:**
   ```sh
   npx expo start
   ```

## Technologies Used

- Expo
- `react-native-reanimated`
- `react-navigation`
- API fetching using `fetch`

## Contributing

Feel free to open issues and pull requests to improve the app!

---

Enjoy coding! 🚀

