'use client'

import { useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpLeft, Building2, KeyRound, MapPin, MessageCircle, Sparkles, Sofa, Utensils, Wifi } from 'lucide-react'

const nearbyGroups = [
  { title: 'مساجد على بُعد مشي', places: [['مسجد الخيرات', '200 م'], ['مسجد التوحيد', '300 م']] },
  { title: 'سوبرماركت وبقالة', places: [['دكان', '350 م'], ['أسواق البشية', '500 م'], ['تموينات الغربية المتحدة', '550 م'], ['الدانوب', '1 كم']] },
  { title: 'صيدليات', places: [['صيدلية النهدي', '250 م'], ['صيدلية الدواء', '350 م'], ['صيدلية ديار الشاطئ', '850 م']] },
  { title: 'محطات بنزين', places: [['محطة نفط', '250 م'], ['محطة النهضة', '650 م']] },
  { title: 'مطاعم', places: [['مطبخ همام: سليق وأكلات شعبية', '200 م'], ['مطعم وشواية الشاطئ: دجاج مشوي', '500 م'], ['كاس جبن: مطور وسندويتشات', '500 م'], ['ماكدونالدز: وجبات سريعة', '550 م'], ['مطعم شرقي: أكلات مصرية', '750 م'], ['مطعم السدة: مندي وأكلات عربية', '1.2 كم'], ['BYB: برجر وريسوتو', '1.4 كم']] },
  { title: 'أسواق ومولات', places: [['هيرا بلازا سنتر', '1.6 كم'], ['ريد سي مول', '2.2 كم'], ['سبيس مول', '2.5 كم'], ['سلطان مول', '2.6 كم'], ['حراء مول (ذهب ومجوهرات)', '3.2 كم']] },
  { title: 'ترفيه وحدائق', places: [["حديقة May’s Park", '400 م'], ['حديقة التقوى', '1.4 كم'], ['جامب أب JUMP UP (ألعاب أطفال)', '1.4 كم'], ['سينما فوكس، ريد سي مول', '2 كم'], ['أدفنتورا، ألعاب أطفال في ريد سي مول', '2.1 كم'], ['سينما حي', '2.4 كم'], ['آيس لاند: تزلج وبولينج وألعاب', '2.8 كم']] },
]

const amenities = [
  { title: 'مطبخ مجهز بالكامل', description: 'غسالة وثلاجة وميكروويف وأدوات أساسية في الشقق، باستثناء الاستوديو.', icon: Utensils, image: '/apartment-14-entry.jpeg' },
  { title: 'أثاث متكامل', description: 'غرفة نوم وصالة مريحة ومطبخ مجهز لتشعر وكأنك في بيتك.', icon: Sofa, image: '/hero-01-desktop.webp' },
  { title: 'إنترنت سريع', description: 'شبكة واي فاي مجانية متاحة في جميع الشقق.', icon: Wifi, image: '/hero-04-desktop.webp' },
  { title: 'نظافة منتظمة', description: 'تنظيف أسبوعي وتبديل للمفروشات وعناية بالتفاصيل.', icon: Sparkles, image: '/hero-02-desktop.webp' },
  { title: 'دخول ذاتي', description: 'كود خاص لباب الشقة أو استلام المفتاح من الاستقبال.', icon: KeyRound, image: '/apartment-14-hallway.jpeg' },
  { title: 'موقع مناسب', description: 'في حي الشاطئ بجدة، بالقرب من الخدمات والمطاعم.', icon: MapPin, image: '/relax-zone-facade-night.png' },
  { title: 'مصعد لجميع الأدوار', description: 'سهولة الوصول إلى جميع طوابق المبنى.', icon: Building2, image: '/hero-03-desktop.webp' },
  { title: 'دعم مباشر', description: 'فريقنا متاح للرد عبر واتساب طوال أيام الأسبوع.', icon: MessageCircle, image: '/apartment-14-lounge.jpeg' },
]

export function AmenitiesHighlights() {
  const [showAllMobile, setShowAllMobile] = useState(false)
  const MoreIcon = showAllMobile ? ArrowUp : ArrowDown

  return <section className="amenities-section amenities-home" aria-labelledby="amenities-title">
    <div className="section-wrap">
      <header className="amenities-heading">
        <span className="eyebrow">تفاصيل تهم إقامتك</span>
        <h2 id="amenities-title">ماذا تجد في <bdi dir="ltr">Relax Zone2</bdi>؟</h2>
        <p>كل ما تحتاجه لتبدأ إقامتك براحة واطمئنان من أول ليلة.</p>
      </header>
      <div className={`amenities-grid${showAllMobile ? ' is-expanded' : ''}`} id="amenities-list">
        {amenities.map(({ title, description, icon: Icon, image }, index) => <article className="amenity-card" key={title}>
          <img className="amenity-card-image" src={image} alt="" aria-hidden="true" loading="lazy" />
          <span className="amenity-card-icon"><Icon aria-hidden="true" /></span>
          <div className="amenity-card-copy">
            <span className="amenity-card-number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </article>)}
      </div>
      <button className="section-show-more" type="button" aria-expanded={showAllMobile} aria-controls="amenities-list" onClick={() => setShowAllMobile((visible) => !visible)}>{showAllMobile ? 'عرض أقل' : 'شاهد المزيد'} <MoreIcon className="show-more-icon" aria-hidden="true" /></button>
    </div>
  </section>
}

export function NearbyHighlights() {
  const [showAllMobile, setShowAllMobile] = useState(false)
  const MoreIcon = showAllMobile ? ArrowUp : ArrowDown

  return <section className="destination-section nearby-home" id="nearby" aria-labelledby="nearby-title">
    <div className="nearby-content section-wrap">
      <div className="nearby-heading"><span className="eyebrow">المدينة حولك</span><h3 id="nearby-title">كل ما تحتاجه <em>بالقرب منك</em></h3><p>أوقات ومسافات تقريبية من موقعنا في حي الشاطئ.</p></div>
      <div className={`nearby-grid${showAllMobile ? ' is-expanded' : ''}`} id="nearby-list">{nearbyGroups.map((group) => <article className="nearby-card" key={group.title}><h4>{group.title}</h4><ul>{group.places.map(([place, distance]) => <li key={place}><span>{place}</span><b>{distance}</b></li>)}</ul></article>)}</div>
      <button className="section-show-more" type="button" aria-expanded={showAllMobile} aria-controls="nearby-list" onClick={() => setShowAllMobile((visible) => !visible)}>{showAllMobile ? 'عرض أقل' : 'شاهد المزيد'} <MoreIcon className="show-more-icon" aria-hidden="true" /></button>
    </div>
  </section>
}

export function DestinationSection() {
  return <section className="destination-section destination-home" id="location" aria-labelledby="destination-title">
    <div className="destination-intro section-wrap">
      <div className="destination-photo"><img src="/relax-zone-facade-night.png" alt="واجهة مبنى ريلاكس زون 2 في حي الشاطئ بجدة" loading="lazy" /><span><MapPin size={15} /> حي الشاطئ، جدة</span></div>
      <div className="destination-copy"><span className="eyebrow">ضيافة تعكس جودة المكان</span><h2 id="destination-title">مكان يقرّبك<br /><em>من كل ما تحب</em></h2><p>استمتع بإقامة هادئة في ريلاكس زون 2، حيث تلتقي الضيافة المدروسة بموقع يسهّل وصولك إلى احتياجاتك ووجهاتك المفضلة في جدة.</p><a className="button-gold" href="https://maps.app.goo.gl/KU9PTeQdfjXcQn9G8?g_st=ac" target="_blank" rel="noreferrer">افتح الموقع على الخريطة <ArrowUpLeft size={17} /></a><div className="destination-map"><iframe title="موقع ريلاكس زون 2 في حي الشاطئ بجدة" src="https://maps.google.com/maps?q=Jeddah%20Al%20Shati%20District&t=&z=13&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div>
    </div>
  </section>
}
