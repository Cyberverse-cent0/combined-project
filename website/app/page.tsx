export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Stephen Asatsa - Website
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Professional website and research hub
          </p>
          <div className="space-y-4">
            <a 
              href="/admin" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Admin Dashboard
            </a>
            <div className="block">
              <a 
                href="/admin-signup" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Admin Signup
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
