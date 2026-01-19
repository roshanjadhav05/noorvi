'use client'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
                <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Application Error</h2>
                    <p className="text-gray-600 mb-6 max-w-md text-center">
                        {error.message || 'A critical error occurred in the application layout.'}
                    </p>
                    <button
                        onClick={() => reset()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    )
}
