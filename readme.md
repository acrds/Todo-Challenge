
# :dart: TODO APP - Game of fronts Challenge - Edition 02

This is the frontend for the ToDo App, designed to create and manage tasks. It uses React Native with expo for visual and React Native Paper for the design system. 

The app allows the user to create projects, where each project has tasks. For example, there could be a project called Fitness 2025 and gym and nutritional reeducation as tasks. Each task can have 3 different states (to do, doing and done). The app also allows the user to add comments to their tasks.

To further improve the user experience, this app has been enhanced with two artificial intelligences: IBM Watson and OpenAI GPT. The user can choose which generative AI they want to use to create task descriptions, suggest new tasks and respond to comments made on the tasks, as if it were a kind of chatbot. The resource used in the integration of generative AI was the command prompt.

## :computer: Setup Locally

- Download and install Node.js in your computer;
- Clone this repo;
- Open your terminal into `MyProjects`;
- Run `npm install` to install all dependencies;
- Run `npx expo start`.

## :computer: Tools

This project uses a set of modern and efficient tools to ensure high quality, maintainability, and a great developer experience. Below is a list of the dependencies used, their purpose, and why they were chosen:

### 1. Core Tools

- `Expo`: Simplifies React Native app development by providing an easy initial setup, tools like Live Reload, and support for multiple platforms (iOS, Android, and Web). It’s an excellent choice for rapid prototyping and environment management.
- `React`: A library for building user interfaces. Chosen for its wide adoption, simplicity, and excellent performance.
- `React Native`: A framework for cross-platform mobile app development using JavaScript and React. Ideal for reducing development time and effort when creating apps for iOS and Android simultaneously.

### 2. Navigation

- `@react-navigation/native`: The standard library for navigation in React Native apps. It is flexible, well-documented, and widely used by the community.
- `@react-navigation/stack`: Manages stack-based navigation, essential for implementing screens that stack on top of one another.

### 3. State Management

- `Zustand`: A lightweight library for global state management. Chosen for its simplicity and efficiency, especially for medium-sized applications.
- `useState`: A React Hook for managing component-level state. It`s simple and ideal for managing local state in functional components.

### 4. Networking

- `Axios`: An HTTP client for making API requests. Chosen for its simplicity, support for interceptors, and large community.

### 5. UI Components

- `React Native Paper`: A library of ready-to-use UI components based on Material Design. Chosen for providing consistent visuals and support for custom themes.
- `React Native Vector Icons`: A highly customizable and easy-to-use icon library. Ideal for creating a rich and visually appealing interface.

### 6. Markdown Rendering

- `React Native Markdown Display`: A library for rendering Markdown text. Useful for displaying dynamic content, such as descriptions and notes, in a styled format.

### 7. Device Utilities

- `@react-native-async-storage/async-storage`: Used for local persistent storage on the device. Ideal for managing sessions, preferences, and offline data.
- `React Native Safe Area Context`: Ensures UI content respects safe areas on screens, such as notches and navigation bars. Essential for responsive layouts.

### 8. Gesture Handling

- `React Native Gesture Handler`: A library for handling touch gestures, such as swipes and taps. Chosen for its performance and seamless integration with React Navigation.
- `React Native Screens`: Optimizes screen performance in React Native apps by reducing navigation overhead.

### 9. Development Tools

- `@babel/core`: A JavaScript transpiler used for compatibility with different environments. Necessary for React Native and Expo projects.

### Why These Tools Were Chosen

	1.	Community Support: All tools have large, active communities, ensuring rich documentation and quick problem resolution.
	2.	Performance: The libraries chosen are optimized for mobile performance.
	3.	Ease of Use: They are easy to integrate and offer intuitive APIs to accelerate development.
	4.	Maintainability: The combination of these tools enables the project to scale without compromising code readability or maintainability.

## :computer: Project Folder Structure

<img width="223" alt="image" src="https://github.com/user-attachments/assets/af9a1f26-e459-4639-9ac3-2ccb64d21c8f">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/4b8f6392-a521-46cb-b5ab-cdcdf5e44ac3">

The folder structure of this project is organized to maintain clarity, scalability, and separation of concerns. Below is a detailed explanation of each folder and its purpose:

### Root Directory

- `App.js`: The main entry point of the React Native application where the app’s core setup, navigation, and providers are initialized.
- `index.js`: The entry file required to start the app. It registers the main App component with the native runtime.
- `app.json`: Configuration file for Expo, defining metadata like app name, version, and assets.
- `eas.json`: A configuration file for Expo Application Services (EAS), used for building and deploying the app.
- `.gitignore`: Specifies files and folders that should be ignored by Git (e.g., node_modules, build files).
- `package.json`: Defines the project’s dependencies, scripts, and metadata.
- `scripts`: (postinstall.js file) A script that runs after dependencies are installed. This could include additional setup or configuration.
- `assets`: Contains all static files, such as images and icons, used in the app. This folder centralizes media resources to keep the app organized.
- `src`: Will explain below

### Source (src)

The core logic of the app is housed in the src folder. It contains the following subfolders:
- `screens`: Houses all the screens (or views) of the app. Each screen corresponds to a specific feature or user flow:
	1. HomeScreen.js: The main screen showing projects.
	2. LoginScreen.js: Handles user authentication.
	3. MainScreen.js: Likely acts hub for navigation.
	4. PlanScreen.js: For managing plans.
	5. RegisterScreen.js: Allows users to register an account.
	6. SettingsScreen.js: Displays app settings.
	7. TaskDetailScreen.js: Shows details about a specific task.
	8. TaskScreen.js: Lists tasks within a project.
- `services`: Handles API integration and external service communication.
	1. api.js: Manages direct API requests and configurations.
	2. routes.js: Contains logic to organize API endpoints and routes used across the app.
- `store`: Manages state management for the app. Each file encapsulates a specific store:
	1. projectStore.js: Manages the global state for projects.
	2. aiStore.js: Manages AI-related state.
- `styles`: Contains style definitions for each screen to maintain consistency across the app. Each file follows a clear naming pattern.
- `utils`: Contains utility functions that doesn’t fit into other categories, likely handles storing, retrieving, and managing authentication tokens.

## :computer: Usage

### Init
<img width="223" alt="image" src="https://github.com/user-attachments/assets/c4f573c2-b529-447b-9354-6dd4ad3aed01">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/221b90c8-2214-4621-aefc-e8f09d83d95a">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/91baffc8-acd9-482d-894d-c9404267e5e7">

The application opens on the Login screen, requesting user authentication, or giving the option to register, if this is the first time you access it. Registration requests information such as name, email and password, which must be at least 6 characters long.

### App - First Access

<img width="223" alt="image" src="https://github.com/user-attachments/assets/454af955-c194-4ad6-9aa5-e8d47424b0f2">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/091db874-c180-49ef-aa40-fdd5a7ec688a">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/3f9a96ba-4071-410b-ba02-a1527c71715b">

When accessing the application for the first time, the screen opens on the projects screen, with a navigation button that allows the user to navigate between the project screens, action plans, based on the projects and tasks created, and finally, the application preferences screen where the user can define which generative AI they want to be used in the functionalities. By default, the generative AI set is IBM Watson.

### Home 

<img width="223" alt="image" src="https://github.com/user-attachments/assets/2f36648c-304c-497a-84ae-fa6ab4a6ca13">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/3ef40e4b-4b8c-4b6f-911c-e8b800fac216">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/d6cbcb07-0ee0-4199-9143-31037dc8916c">

On the projects screen, when the user clicks on the create component, they enter the name and description of the project they want to create. When creating, it shows the basic information about that project such as the title, description, creation date, a progress bar showing how many tasks that project has and how many have already been completed. In addition to the option to delete a project. 

### Task

When clicking on the created project, it takes the user to the tasks screen where all the tasks created for that project will be listed, in addition to the option to filter the tasks based on their status. This filter is a multiselect, which allows the user to select more than one filter.

<img width="223" alt="image" src="https://github.com/user-attachments/assets/24984811-4487-4c1a-802b-64d48b6fbfe0">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/e7364868-03be-4368-ab77-ce6f302c2431">

When clicking on the create task component, the user must enter a title and description for the task. Here, it is possible to already have the help of generative AI, where when entering the task title, the button to generate description with AI is enabled.

<img width="223" alt="image" src="https://github.com/user-attachments/assets/6fd10496-d8a1-4d84-a9af-a6c2e837020b">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/464cd07c-a4d1-4b0b-b830-751417c0e1bf">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/b63ab0b6-496c-422a-ae1a-7a553452811b">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/e52acb22-9674-40df-8756-a5b6960e0649">

From this point on the user can just ignore the option to generate the description with generative AI and create their own description or not. The description created by generative AI will come in a markdown format, but the application has a library in its dependencies that interprets this format.

The created task displays basic information such as current status, task title and the number of comments that task has.

From two created tasks, the application provides a new component to create a task 100% using generative AI. This functionality provides a title and description suggestion based on the project and previous tasks. This suggestion can be accepted or ignored by the user.

<img width="223" alt="image" src="https://github.com/user-attachments/assets/5f843f86-3658-4d8a-831c-2e0c65f53361">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/6a11ac64-1987-40ce-b8f4-a2bead8768d6">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/7234700d-55d2-49a2-bf97-f49d8207c0e0">

### Task Detail
<img width="223" alt="image" src="https://github.com/user-attachments/assets/383a7092-3473-4d9f-ac52-cf75a336e438">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/e67dbac8-5c8f-4a5a-8abb-17c3692b380b">

By clicking on a task, the user has access to information about the title, current status, description, creation date, and modification of the task. Another option available is to add comments to the task. Each comment created can be edited or deleted by the user. In addition, for each comment made, the generative AI makes a comment regarding the comment entered.

<img width="223" alt="image" src="https://github.com/user-attachments/assets/76d9402b-2c75-4c67-9a06-b55d3faa2bfa">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/264a41c9-ff6c-4a03-a438-e4e06f4c4560">

If a comment is edited, the generative AI creates a new comment.

<img width="223" alt="image" src="https://github.com/user-attachments/assets/7c503e72-4880-455f-8bf4-e927bcb63b74">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/998a55d0-acc2-4218-b547-79dce0ae4e56">

The task can also be edited or deleted.

<img width="223" alt="image" src="https://github.com/user-attachments/assets/f681fa6d-261f-46a1-ba19-b750a058a22f">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/face645a-7c2d-4945-aa84-9ccf857bfb93">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/6960f6a7-66b0-4f97-b98e-f08300253036">

Also on this screen, you can change the task status, changing between to do, doing and done status.

<img width="223" alt="image" src="https://github.com/user-attachments/assets/2195bdf4-e874-406b-a8d4-45d6a384e4ac">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/bd0691e3-d433-415a-856b-c90353387e1a">

Each status update is reflected directly on the Task screen, where to help with visualization, each status has a unique color. Also note that the `Foods` task shows that it has 3 comments.

<img width="223" alt="image" src="https://github.com/user-attachments/assets/7a93a52e-fb16-45ee-a421-276e10d348fb">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/c3e88207-8416-4fa8-ab7a-081659f3a920">

Furthermore, as the Christmas dinner project has a task with the status done, the progress bar on the Home screen reflects the user's progress.

<img width="223" alt="image" src="https://github.com/user-attachments/assets/d375ce3a-b6fc-4503-b831-208b98f168e1">

### Plan

After creating a project, the Plan tab now offers the function of suggesting a personalized plan to the user, based on a prompt that will determine a plan with 1 or a maximum of 3 tasks for a specific project.

That is why a project must have at least one task for this functionality to generate a plan proposal.

<img width="223" alt="image" src="https://github.com/user-attachments/assets/79767716-31ea-4fff-8a9c-f709bc55a364">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/25eec274-e520-4c36-8a3e-d29d464b71e1">

If there are tasks, the user will have a proposed action plan based on the selected project. As in the example, only 3 tasks were created, and the plan recommended carrying out all of them. However, if there were more tasks in the Christmas dinner project, the generative AI would suggest the tasks according to a classification performed through a command prompt in the API.

<img width="223" alt="image" src="https://github.com/user-attachments/assets/76f0d55c-f04e-4e87-9965-45f047cf1a39">
<img width="223" alt="image" src="https://github.com/user-attachments/assets/13d2de8f-68be-4098-8b62-7ecf9faee2bf">


## :bust_in_silhouette: Contributing

You can get in touch with `anasantos.rds@outlook.com` or `anacs@ibm.com` in mail.
