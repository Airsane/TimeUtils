import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  cs: {
    translation: {
      app: {
        badge: 'Time Utils',
        title: 'Převody času a rychlé výpočty',
        subtitle: 'Moderní nástroj pro převody jednotek a počítání času v jednom přehledném panelu.',
        footer: 'Jednoduchý, rychlý a přesný pomocník pro každodenní práci s časem.',
      },
      units: {
        seconds: 'Sekundy',
        minutes: 'Minuty',
        hours: 'Hodiny',
        days: 'Dny',
        weeks: 'Týdny',
        months: 'Měsíce (průměr)',
        years: 'Roky (průměr)',
      },
      conversion: {
        title: 'Převod jednotek',
        chip: 'Typovaný výstup',
        valueLabel: 'Hodnota',
        valuePlaceholder: 'Zadej číslo',
        fromLabel: 'Z jednotky',
        toLabel: 'Na jednotku',
        resultLabel: 'Výsledek',
        breakdownLabel: 'Rozklad',
        hint: 'Převody měsíců a roků používají průměrné hodnoty (365,2425 dní za rok).',
      },
      timeCalc: {
        title: 'Přičíst k času',
        chip: '24h formát',
        baseTime: 'Výchozí čas',
        addHours: 'Přičíst hodiny',
        addMinutes: 'Přičíst minuty',
        resultLabel: 'Nový čas',
        offsetLabel: 'Posun:',
        invalidFormat: 'Zadej čas ve formátu HH:MM',
        preset1: '+1h 30m',
        preset2: '+8h',
        preset3: '-2h',
      },
      time: {
        day_one: 'den',
        day_few: 'dny',
        day_many: 'dní',
        day_other: 'dní',
        month_one: 'měsíc',
        month_few: 'měsíce',
        month_many: 'měsíců',
        month_other: 'měsíců',
        year_one: 'rok',
        year_few: 'roky',
        year_many: 'let',
        year_other: 'let',
        seconds_one: 'sekunda',
        seconds_few: 'sekundy',
        seconds_many: 'sekund',
        seconds_other: 'sekund',
      },
      common: {
        zero: '0',
      },
    },
  },
  en: {
    translation: {
      app: {
        badge: 'Time Utils',
        title: 'Time conversions and quick calculations',
        subtitle: 'A modern tool for unit conversions and time math in a clean, focused layout.',
        footer: 'Simple, fast, and accurate helper for everyday time work.',
      },
      units: {
        seconds: 'Seconds',
        minutes: 'Minutes',
        hours: 'Hours',
        days: 'Days',
        weeks: 'Weeks',
        months: 'Months (avg)',
        years: 'Years (avg)',
      },
      conversion: {
        title: 'Unit conversion',
        chip: 'Typed output',
        valueLabel: 'Value',
        valuePlaceholder: 'Enter a number',
        fromLabel: 'From unit',
        toLabel: 'To unit',
        resultLabel: 'Result',
        breakdownLabel: 'Breakdown',
        hint: 'Month and year conversions use average values (365.2425 days per year).',
      },
      timeCalc: {
        title: 'Add to time',
        chip: '24h format',
        baseTime: 'Base time',
        addHours: 'Add hours',
        addMinutes: 'Add minutes',
        resultLabel: 'New time',
        offsetLabel: 'Offset:',
        invalidFormat: 'Enter time in HH:MM format',
        preset1: '+1h 30m',
        preset2: '+8h',
        preset3: '-2h',
      },
      time: {
        day_one: 'day',
        day_other: 'days',
        month_one: 'month',
        month_other: 'months',
        year_one: 'year',
        year_other: 'years',
        seconds_one: 'second',
        seconds_other: 'seconds',
      },
      common: {
        zero: '0',
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'cs',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
