export declare type FacebookResponse = {
    error?: Error;
    status?: "connected" | "not_authorized" | "unknown";
    authResponse?: {
        accessToken: string;
        expiresIn: number;
        signedRequest: string;
        userID: string;
    };
    user?: Partial<User>;
};
export declare type Options = {
    scope: Scope[] | string;
    auth_type?: "rerequest" | "reauthenticate" | "reauthorize";
    return_scopes?: boolean;
    enable_profile_selector?: boolean;
    profile_selector_ids?: string;
};
export interface ExtendedWindow extends Window {
    FB?: {
        init: (input: {
            appId: string;
            cookie: boolean;
            xfbml: boolean;
            version: string;
        }) => any;
        getLoginStatus: (callback: (res: FacebookResponse) => any, force?: boolean) => any;
        login: (callback: (res: FacebookResponse) => any, options?: Options) => any;
        logout: (callback: (res: FacebookResponse) => any) => any;
        api: (path: string, method: "GET" | "POST" | "DELETE", params: {
            fields: string;
        }, callback: (user: FacebookResponse["user"]) => any) => any;
    };
    fbAsyncInit?: () => any;
}
export declare type User = {
    id?: string;
    access_code?: string;
    account_claim_time?: number;
    account_invite_time?: number;
    active?: boolean;
    address?: string;
    age_range?: {
        min?: 13 | 18 | 21;
        max?: 17 | 20;
    };
    birthday?: string;
    can_delete?: boolean;
    can_review_measurement_request?: boolean;
    email?: string;
    name?: string;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    gender?: string;
    hometown?: string;
    location?: string;
    link?: string;
    profile_pic?: string;
    public_key?: string;
    picture?: {
        width?: number;
        height?: number;
        url?: number;
        is_silhouette?: boolean;
    };
    [key: string]: any;
};
export declare type FacebookFields = "id" | "access_code" | "account_claim_time" | "account_invite_time" | "active" | "address" | "age_range" | "birthday" | "can_delete" | "can_review_measurement_request" | "email" | "name" | "first_name" | "middle_name" | "last_name" | "gender" | "hometown" | "location" | "link" | "profile_pic" | "public_key";
declare type Scope = "ads_management" | "ads_read" | "attribution_read" | "business_management" | "catalog_management" | "email" | "groups_access_member_info" | "instagram_basic" | "instagram_manage_comments" | "instagram_manage_insights" | "leads_retrieval" | "pages_manage_ads" | "pages_manage_cta" | "pages_manage_instant_articles" | "pages_manage_engagement" | "pages_manage_metadata" | "pages_manage_posts" | "pages_messaging" | "pages_read_engagement" | "pages_read_user_content" | "pages_show_list" | "pages_user_gender" | "pages_user_locale" | "pages_user_timezone" | "publish_to_groups" | "publish_video" | "read_insights" | "user_age_range" | "user_birthday" | "user_friends" | "user_gender" | "user_hometown" | "user_likes" | "user_link" | "user_photos" | "user_posts" | "user_videos" | "whatsapp_business_management";
export {};
