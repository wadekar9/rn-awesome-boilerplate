import { useTranslation } from "react-i18next";

export const useAppTranslation = () => {
    const { t, i18n } = useTranslation();

    const messages_t = (key: string, options?: any): string => t(`messages:${key}`, options) as string;
    const common_t = (key: string, options?: any): string => t(`common:${key}`, options) as string;
    const actions_t = (key: string, options?: any): string => t(`actions:${key}`, options) as string;

    return {
        t,
        i18n,
        messages_t,
        common_t,
        actions_t
    };
};
