import React from "react";
import { asyncInit } from "./asyncInit";
import { loadSdk } from "./loadSdk";
const extendedWindow = window;
const useFacebook = (props) => {
    const { appId, version, options, force, fields } = props;
    const defaultFields = (fields === null || fields === void 0 ? void 0 : fields.toString()) || "id,email,name";
    const defaultScope = (options === null || options === void 0 ? void 0 : options.scope.toString()) || "email";
    const defaultOptions = Object.assign(Object.assign({}, options), { scope: defaultScope });
    const [fbRes, setFbRes] = React.useState();
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
    const logout = React.useCallback(() => {
        var _a;
        (_a = extendedWindow.FB) === null || _a === void 0 ? void 0 : _a.logout((res) => {
            setFbRes(res);
        });
    }, []);
    React.useEffect(() => {
        if (!document.getElementById("facebook-jssdk")) {
            loadSdk();
            asyncInit({ appId, version });
        }
    }, []);
    return { response: fbRes, login, logout };
};
export default useFacebook;
//# sourceMappingURL=useFacebook.js.map