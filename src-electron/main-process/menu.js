let template = [
    {
        label: "Edit",
        submenu: [
            { role: "undo" },
            { role: "redo" },
            { type: "separator" },
            { role: "cut" },
            { role: "copy" },
            { role: "paste" },
            { role: "pasteandmatchstyle" },
            { role: "delete" },
            { role: "selectall" }
        ]
    },
    {
        label: "View",
        submenu: [
            { role: "resetzoom" },
            { role: "zoomin" },
            { role: "zoomout" },
            { type: "separator" },
            { role: "togglefullscreen" }
        ]
    },
    {
        role: "window",
        submenu: [
            { role: "minimize" },
            { role: "close" }
        ]
    },
    {
        role: "help",
        submenu: [
            {
                label: "Learn More",
                click () { require("electron").shell.openExternal("https://arqma.com/") }
            }
        ]
    }
]

if (process.platform === "darwin") {
    template.unshift({
        label: "Arqma Electron Wallet",
        submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideothers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" }
        ]
    })

    // Window menu
    template[3].submenu = [
        { role: "close" },
        { role: "minimize" },
        { role: "zoom" },
        { type: "separator" },
        { role: "front" }
    ]
}

export default template
