import React from "react";
import {
  ExtendedWindow,
  FacebookFields,
  FacebookResponse,
  Options,
} from "./types";

export interface Props {
  appId: string;
  version?: string;
  options?: Options;
  force?: boolean;
  fields?: Partial<FacebookFields>[] | string;
}

const useFacebook = (props: Props) => {
  const { appId, version, options, force, fields } = props;

  const defaultFields = fields?.toString() || "id,email,name";
  const defaultScope = options?.scope.toString() || "email";
  const defaultOptions = { ...options, scope: defaultScope };

  const [fbRes, setFbRes] = React.useState<FacebookResponse | undefined>();

  const extendedWindow: ExtendedWindow = window;

  const asyncInit = () => {
    extendedWindow.fbAsyncInit = () => {
      extendedWindow.FB?.init({
        appId,
        cookie: true,
        xfbml: true,
        version: version || "v7.0",
      });
    };
  };

  const loadSdk = () => {
    ((d, s, id) => {
      let js: HTMLIFrameElement,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s) as HTMLIFrameElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  const checkLoginState = (
    res: FacebookResponse,
    fields: string = defaultFields
  ) => {
    if (res.error) setFbRes(res);
    else if (res.authResponse)
      extendedWindow.FB?.api("/me", "GET", { fields }, (user) =>
        setFbRes({ ...res, user })
      );
  };

  const login = React.useCallback((inputFields?: Props["fields"]) => {
    const sanitizedFields = inputFields?.toString() || defaultFields;
    extendedWindow.FB?.getLoginStatus((res) => {
      if (res.error) setFbRes(res);
      else if (res.status === "connected")
        checkLoginState(res, sanitizedFields);
      else
        extendedWindow.FB?.login((res) => {
          checkLoginState(res, sanitizedFields);
        }, defaultOptions);
    }, force);
  }, []);

  React.useEffect(() => {
    if (document.getElementById("facebook-jssdk")) {
      extendedWindow.FB?.getLoginStatus((res) => {
        if (res.error) setFbRes(res);
        else if (res.status === "connected")
          checkLoginState(res, defaultFields);
      });
    } else {
      asyncInit();
      loadSdk();
    }
  }, []);

  return { fbRes, login };
};

export default useFacebook;
