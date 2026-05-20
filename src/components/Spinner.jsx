const Spinner = () => (
  <div
    className="flex items-center justify-center py-20"
    role="status"
    aria-label="Loading"
  >
    <div className="w-12 h-12 rounded-full border-4 border-zinc-200 border-t-green-500 animate-spin" />
  </div>
);

export default Spinner;
