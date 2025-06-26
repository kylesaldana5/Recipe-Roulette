export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Recipe Roulette
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A gamified cooking application that helps you discover recipes based on your available ingredients.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">
            🚧 Under Construction
          </h2>
          <p className="text-blue-700">
            This is the foundational Next.js T3 Stack setup. More features coming soon!
          </p>
        </div>
      </div>
    </main>
  )
}