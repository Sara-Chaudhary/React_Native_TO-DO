# ✨ Minimalist To-Do List (React Native & Expo)

A high-fidelity, production-ready Task Management application inspired by modern Dribbble aesthetics. This project demonstrates advanced React Native capabilities, including native gesture handling, custom modals, and dynamic list management.

## 🚀 Key Features

* **Swipe-to-Delete**: Native horizontal gestures using `react-native-gesture-handler` for intuitive task removal.
* **Smart Sorting**: Algorithmic list management where starred items float to the top and completed items sink to the bottom.
* **Custom Edit Modal**: A cross-platform compatible modal system for editing tasks, ensuring a consistent UI on both iOS and Android.
* **Haptic Feedback**: Integrated `expo-haptics` to provide physical touch confirmation for a premium user experience.
* **Glassmorphism UI**: Semi-transparent input areas and vibrant gradients that follow modern design trends.
* **Dynamic Layout**: Full support for long text wrapping and responsive design.

## 🛠️ Tech Stack

* **Framework**: Expo SDK (React Native).
* **Navigation**: Expo Router (Headerless immersive layout).
* **Gestures**: Reanimated Swipeable for smooth 60fps interactions.
* **Styling**: StyleSheet API with responsive Flexbox layouts.

## 📁 Architecture

The project follows a "Separation of Concerns" directory structure to ensure maintainability:

* **app/index.tsx**: Main application controller and state management.
* **app/components/TaskItem.tsx**: Highly optimized, reusable row component with swipe logic.
* **app/components/EditModal.tsx**: Abstracted modal component for clean state handling.
* **app/_layout.tsx**: Root provider for gesture handling and navigation configuration.
