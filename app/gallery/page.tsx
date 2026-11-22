import { PageHero } from '@/components/site/page-hero'
import { ApartmentGallery } from '@/components/site/apartment-gallery'
import { apartmentUnits } from '@/components/site/site-data'
import { socialPreviewImage, socialPreviewImageUrl } from '@/components/site/social-metadata'



export default function GalleryPage() {
  return <main className="inner-page" dir="rtl">
    <PageHero image={apartmentUnits[0].photos[0].src} eyebrow="ريلاكس زون 2 · جدة" title="شقق مفروشة" highlight="تمنحك راحة البيت" description="اكتشف الوحدات ومرافقها، وشاهد صور كل شقة قبل أن تختار إقامتك في حي الشاطئ." cta="استكشف الشقق" />
    <section className="section-wrap page-content-section gallery-page-content"><div className="section-title"><span className="eyebrow">كل شقة بصورها الخاصة</span><h2>اختر الشقة المناسبة لك</h2><p>اختر بطاقتك واكتشف تفاصيلها وصورها عند التمرير أو الضغط عليها.</p></div><ApartmentGallery /></section>
    <section className="trust-quote"><span>اختيارك يبدأ بصورة واضحة</span><p>تصفّح المساحة التي تناسبك، ثم تواصل معنا للاستفسار عن التوفر.</p><a className="button-gold" href="/booking">اطلب حجز الشقة</a></section>
  </main>
}

export const metadata = {
  title: 'الشقق المفروشة | ريلاكس زون 2 جدة',
  description: 'تعرّف على شقق ريلاكس زون 2 المفروشة، ومرافق كل وحدة، واستكشف صورها قبل الحجز.',
  openGraph: {
    title: 'الشقق المفروشة | ريلاكس زون 2 جدة',
    description: 'تعرّف على شقق ريلاكس زون 2 المفروشة، ومرافق كل وحدة، واستكشف صورها قبل الحجز.',
    type: 'website',
    images: [socialPreviewImage],
  },
  twitter: { card: 'summary_large_image', images: [socialPreviewImageUrl] },
}
