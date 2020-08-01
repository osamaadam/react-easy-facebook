const extendedWindow = window;
export const asyncInit = ({ appId, cookie = true, xfbml = true, version = "v7.0", }) => {
    extendedWindow.fbAsyncInit = () => {
        var _a;
        (_a = extendedWindow.FB) === null || _a === void 0 ? void 0 : _a.init({
            appId,
            cookie,
            xfbml,
            version,
        });
    };
};
