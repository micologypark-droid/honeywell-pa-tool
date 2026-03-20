export default function LoadingSpinner({ message = '분석 중...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-[#EF3829] rounded-full animate-spin" />
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
}
