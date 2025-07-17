interface AnalysisLoadingProps {
  capturedImage: string;
}

export default function AnalysisLoading({ capturedImage }: AnalysisLoadingProps) {
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Analyzing Photo
      </h2>
      
      <div className="relative w-[95%] sm:w-4/5 bg-gray-200 rounded-lg overflow-hidden">
        <img 
          src={capturedImage} 
          alt="Analyzing photo" 
          className="w-full h-auto"
        />
        
        {/* Loading overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg font-medium">Detecting faces...</p>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-600">
        <p>Please wait while we analyze your photo</p>
      </div>
    </>
  );
} 