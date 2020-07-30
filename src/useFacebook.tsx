import React from "react";
import {
  ExtendedWindow,
  FacebookFields,
  FacebookResponse,
  Options,
} from "./types";
import { asyncInit } from "./asyncInit";
import { loadSdk } from "./loadSdk";

export interface Props {
  appId: string;
  version?: string;
  options?: Options;
  force?: boolean;
  fields?: Partial<FacebookFields>[] | string;
}

const extendedWindow: ExtendedWindow = window;

const useFacebook = (props: Props) => {
  const { appId, version, options, force, fields } = props;

  const defaultFields = fields?.toString() || "id,email,name";
  const defaultScope = options?.scope.toString() || "email";
  const defaultOptions = { ...options, scope: defaultScope };

  const [fbRes, setFbRes] = React.useState<FacebookResponse | undefined>();

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

  const logout = React.useCallback(() => {
    extendedWindow.FB?.logout((res) => {
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
