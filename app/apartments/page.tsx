'use client'

import { useEffect } from 'react'

export default function ApartmentsPage() {
  useEffect(() => {
    window.location.replace('/gallery')
  }, [])

  return <main><p>جارٍ تحويلك إلى صفحة الشقق المفروشة. <a href="/gallery">انتقل الآن</a></p></main>
}
