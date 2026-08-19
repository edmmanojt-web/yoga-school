/**
 * Translation strings for the Yoga School platform.
 * English (default).
 *
 * Usage: import { t } from '@/content/i18n';
 * Then: t('en', 'hero.tagline')
 */

export type TranslationKey =
  | "hero.tagline"
  | "hero.description"
  | "hero.cta.primary"
  | "hero.cta.secondary"
  | "nav.yoga"
  | "nav.breathwork"
  | "nav.mindfulness"
  | "nav.journey"
  | "nav.workshops"
  | "nav.schedule"
  | "nav.community"
  | "nav.about"
  | "journey.title"
  | "journey.subtitle"
  | "journey.tagline"
  | "journey.description"
  | "journey.cta"
  | "journey.day.intention"
  | "journey.day.practice"
  | "journey.day.observe"
  | "journey.day.reflect"
  | "journey.day.share"
  | "poll.thanks"
  | "reflection.placeholder"
  | "reflection.private"
  | "reflection.share"
  | "common.book"
  | "common.signin"
  | "common.signup"
  | "common.back"
  | "common.save"
  | "common.cancel"
  | "common.loading"
  | "common.error"
  | "common.tryagain";

export type SupportedLocale = "en" | "hi" | "mr";

type Translations = Record<TranslationKey, string>;
type AllTranslations = Record<SupportedLocale, Translations>;

const translations: AllTranslations = {
  en: {
    "hero.tagline": "Come back to yourself.",
    "hero.description":
      "Explore yoga, breathwork and mindfulness as practices for becoming more aware — on the mat and in everyday life.",
    "hero.cta.primary": "Explore Our Offerings",
    "hero.cta.secondary": "Start the 7-Day Journey",

    "nav.yoga": "Yoga",
    "nav.breathwork": "Breathwork",
    "nav.mindfulness": "Mindfulness",
    "nav.journey": "Beyond the Mat",
    "nav.workshops": "Workshops",
    "nav.schedule": "Schedule",
    "nav.community": "Community",
    "nav.about": "About",

    "journey.title": "Yoga Beyond the Mat",
    "journey.subtitle": "A 7-Day Awareness Journey",
    "journey.tagline": "What if yoga didn't begin on the mat?",
    "journey.description":
      "A simple 7-day experiment to notice how you think, move, eat, work and respond — without adding another hour to your day.",
    "journey.cta": "Start the 7-Day Journey — Free",
    "journey.day.intention": "Intention",
    "journey.day.practice": "Practice",
    "journey.day.observe": "Observe",
    "journey.day.reflect": "Reflect",
    "journey.day.share": "Share",

    "poll.thanks": "Thank you for noticing.",
    "reflection.placeholder": "What came up for you today?",
    "reflection.private": "Private",
    "reflection.share": "Share with community",

    "common.book": "Book",
    "common.signin": "Sign in",
    "common.signup": "Create account",
    "common.back": "Back",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.loading": "Loading…",
    "common.error": "Something went wrong.",
    "common.tryagain": "Please try again.",
  },

  hi: {
    "hero.tagline": "अपने आप में वापस आएं।",
    "hero.description":
      "योग, श्वास और माइंडफुलनेस को जागरूकता के अभ्यास के रूप में खोजें — चटाई पर और रोजमर्रा की जिंदगी में।",
    "hero.cta.primary": "हमारी पेशकशें देखें",
    "hero.cta.secondary": "7-दिन की यात्रा शुरू करें",

    "nav.yoga": "योग",
    "nav.breathwork": "श्वास अभ्यास",
    "nav.mindfulness": "माइंडफुलनेस",
    "nav.journey": "मैट से परे",
    "nav.workshops": "वर्कशॉप",
    "nav.schedule": "समय-सारिणी",
    "nav.community": "समुदाय",
    "nav.about": "हमारे बारे में",

    "journey.title": "योग मैट से परे",
    "journey.subtitle": "एक 7-दिवसीय जागरूकता यात्रा",
    "journey.tagline": "क्या होगा अगर योग चटाई से पहले शुरू हो?",
    "journey.description":
      "7 दिनों का एक सरल प्रयोग — यह नोटिस करना कि आप कैसे सोचते हैं, चलते हैं, खाते हैं, काम करते हैं।",
    "journey.cta": "7-दिन की यात्रा शुरू करें — निःशुल्क",
    "journey.day.intention": "इरादा",
    "journey.day.practice": "अभ्यास",
    "journey.day.observe": "निरीक्षण करें",
    "journey.day.reflect": "विचार करें",
    "journey.day.share": "साझा करें",

    "poll.thanks": "ध्यान देने के लिए धन्यवाद।",
    "reflection.placeholder": "आज आपके मन में क्या आया?",
    "reflection.private": "निजी",
    "reflection.share": "समुदाय के साथ साझा करें",

    "common.book": "बुक करें",
    "common.signin": "साइन इन",
    "common.signup": "खाता बनाएं",
    "common.back": "वापस",
    "common.save": "सहेजें",
    "common.cancel": "रद्द करें",
    "common.loading": "लोड हो रहा है…",
    "common.error": "कुछ गलत हो गया।",
    "common.tryagain": "कृपया पुनः प्रयास करें।",
  },

  mr: {
    "hero.tagline": "स्वतःकडे परत या.",
    "hero.description":
      "योग, श्वास आणि माइंडफुलनेस चे अन्वेषण करा — योगाच्या चटईवर आणि रोजच्या जीवनात.",
    "hero.cta.primary": "आमच्या अभ्यासक्रमांची माहिती घ्या",
    "hero.cta.secondary": "७-दिवसीय प्रवास सुरू करा",

    "nav.yoga": "योग",
    "nav.breathwork": "श्वास अभ्यास",
    "nav.mindfulness": "माइंडफुलनेस",
    "nav.journey": "चटईपलीकडे",
    "nav.workshops": "कार्यशाळा",
    "nav.schedule": "वेळापत्रक",
    "nav.community": "समुदाय",
    "nav.about": "आमच्याबद्दल",

    "journey.title": "योग चटईपलीकडे",
    "journey.subtitle": "एक ७-दिवसीय जागरूकता प्रवास",
    "journey.tagline": "जर योग चटईच्या आधी सुरू झाला तर?",
    "journey.description":
      "७ दिवसांचा एक साधा प्रयोग — तुम्ही कसे विचार करता, चालता, खाता, काम करता याचे निरीक्षण करणे.",
    "journey.cta": "७-दिवसीय प्रवास सुरू करा — विनामूल्य",
    "journey.day.intention": "हेतू",
    "journey.day.practice": "अभ्यास",
    "journey.day.observe": "निरीक्षण करा",
    "journey.day.reflect": "विचार करा",
    "journey.day.share": "शेअर करा",

    "poll.thanks": "लक्ष दिल्याबद्दल धन्यवाद.",
    "reflection.placeholder": "आज तुमच्या मनात काय आलं?",
    "reflection.private": "खाजगी",
    "reflection.share": "समुदायाशी शेअर करा",

    "common.book": "बुक करा",
    "common.signin": "साइन इन",
    "common.signup": "खाते तयार करा",
    "common.back": "मागे",
    "common.save": "जतन करा",
    "common.cancel": "रद्द करा",
    "common.loading": "लोड होत आहे…",
    "common.error": "काहीतरी चुकले.",
    "common.tryagain": "कृपया पुन्हा प्रयत्न करा.",
  },
};

export function t(locale: SupportedLocale, key: TranslationKey): string {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}

export function getTranslations(locale: SupportedLocale): Translations {
  return { ...translations.en, ...translations[locale] };
}

export { translations };
