import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      credit_score: "Credit Score",
      balance: "Total Debt",
      ledger: "Digital Ledger",
      give: "You Gave (Credit)",
      receive: "You Got (Debit)",
      offline: "You are Offline",
      pay: "Pay",
      scan_qr: "Scan QR",
      offline_code: "Offline Code",
      mfi_portal: "MFI Portal",
      search_placeholder: "Borrower Mobile Number",
      // NEW KEYS
      change_lang: "हिन्दी", // Button to switch to Hindi
      dispute: "Dispute",
      dispute_msg: "Flag this transaction as incorrect?",
      flagged: "FLAGGED"
    },
  },
  hi: {
    translation: {
      welcome: "स्वागत है",
      credit_score: "क्रेडिट स्कोर",
      balance: "कुल कर्ज",
      ledger: "डिजिटल बही-खाता",
      give: "उधार दिया",
      receive: "उधार लिया",
      offline: "आप ऑफ़लाइन हैं",
      pay: "भुगतान",
      scan_qr: "QR स्कैन करें",
      offline_code: "ऑफ़लाइन कोड",
      mfi_portal: "ऋणदाता पोर्टल",
      search_placeholder: "उधारकर्ता मोबाइल नंबर",
      // NEW KEYS
      change_lang: "English", // Button to switch to English
      dispute: "विवाद (Dispute)",
      dispute_msg: "क्या यह लेनदेन गलत है?",
      flagged: "विवादित"
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', 
  interpolation: { escapeValue: false },
});

export default i18n;