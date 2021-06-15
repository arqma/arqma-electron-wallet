import VueTimeago from "persian-vue-timeago"
export default ({
    app,
    router,
    store,
    Vue
}) => {
    Vue.use(VueTimeago, {
        name: "Timeago",
        locale: "en",
        locales: {
            ru: require("date-fns/locale/ru"),
            de: require("date-fns/locale/de"),
            fr: require("date-fns/locale/fr"),
            es: require("date-fns/locale/es"),
            pt: require("date-fns/locale/pt"),
            pl: require("date-fns/locale/pl"),
            cs: require("date-fns/locale/cs"),
            cn: require("date-fns/locale/zh_cn"),
            fa: require("date-fns/locale/pl"),
            ar: require("date-fns/locale/ar")

        }
    })
}
