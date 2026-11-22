import { Suspense } from 'react'
import { Check, Clock3, Headset, ShieldCheck } from 'lucide-react'


import { PageHero } from '@/components/site/page-hero'
import { BookingRequestForm, BookingRequestFormFromQuery } from '@/components/site/booking-request-form'
import { apartmentPhotos } from '@/components/site/site-data'
import { socialPreviewImage, socialPreviewImageUrl } from '@/components/site/social-metadata'

const assurances = [
  { icon: ShieldCheck, title: 'طلب آمن وواضح', text: 'نراجع تفاصيلك قبل تأكيد أي حجز.' },
  { icon: Clock3, title: 'رد سريع', text: 'يصلنا طلبك مباشرة عبر واتساب.' },
  { icon: Headset, title: 'تواصل مباشر', text: 'فريقنا يجيب عن استفساراتك قبل الوصول.' },
]


function BookingPage() {

  return <main className="inner-page" dir="rtl">
    <PageHero image={apartmentPhotos[2].src} eyebrow="خطوتك الأولى نحو الراحة" title="رحلتك تبدأ" highlight="بطلب بسيط" description="شاركنا مواعيدك وعدد الضيوف، وسنتواصل معك مباشرة لمراجعة التوفر والتفاصيل." />
    <section className="booking-section booking-page-section"><div className="booking-inner"><div className="booking-intro"><span className="eyebrow">حجز واضح — تواصل شخصي</span><h2>أرسل طلبك،<br /><em>ونحن نهتم بالباقي</em></h2><p>لا يتم تأكيد الحجز تلقائياً. سنراجع التوفر ونتواصل معك على واتساب لتوضيح التفاصيل قبل إتمام أي خطوة.</p><div className="booking-assurances">{assurances.map(({ icon: Icon, title, text }) => <div key={title}><Icon /><span><b>{title}</b><small>{text}</small></span></div>)}</div><img className="booking-side-photo" src={apartmentPhotos[0].src} alt="جلسة الشقة المريحة" loading="lazy" /></div><div className="booking-form-mobile-only"><Suspense fallback={<BookingRequestForm />}><BookingRequestFormFromQuery /></Suspense></div></div></section>
    <section className="trust-quote"><span>نرحّب بك في جدة</span><p>خطط لزيارتك، ودع علينا تفاصيل الراحة.</p><a className="text-link" href="/location">استكشف موقعنا في حي الشاطئ</a></section>
  </main>
}

export const metadata = {
  title: 'احجز إقامتك | ريلاكس زون 2 جدة',
  description: 'أرسل طلب الحجز وتواصل مع فريق ريلاكس زون 2 في حي الشاطئ بجدة عبر واتساب.',
  openGraph: {
    title: 'احجز إقامتك | ريلاكس زون 2 جدة',
    description: 'أرسل طلب الحجز وتواصل مع فريق ريلاكس زون 2 في حي الشاطئ بجدة عبر واتساب.',
    type: 'website',
    images: [socialPreviewImage],
  },
  twitter: { card: 'summary_large_image', images: [socialPreviewImageUrl] },
}

export default function BookingRoute() {
  return <BookingPage />
}
