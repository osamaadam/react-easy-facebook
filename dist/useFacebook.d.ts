import { FacebookFields, FacebookResponse, Options } from "./types";
export interface Props {
    appId: string;
    version?: string;
    options?: Options;
    force?: boolean;
    fields?: Partial<FacebookFields>[] | string;
}
declare const useFacebook: (props: Props) => {
    response: FacebookResponse | undefined;
    login: (inputFields?: Props["fields"]) => void;
    logout: () => void;
};
export default useFacebook;
