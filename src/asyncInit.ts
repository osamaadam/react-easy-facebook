import { ExtendedWindow } from "./types";

const extendedWindow: ExtendedWindow = window;

export const asyncInit = ({
  appId,
  cookie = true,
  xfbml = true,
  version = "v7.0",
}: {
  appId: string;
  cookie?: boolean;
  xfbml?: boolean;
  version?: string;
}) => {
  extendedWindow.fbAsyncInit = () => {
    extendedWindow.FB?.init({
      appId,
      cookie,
      xfbml,
      version,
    });
  };
};
