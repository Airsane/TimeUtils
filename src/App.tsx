import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'

type TimeUnitId =
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years'

type TimeUnit = {
  id: TimeUnitId
  seconds: number
}

const TIME_UNITS: TimeUnit[] = [
  { id: 'seconds', seconds: 1 },
  { id: 'minutes', seconds: 60 },
  { id: 'hours', seconds: 60 * 60 },
  { id: 'days', seconds: 60 * 60 * 24 },
  { id: 'weeks', seconds: 60 * 60 * 24 * 7 },
  { id: 'months', seconds: 60 * 60 * 24 * 30.436875 },
  { id: 'years', seconds: 60 * 60 * 24 * 365.2425 },
]

const parseTimeInput = (value: string) => {
  const [hoursRaw, minutesRaw] = value.split(':')
  const hours = Number(hoursRaw)
  const minutes = Number(minutesRaw)
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null
  return hours * 60 + minutes
}

const formatTime = (totalMinutes: number) => {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440
  const hours = Math.floor(normalized / 60)
  const minutes = normalized % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

function App() {
  const { t, i18n } = useTranslation()
  const [value, setValue] = useState('365')
  const [fromUnit, setFromUnit] = useState<TimeUnitId>('days')
  const [toUnit, setToUnit] = useState<TimeUnitId>('years')
  const [timeInput, setTimeInput] = useState('08:30')
  const [addHours, setAddHours] = useState('1')
  const [addMinutes, setAddMinutes] = useState('45')
  const language = i18n.language.startsWith('cs') ? 'cs-CZ' : 'en-US'

  const numberFormatter = useMemo(
    () =>
      new Intl.NumberFormat(language, {
        maximumFractionDigits: 6,
      }),
    [language],
  )

  const integerFormatter = useMemo(
    () =>
      new Intl.NumberFormat(language, {
        maximumFractionDigits: 0,
      }),
    [language],
  )

  const conversion = useMemo(() => {
    const numericValue = Number(value.replace(',', '.'))
    if (!Number.isFinite(numericValue)) {
      return { result: '—', seconds: 0, numericValue, valid: false }
    }
    const from = TIME_UNITS.find((unit) => unit.id === fromUnit)
    const to = TIME_UNITS.find((unit) => unit.id === toUnit)
    if (!from || !to) {
      return { result: '—', seconds: 0, numericValue, valid: false }
    }
    const seconds = numericValue * from.seconds
    const result = seconds / to.seconds
    return { result: numberFormatter.format(result), seconds, numericValue, valid: true }
  }, [value, fromUnit, toUnit])

  const breakdown = useMemo(() => {
    if (!conversion.valid) return null
    if (fromUnit !== 'days' || toUnit !== 'years') return null
    const totalDays = conversion.numericValue
    if (!Number.isFinite(totalDays)) return null
    const sign = totalDays < 0 ? '-' : ''
    let remaining = Math.abs(totalDays)
    const daysPerYear = 365.2425
    const daysPerMonth = 30.436875
    const years = Math.floor(remaining / daysPerYear)
    remaining -= years * daysPerYear
    const months = Math.floor(remaining / daysPerMonth)
    remaining -= months * daysPerMonth
    const days = Math.round(remaining)
    return {
      sign,
      years,
      months,
      days,
    }
  }, [conversion, fromUnit, toUnit])

  const timeResult = useMemo(() => {
    const baseMinutes = parseTimeInput(timeInput)
    if (baseMinutes === null) {
      return { time: '—', dayOffset: 0, valid: false }
    }
    const hours = Number(addHours)
    const minutes = Number(addMinutes)
    const hoursDelta = Number.isFinite(hours) ? hours : 0
    const minutesDelta = Number.isFinite(minutes) ? minutes : 0
    const totalMinutes = baseMinutes + hoursDelta * 60 + minutesDelta
    const dayOffset = Math.floor(totalMinutes / 1440)
      return { time: formatTime(totalMinutes), dayOffset, valid: true }
  }, [timeInput, addHours, addMinutes])

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-top">
          <div className="badge">{t('app.badge')}</div>
          <div className="lang-toggle">
            <button
              type="button"
              className={language.startsWith('cs') ? 'active' : ''}
              onClick={() => i18n.changeLanguage('cs')}
            >
              CZ
            </button>
            <button
              type="button"
              className={language.startsWith('en') ? 'active' : ''}
              onClick={() => i18n.changeLanguage('en')}
            >
              EN
            </button>
          </div>
        </div>
        <h1>{t('app.title')}</h1>
        <p>{t('app.subtitle')}</p>
      </header>

      <main className="grid">
        <section className="card">
          <div className="card-header">
            <h2>{t('conversion.title')}</h2>
            <span className="chip">{t('conversion.chip')}</span>
          </div>

          <div className="field">
            <label>{t('conversion.valueLabel')}</label>
            <input
              type="text"
              inputMode="decimal"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={t('conversion.valuePlaceholder')}
            />
          </div>

          <div className="field-grid">
            <div className="field">
              <label>{t('conversion.fromLabel')}</label>
              <select value={fromUnit} onChange={(event) => setFromUnit(event.target.value as TimeUnitId)}>
                {TIME_UNITS.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {t(`units.${unit.id}`)}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>{t('conversion.toLabel')}</label>
              <select value={toUnit} onChange={(event) => setToUnit(event.target.value as TimeUnitId)}>
                {TIME_UNITS.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {t(`units.${unit.id}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="result">
            <div>
              <span className="result-label">{t('conversion.resultLabel')}</span>
              <p className="result-value">{conversion.result}</p>
            </div>
            <div className="result-meta">
              {conversion.valid
                ? `${numberFormatter.format(conversion.seconds)} ${t('time.seconds', {
                    count: conversion.seconds,
                  })}`
                : '—'}
            </div>
          </div>

          {breakdown ? (
            <div className="breakdown">
              {t('conversion.breakdownLabel')}: {breakdown.sign}
              {integerFormatter.format(breakdown.years)} {t('time.year', { count: breakdown.years })},{' '}
              {integerFormatter.format(breakdown.months)} {t('time.month', { count: breakdown.months })},{' '}
              {integerFormatter.format(breakdown.days)} {t('time.day', { count: breakdown.days })}
            </div>
          ) : null}

          <p className="hint">{t('conversion.hint')}</p>
        </section>

        <section className="card accent">
          <div className="card-header">
            <h2>{t('timeCalc.title')}</h2>
            <span className="chip">{t('timeCalc.chip')}</span>
          </div>

          <div className="field-grid two-rows">
            <div className="field">
              <label>{t('timeCalc.baseTime')}</label>
              <input
                type="time"
                value={timeInput}
                onChange={(event) => setTimeInput(event.target.value)}
              />
            </div>
            <div className="field">
              <label>{t('timeCalc.addHours')}</label>
              <input
                type="number"
                value={addHours}
                onChange={(event) => setAddHours(event.target.value)}
                placeholder={t('common.zero')}
              />
            </div>
            <div className="field">
              <label>{t('timeCalc.addMinutes')}</label>
              <input
                type="number"
                value={addMinutes}
                onChange={(event) => setAddMinutes(event.target.value)}
                placeholder={t('common.zero')}
              />
            </div>
          </div>

          <div className="result large">
            <div>
              <span className="result-label">{t('timeCalc.resultLabel')}</span>
              <p className="result-value">{timeResult.time}</p>
            </div>
            <div className="result-meta">
              {timeResult.valid ? (
                <>
                  {t('timeCalc.offsetLabel')}{' '}
                  {timeResult.dayOffset >= 0 ? '+' : '-'}
                  {Math.abs(timeResult.dayOffset)}{' '}
                  {t('time.day', { count: Math.abs(timeResult.dayOffset) })}
                </>
              ) : (
                t('timeCalc.invalidFormat')
              )}
            </div>
          </div>

          <div className="preset-row">
            <button type="button" onClick={() => { setAddHours('1'); setAddMinutes('30') }}>
              {t('timeCalc.preset1')}
            </button>
            <button type="button" onClick={() => { setAddHours('8'); setAddMinutes('0') }}>
              {t('timeCalc.preset2')}
            </button>
            <button type="button" onClick={() => { setAddHours('-2'); setAddMinutes('0') }}>
              {t('timeCalc.preset3')}
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">{t('app.footer')}</footer>
    </div>
  )
}

export default App
