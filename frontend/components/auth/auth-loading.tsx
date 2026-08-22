export function AuthLoading({ label = "Checking your session..." }: { label?: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f9fd]">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#079bc2] border-t-transparent" />
        <p className="mt-4 text-sm text-slate-500">{label}</p>
      </div>
    </main>
  );
}
