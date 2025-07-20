# Image Capture - Webcam Selfie App

This project is a 2-page app for taking selfies with a webcam. It was built for a code test and meets all the test's requirements.

## Setup and Run Instructions

### You Will Need

- Node.js 18+
- pnpm (or npm/yarn)

### 1. Installation

First, clone the project and install the needed packages:

```bash
git clone https://github.com/VanZhupi222/gusto-image-capture
cd image-capture
pnpm install
```

### 2. Get JWT Token

To use the test API, you need a JWT token. You can create one with this command:

```bash
node scripts/generate-token.js
```

This command will print a token in your terminal.

**Token Details:**
- **Secret Key**: `gusto-code-testing-shijie`
- **User ID**: `test-user`
- **Expires**: In 7 days

### 3. Start the App

You need to run two servers in two separate terminals.

**Frontend App (Next.js):**
```bash
pnpm dev
```

**Test API Server (json-server):**
```bash
pnpm mock-api
```

**Note:** You must have both servers running. If the mock API server is not running, the photo upload step will fail.

- **App URL**: `http://localhost:3000`
- **API URL**: `http://localhost:3001`

When you try to upload your first photo, the app will ask for the JWT token you copied.

## Project Structure

The project follows a standard Next.js application structure, with a clear separation of concerns.

```
src/
├── app/          # Next.js App Router: contains all pages and layouts.
├── components/   # React components, divided by feature (home, result) and reusable UI.
│   ├── home/
│   ├── result/
│   └── ui/
├── libs/         # Core application logic, hooks, and utilities.
│   ├── hooks/    # Custom React hooks for managing stateful logic.
│   ├── utils/    # Helper functions.
│   └── constants/
├── store/        # Zustand state management store.
└── types/        # TypeScript type definitions.
```

## Features & Code Implementation

### Home Page (`src/components/home/cameraCapture`)

The home page is built around a state machine that manages the camera and photo capture process. It is divided into four main stages, each handled by a specific React component:

**1. Waiting for Camera (`CameraWaiting.tsx`)**
- **State**: This is the initial state when the user first visits the page before granting camera access.
- **Functionality**: It displays a message prompting the user to enable their camera. The `onRequestPermission` function is called when the user clicks the button, which triggers the `useCameraPermission` hook.

**2. Camera Preview (`CameraPreview.tsx`)**
- **State**: Active when the user has granted camera permission and the live feed is on.
- **Functionality**: Shows the live webcam feed using a `<video>` element. When the "Take Photo" button is clicked, a 3-second countdown starts (`useCountdown` hook). During the countdown, all interactive elements like buttons are disabled to prevent something not under control. Once complete, a frame from the video stream is drawn onto a hidden `<canvas>` element. This capture logic is handled by the `capturePhoto` function within the `useCameraOperations` hook.

**3. Photo Result (`PhotoResult.tsx`)**
- **State**: Shown after a photo is successfully captured.
- **Functionality**: Displays the captured image. The user can either choose to "Retake Photo" or "Analyze Photo". Clicking "Analyze Photo" starts the face detection process (`usePhotoAnalysis` hook) and shows a loading state. During the analysis, navigation and other actions are disabled to ensure the process completes without interruption.

**4. Camera Error (`CameraError.tsx`)**
- **State**: This state is triggered if camera permission is explicitly denied by the user.
- **Functionality**: It shows a detailed error message and provides instructions on how to manually enable camera permissions for different browsers (Chrome/Edge, Firefox, and Safari).

**5. Alternative: File Upload**
- **Availability**: For users without a webcam or who prefer not to use it, a file upload option is available during the `CameraWaiting`, `CameraPreview`, and `CameraError` stages.
- **Functionality**: The "Upload from Device" button triggers the `useFileUpload` hook, which opens the system's file picker. Once a user selects a file, it follows the same analysis and result path as a photo taken with the camera.

### Result Page (`src/components/result`)

The Result Page displays the outcome of the photo upload process. Like the Home Page, it is state-driven, using data from the `usePhotoStore` (Zustand) to show the right component for each status. The logic is handled in `src/components/result/index.tsx`.

The primary states are:

- **Uploading (`UploadingContent.tsx`)**: Shown immediately after a photo passes analysis. It displays the photo with a loading indicator while the `usePhotoUpload` hook sends the image to the backend.

- **Success (`SuccessContent.tsx`)**: Displayed once the photo is successfully uploaded to the server. 
    -   **Data Integrity**: It shows the final photo using the URL returned from the backend, confirming that the data was received correctly.
    -   **Backend Optimization**: When uploading, the client generates an MD5 hash of the image data (`generateClientHash` function) and sends it to the backend. This design allows for future backend optimizations like de-duplication or instant uploads for previously seen images.

- **Failed (`FailedContent.tsx`)**: Triggered if the network request to the backend fails. It shows an error message and, importantly, provides a "Retry" button that allows the user to attempt the upload again without having to retake the photo.

The page also handles edge cases:

-   **Not Analyzed (`NotAnalyzedContent.tsx`)**: If a user navigates to the result page with a captured photo that hasn't been analyzed, this component is shown. It prompts the user to go back to the camera page to complete the analysis step.
-   **No Photo (`NoPhotoContent.tsx`)**: If a user navigates to the page without any photo, this component prompts them to take one.

### Reusable UI Components (`src/components/ui`)

To ensure a consistent and maintainable design system, common UI elements have been abstracted into their own reusable components. This approach promotes code reuse and makes future updates easier.

Key components include:
-   **Button (`button/`)**: A flexible button component with different variants (e.g., `primary`, `secondary`).
-   **Card (`card/`)**: Used for creating consistent panel layouts throughout the application.
-   **Spinner (`spinner/`)**: A loading spinner for indicating background processes.
-   **Toast (`toast/`)**: A toast notification system for providing users with feedback (e.g., success or error messages), managed via the `useToast` hook.

## Assumptions & Design Choices

### Image Analysis Method

- **Tool**: I used `@tensorflow-models/face-detection`. It's a free, open-source library that runs directly in the browser. This is implemented in the `useFaceDetection` hook (`src/libs/hooks/useFaceDetection.ts`).
- **Why I chose it**: It's a strong tool that is fast and protects user privacy because the image analysis happens on the user's device.
- **How it works**: The check passes if the tool finds **at least one face**.
```typescript
  // Simplified from libs/hooks/useFaceDetection.ts
  async function detectFaces(image) {
    try {
      // Try to detect faces with TensorFlow.js
      const faces = await detector.estimateFaces(image);
      return { success: faces.length > 0 };
    } catch (error) {
      // If face detection fails, fall back to color analysis
      const colorSuccess = checkRedPixels(image);
      return { success: colorSuccess };
    }
  }
  ```
- **Backup Plan**: If face detection fails (e.g., due to the fail of loading the library), the app doesn't just fail. It automatically uses a simpler color analysis as a backup. This makes the app more reliable.

  This adaptive color analysis logic is located in `src/libs/utils/colorAnalysis.ts`. It works in two steps:
  1.  **Environment Detection**: First, it calculates the average brightness of the image to determine if it was taken in a "bright" or "dark" environment.
  2.  **Adaptive Strategy**:
      -   In a **dark environment**, it looks for a significant presence of warm skin-like tones, assuming these indicate a person.
      -   In a **bright environment**, it does the opposite. It checks that the image is not dominated by red colors, which helps to filter out photos of inanimate red objects.

  Here is a simplified code example from the `detectFaces` function in `useFaceDetection.ts` that shows this logic:

### State Management

- **Tool**: Zustand, a simple state management library. The store is defined in `src/store/index.ts`.
- **Why I chose it**: It's much simpler than Redux and works great with TypeScript. It helps manage shared data across the app, such as `capturedImage`, `isAnalyzing`, and `uploadError`.

### Mock Backend

- **Tool**: `json-server`. The mock API is started via the `pnpm mock-api` script, which executes `json-server --watch db.json --port 3001`. This creates a simple REST API from the `db.json` file.
- **Why I chose it**: `json-server` is a very fast way to create a test API. This allowed me to build the frontend and backend parts separately. API calls are handled in the `usePhotoUpload` hook.

### UI/UX & Accessibility

- The user interface is designed to be simple and easy to use.
- You can use the keyboard to click buttons, and the colors are easy to see.

## Disclaimer

This is a non-commercial project developed solely for a technical evaluation.

*   **Purpose**: The application is intended to demonstrate coding skills, architectural decisions, and feature implementation as part of a hiring process.
*   **Limitations**: It is not a production-ready application. Features like security (e.g., hardcoded JWT secret), error handling, and performance optimization are simplified for demonstration and may not be suitable for a live environment.
*   **Not for Commercial Use**: This project and its source code may not be used for any commercial activities, redistributed, or deployed in a public-facing or production context.