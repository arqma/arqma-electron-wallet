import enUS from "./en-us"

// ADD LANGUAGES HERE
const languages = [
    { name: "English", code: "en-us", flag: "gb" },
    { name: "中文", code: "zh-cn", flag: "cn" },
    { name: "русский", code: "ru", flag: "ru" },
    { name: "Deutsche", code: "de", flag: "de" },
    { name: "Français", code: "fr", flag: "fr" },
    { name: "Español", code: "es", flag: "es" },
    { name: "Português", code: "pt-br", flag: "pt" },
    { name: "Čeština", code: "cs", flag: "cz" },
    { name: "Polski", code: "pl", flag: "pl" }
]

export { languages }

// DO NOT MODIFY THIS EXPORT, LANGUAGE FILES CAN BE DYNAMICALLY LOADED
export default {
    "en-us": enUS
}
