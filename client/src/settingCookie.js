const root = typeof window === 'object' ? window : {};

function settingCookie() {
    if (root && root.document) {
        document.cookie = 'info=Hello';
    }
}

module.exports = settingCookie;