export default function UnauthorizedPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <h1 className="text-2xl font-display font-bold text-red-800">Unauthorized</h1>
        <p className="mt-2 text-red-700">You do not have permission to access this dashboard.</p>
      </div>
    </div>
  );
}
