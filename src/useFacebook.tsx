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
  fields?: Partial<FacebookFields>[] | string;
  handleError?: (error: Error) => any;
}

const extendedWindow: ExtendedWindow = window;

const useFacebook = (props: Props) => {
  const { appId, version, options, fields, handleError } = props;

  const defaultFields = fields?.toString() || "id,email,name";
  const defaultScope = options?.scope.toString() || "email";
  const defaultOptions = { ...options, scope: defaultScope };

  const [fbRes, setFbRes] = React.useState<FacebookResponse | undefined>();

  const checkLoginState = (
    res: FacebookResponse,
    fields: string = defaultFields
  ) => {
    try {
      if (res.authResponse)
        extendedWindow.FB?.api("/me", "GET", { fields }, (user) =>
          setFbRes({ ...res, user })
        );
    } catch (error) {
      if (handleError) handleError(error);
      else console.error(error);
    }
  };

  const login = React.useCallback(
    (inputFields?: Props["fields"], force?: boolean) => {
      try {
        const sanitizedFields = inputFields?.toString() || defaultFields;
        extendedWindow.FB?.getLoginStatus((res) => {
          if (res.status === "connected") checkLoginState(res, sanitizedFields);
          else
            extendedWindow.FB?.login((res) => {
              checkLoginState(res, sanitizedFields);
            }, defaultOptions);
        }, force);
      } catch (error) {
        if (handleError) handleError(error);
        else console.error(error);
      }
    },
    []
  );

  const logout = React.useCallback(() => {
    try {
      extendedWindow.FB?.logout((res) => {
        setFbRes(res);
      });
    } catch (error) {
      if (handleError) handleError(error);
      else console.error(error);
    }
  }, []);

  React.useEffect(() => {
    if (!document.getElementById("facebook-jssdk")) {
      try {
        loadSdk();
        asyncInit({ appId, version });
      } catch (error) {
        if (handleError) handleError(error);
        else console.error(error);
      }
    }
  }, []);

  return { response: fbRes, login, logout };
};

export default useFacebook;
