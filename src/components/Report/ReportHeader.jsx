// Report page title and localized date.
export default function ReportHeader({ dateString }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl md:text-4xl font-bold text-primary">
        لوحة التحكم الشخصية
      </h1>
      <span className="hidden sm:block text-xs md:text-sm text-text-muted">
        {dateString}
      </span>
    </div>
  );
}
