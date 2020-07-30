export const loadSdk = () => {
  ((document: Document, script: string, id: string) => {
    let js: HTMLScriptElement,
      fjs = document.getElementsByTagName(script)[0];
    if (document.getElementById(id)) {
      return;
    }
    js = document.createElement(script) as HTMLScriptElement;
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode?.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};
