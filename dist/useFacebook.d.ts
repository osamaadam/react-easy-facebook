import { FacebookFields, FacebookResponse, Options } from "./types";
export interface Props {
    appId: string;
    version?: string;
    options?: Options;
    fields?: Partial<FacebookFields>[] | string;
    handleError?: (error: Error) => any;
}
declare const useFacebook: (props: Props) => {
    response: FacebookResponse | undefined;
    login: (inputFields?: Props["fields"], force?: boolean | undefined) => void;
    logout: () => void;
};
export default useFacebook;
