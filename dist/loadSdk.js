export const loadSdk = () => {
    ((document, script, id) => {
        var _a;
        let js, fjs = document.getElementsByTagName(script)[0];
        if (document.getElementById(id)) {
            return;
        }
        js = document.createElement(script);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        (_a = fjs.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
};
