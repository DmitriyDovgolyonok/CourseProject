import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import {initReactI18next} from 'react-i18next'

let languages = ['en', 'ru']
let config = {
    supportedLngs: languages, fallbackLng: languages, interpolation: {escapeValue: false}
}

i18next
    .use(initReactI18next)
    .use(HttpBackend)
    .use(LanguageDetector)
    .init(config)

export default i18next
