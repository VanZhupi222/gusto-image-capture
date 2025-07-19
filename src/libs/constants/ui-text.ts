// Result page UI text constants
export const RESULT_TEXT = {
  // Titles
  NO_PHOTO_TITLE: 'No Photo Available',
  PHOTO_CAPTURED_TITLE: 'Photo Captured',
  ANALYZING_TITLE: 'Analyzing Photo',
  UPLOADING_TITLE: 'Uploading Photo',
  ANALYSIS_COMPLETE_TITLE: 'Photo Analysis Complete',

  // No photo state
  NO_PHOTO_EMOJI: '📷',
  NO_PHOTO_DESCRIPTION: 'No photo has been captured yet. Take a photo on the home page to see the results here.',
  GO_TO_CAMERA_BUTTON: 'Go to Camera',

  // Not analyzed state
  PHOTO_CAPTURED_DESCRIPTION: 'Your photo has been captured successfully.',
  ANALYSIS_REQUIRED_TITLE: 'Analysis Required',
  ANALYSIS_REQUIRED_DESCRIPTION: 'This photo has not been analyzed yet. Please go back to the previous page and click the "Analyze Photo" button to perform face detection analysis.',

  // Analyzing state
  ANALYZING_DESCRIPTION: 'Detecting faces in your photo, please wait...',
  
  // Uploading state
  UPLOADING_SUCCESS_TITLE: 'Face Detection Successful!',
  UPLOADING_DESCRIPTION: 'Saving photo to server...',
  UPLOAD_SUCCESS_TITLE: 'Upload Successful!',
  UPLOAD_FAILED_TITLE: 'Upload Failed',
  UPLOAD_FAILED_DESCRIPTION: 'Photo saved locally but could not upload to server',
  RETRY_UPLOAD_BUTTON: 'Retry Upload',
  TAKE_NEW_PHOTO_BUTTON: 'Take New Photo',

  // Analysis complete state
  ANALYSIS_SUCCESS_DESCRIPTION: 'Face detection successful! Your photo has been analyzed.',
  ANALYSIS_RESULT_TITLE: 'Analysis Result: Passed',
  ANALYSIS_RESULT_DESCRIPTION: 'People detected in the image',

  // Alt text
  CAPTURED_PHOTO_ALT: 'Captured photo',
} as const;

// Camera page UI text constants
export const CAMERA_TEXT = {
  // Titles
  CAMERA_CAPTURE_TITLE: 'Camera Capture',
  PHOTO_CAPTURED_TITLE: 'Photo Captured',
  ANALYZING_PHOTO_TITLE: 'Analyzing Photo',
  CAMERA_ACCESS_REQUIRED_TITLE: 'Camera Access Required',

  // Camera Preview
  TAKE_PHOTO_BUTTON: 'Take Photo',
  TAKING_PHOTO_BUTTON: 'Taking Photo...',
  UPLOAD_FROM_DEVICE_BUTTON: 'Upload from Device',
  DISABLE_CAMERA_BUTTON: 'Disable Camera',

  // Camera Waiting
  ENABLE_CAMERA_BUTTON: 'Enable Camera',
  CONNECTING_BUTTON: 'Connecting...',
  LOADING_TEXT: 'Loading...',
  DEFAULT_ERROR_MESSAGE: 'Enable camera to start taking photos',

  // Photo Result
  RETAKE_PHOTO_BUTTON: 'Retake Photo',
  ANALYZE_PHOTO_BUTTON: 'Analyze Photo',
  CAPTURED_PHOTO_ALT: 'Captured photo',

  // Analysis Loading
  ANALYZING_PHOTO_ALT: 'Analyzing photo',
  DETECTING_FACES_TEXT: 'Detecting faces...',
  PLEASE_WAIT_TEXT: 'Please wait while we analyze your photo',

  // Camera Error
  CAMERA_DENIED_EMOJI: '⚠️',
  CAMERA_DENIED_TITLE: 'Camera access was denied',
  ENABLE_CAMERA_INSTRUCTIONS_TITLE: 'To enable camera access:',
  
  // Browser instructions
  CHROME_EDGE_TITLE: 'Chrome / Edge:',
  CHROME_EDGE_INSTRUCTIONS: 'Click the camera/information icon in the address bar → Allow → Refresh page',
  
  FIREFOX_TITLE: 'Firefox:',
  FIREFOX_INSTRUCTIONS: 'Click the camera icon next to the address bar → Allow → Refresh page',
  
  SAFARI_TITLE: 'Safari:',
  SAFARI_INSTRUCTIONS: 'Safari menu → Settings for This Website → Camera: Allow → Refresh page',

  // Buttons
  REFRESH_PAGE_BUTTON: 'Refresh Page',

  // Toast messages
  IMAGE_UPLOAD_SUCCESS: 'Image uploaded successfully',
  IMAGE_UPLOAD_ERROR: 'Failed to upload image',
} as const; 