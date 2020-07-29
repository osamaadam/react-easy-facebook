import { FacebookFields, FacebookResponse, Options } from "./types";
export interface Props {
    appId: string;
    version?: string;
    options?: Options;
    force?: boolean;
    fields?: Partial<FacebookFields>[] | string;
}
declare const useFacebook: (props: Props) => {
    fbRes: FacebookResponse | undefined;
    login: (fields?: string | undefined) => void;
};
export default useFacebook;
