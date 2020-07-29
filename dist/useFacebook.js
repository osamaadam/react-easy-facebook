import React from "react";
const useFacebook = (props) => {
    const { appId, version, options, force, fields } = props;
    const defaultFields = (fields === null || fields === void 0 ? void 0 : fields.toString()) || "id,email,name";
    const defaultScope = (options === null || options === void 0 ? void 0 : options.scope.toString()) || "email";
    const defaultOptions = Object.assign(Object.assign({}, options), { scope: defaultScope });
    const [fbRes, setFbRes] = React.useState();
    const extendedWindow = window;
    const asyncInit = () => {
        extendedWindow.fbAsyncInit = () => {
            var _a;
            (_a = extendedWindow.FB) === null || _a === void 0 ? void 0 : _a.init({
                appId,
                cookie: true,
                xfbml: true,
                version: version || "v7.0",
            });
        };
    };
    const loadSdk = () => {
        ((d, s, id) => {
            var _a;
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            (_a = fjs.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    };
    const checkLoginState = (res, fields = defaultFields) => {
        var _a;
        if (res.error)
            setFbRes(res);
        else if (res.authResponse)
            (_a = extendedWindow.FB) === null || _a === void 0 ? void 0 : _a.api("/me", "GET", { fields }, (user) => setFbRes(Object.assign(Object.assign({}, res), { user })));
    };
    const login = React.useCallback((inputFields) => {
        var _a;
        const sanitizedFields = (inputFields === null || inputFields === void 0 ? void 0 : inputFields.toString()) || defaultFields;
        (_a = extendedWindow.FB) === null || _a === void 0 ? void 0 : _a.getLoginStatus((res) => {
            var _a;
            if (res.error)
                setFbRes(res);
            else if (res.status === "connected")
                checkLoginState(res, sanitizedFields);
            else
                (_a = extendedWindow.FB) === null || _a === void 0 ? void 0 : _a.login((res) => {
                    checkLoginState(res, sanitizedFields);
                }, defaultOptions);
        }, force);
    }, []);
    React.useEffect(() => {
        var _a;
        if (document.getElementById("facebook-jssdk")) {
            (_a = extendedWindow.FB) === null || _a === void 0 ? void 0 : _a.getLoginStatus((res) => {
                if (res.error)
                    setFbRes(res);
                else if (res.status === "connected")
                    checkLoginState(res, defaultFields);
            });
        }
        else {
            asyncInit();
            loadSdk();
        }
    }, []);
    return { fbRes, login };
};
export default useFacebook;
//# sourceMappingURL=useFacebook.js.map