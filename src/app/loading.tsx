export default function Loading() {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <div className="text-center">
        <div
          className="w-10 h-10 border-2 border-sage-200 border-t-sage-500 rounded-full animate-spin mx-auto mb-4"
          aria-hidden="true"
        />
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    </div>
  );
}
