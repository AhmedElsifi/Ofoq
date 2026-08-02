export default function PrivacyHeader() {
  return (
    <header className="mb-12 text-center">
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs tracking-widest mb-4">
        <span className="material-symbols-outlined text-sm">shield</span>
        الخصوصية أولاً
      </span>
      <h1 className="text-3xl md:text-5xl font-bold text-m3-primary glowing-text mb-4">
        بياناتك تبقى معك
      </h1>
      <p className="text-text-muted max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
        يستخدم «أُفق» التخزين المحلي في متصفحك (localStorage) لحفظ إجاباتك، لذلك
        لا تُرسل بياناتك إلى أي خادم أو خدمة سحابية — أنت المالك الوحيد لها.
      </p>
    </header>
  );
}
