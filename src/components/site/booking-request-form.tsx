
'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, CalendarDays, MessageCircle } from 'lucide-react'
import { apartmentUnits, bookingRates, phoneNumber } from './site-data'

const formatPrice = (amount: number) => new Intl.NumberFormat('ar-SA').format(amount)
const joinFeatures = (f: readonly string[]) => f.length < 2 ? f.join('') : `${f.slice(0, -1).join(' و')} و${f[f.length - 1]}`
const apartmentTypes = (() => {
  const groups = new Map<string, { value: string; label: string; units: string[] }>()
  for (const unit of apartmentUnits) {
    const desc = joinFeatures(unit.features)
    const label = unit.number === '11' ? `استديو: ${desc}` : desc
    const g = groups.get(label)
    if (g) g.units.push(unit.number)
    else groups.set(label, { value: `type-${unit.number}`, label, units: [unit.number] })
  }
  return [...groups.values()]
})()

const excludedApartmentTypeLabel = 'غرفةنوموصالةومطبخ'
const normalizeApartmentTypeLabel = (label: string) => label.replace(/\s/g, '')
const getAvailableApartmentTypes = (initialUnit?: string) =>
  apartmentTypes.filter(
    (type) => normalizeApartmentTypeLabel(type.label) !== excludedApartmentTypeLabel || type.units.includes(initialUnit ?? ''),
  )

function getTodayDate() {
  const date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString().slice(0, 10)
}

function normalizeDateDigits(value: string) {
  return value
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
}

function parseArrivalDate(value: string) {
  const match = normalizeDateDigits(value).trim().match(/^(\d{1,2})\s*[\/.-]\s*(\d{1,2})\s*[\/.-]\s*(\d{4})$/)
  if (!match) return ''

  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])
  const date = new Date(Date.UTC(year, month - 1, day))

  if (year < 1000 || date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return ''

  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function formatArrivalDate(value: string) {
  if (!value) return ''

  const [year, month, day] = value.split('-')
  return `${day} / ${month} / ${year}`.replace(/\d/g, (digit) => String.fromCharCode(0x0660 + Number(digit)))
}

export function BookingRequestForm({ initialUnit }: { initialUnit?: string }) {
  const [bookingType, setBookingType] = useState<'daily' | 'monthly'>('daily')
  const availableApartmentTypes = getAvailableApartmentTypes(initialUnit)
  const initialType = availableApartmentTypes.find((type) => type.units.includes(initialUnit ?? ''))?.value ?? availableApartmentTypes[0].value
  const [apartmentType, setApartmentType] = useState<string>(initialType)
  const [arrival, setArrival] = useState('')
  const [arrivalDisplay, setArrivalDisplay] = useState('')
  const [nights, setNights] = useState('1')
  const [dateError, setDateError] = useState('')
  const today = getTodayDate()
  const selectedType = availableApartmentTypes.find((type) => type.value === apartmentType) ?? availableApartmentTypes[0]
  const groupRates = bookingRates.filter((r) => selectedType.units.includes(r.number))
  const selectedUnit = (initialUnit && groupRates.find((r) => r.number === initialUnit)) || [...groupRates].sort((x, y) => (bookingType === 'daily' ? x.daily - y.daily : x.monthly - y.monthly))[0] || bookingRates[0]
  const variesPrice = new Set(groupRates.map((r) => bookingType === 'daily' ? r.daily : r.monthly)).size > 1 && !(initialUnit && groupRates.some((r) => r.number === initialUnit))
  const unitPrice = bookingType === 'daily' ? selectedUnit.daily : selectedUnit.monthly

  const stayLength = useMemo(() => {
    const parsedNights = Number(nights)
    return Number.isInteger(parsedNights) && parsedNights > 0 ? parsedNights : 0
  }, [nights])

  const departure = useMemo(() => {
    if (!arrival || stayLength < 1) return ''
    const date = new Date(`${arrival}T00:00:00Z`)
    date.setUTCDate(date.getUTCDate() + stayLength)
    return date.toISOString().slice(0, 10)
  }, [arrival, stayLength])

  const billablePeriods = bookingType === 'daily' ? stayLength : Math.max(1, Math.ceil(stayLength / 30))
  const estimatedTotal = unitPrice * billablePeriods
  const periodLabel = bookingType === 'daily' ? 'ليلة' : 'شهر'

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!arrival || stayLength < 1) {
      setDateError('يرجى اختيار تاريخ الوصول وعدد ليالٍ صحيح.')
      return
    }

    setDateError('')
    const bookingTypeLabel = bookingType === 'daily' ? 'يومي' : 'شهري'
    const durationLabel = bookingType === 'daily' ? `${formatPrice(stayLength)} ليلة` : `${formatPrice(billablePeriods)} شهر`
    const message = [
      'مرحباً، أرغب في الاستفسار عن حجز في ريلاكس زون 2.',
      `نوع الشقة: ${selectedType.label}`,
      `نوع الإقامة: ${bookingTypeLabel}`,
      `تاريخ الدخول: ${arrival}`,
      `تاريخ المغادرة: ${departure}`,
      `المدة: ${durationLabel}`,
      `السعر ${periodLabel}: ${formatPrice(unitPrice)} ريال سعودي`,
      `الإجمالي التقديري: ${formatPrice(estimatedTotal)} ريال سعودي`,
      'أرجو تأكيد التوفر والتفاصيل.'
    ].join('\n')

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return <form className="booking-card" onSubmit={submit}>
    <fieldset className="booking-type-fieldset">
      <legend>نوع الإقامة</legend>
      <div className="booking-type-toggle" role="group" aria-label="نوع الإقامة">
        <button type="button" className={bookingType === 'daily' ? 'active' : ''} aria-pressed={bookingType === 'daily'} onClick={() => setBookingType('daily')}>إيجار يومي</button>
        <button type="button" className={bookingType === 'monthly' ? 'active' : ''} aria-pressed={bookingType === 'monthly'} onClick={() => setBookingType('monthly')}>إيجار شهري</button>
      </div>
    </fieldset>
    <label className="booking-unit-field">نوع الشقة<select name="unit" value={apartmentType} onChange={(event) => setApartmentType(event.currentTarget.value)}>{availableApartmentTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}</select></label>
    <div className="booking-fields booking-fields-compact">
      <div className="booking-arrival-field">
        <label htmlFor="arrival-display" dir="rtl">تاريخ الوصول</label>
        <div className="booking-date-control" dir="rtl">
          <input id="arrival-display" className="booking-date-text" type="text" inputMode="numeric" autoComplete="off" placeholder="يوم / شهر / سنة" dir="rtl" value={arrivalDisplay} onChange={(event) => {
            const value = event.currentTarget.value
            const parsedDate = parseArrivalDate(value)
            setArrivalDisplay(value)
            setArrival(parsedDate && parsedDate >= today ? parsedDate : '')
            setDateError('')
          }} onBlur={() => {
            const parsedDate = parseArrivalDate(arrivalDisplay)
            if (parsedDate && parsedDate >= today) setArrivalDisplay(formatArrivalDate(parsedDate))
          }} required aria-invalid={Boolean(dateError)} aria-describedby={dateError ? 'arrival-date-format arrival-date-error' : 'arrival-date-format'} />
          <input className="booking-date-picker" type="date" name="arrival" min={today} value={arrival} dir="rtl" aria-label="اختيار تاريخ الوصول من التقويم" onChange={(event) => {
            const value = event.currentTarget.value
            setArrival(value)
            setArrivalDisplay(formatArrivalDate(value))
            setDateError('')
          }} />
          <span className="booking-date-calendar" aria-hidden="true"><CalendarDays /></span>
        </div>
        <span className="sr-only" id="arrival-date-format">أدخل اليوم ثم الشهر ثم السنة، أو اختر التاريخ من التقويم.</span>
      </div>
      <label>عدد الليالي<input type="number" name="nights" min="1" max="365" inputMode="numeric" value={nights} onChange={(event) => { setNights(event.currentTarget.value); setDateError('') }} required /></label>
    </div>
    {dateError && <p className="booking-date-error" id="arrival-date-error" role="alert">{dateError}</p>}
    <div className="booking-price-summary" aria-live="polite">
      <span>التكلفة التقديرية{variesPrice ? ' (تبدأ من)' : ''} · {formatPrice(unitPrice)} ر.س / {periodLabel}</span>
      <strong>{formatPrice(estimatedTotal)} <small>ر.س</small></strong>
    </div>
    <button className="button-whatsapp full" type="submit"><MessageCircle aria-hidden="true" /> احجز عبر واتساب <ArrowLeft aria-hidden="true" /></button>
  </form>
}

export function BookingRequestFormFromQuery() {
  const searchParams = useSearchParams()
  const unit = searchParams.get('unit') ?? undefined

  return <BookingRequestForm initialUnit={unit} />
}
