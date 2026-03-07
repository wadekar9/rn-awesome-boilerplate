import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useAppTranslation = () => {
    const { t, i18n } = useTranslation();

    const messages_t = useCallback((key: string, options?: any): string => t(`messages:${key}`, options) as string, [t]);
    const common_t = useCallback((key: string, options?: any): string => t(`common:${key}`, options) as string, [t]);
    const actions_t = useCallback((key: string, options?: any): string => t(`actions:${key}`, options) as string, [t]);

    return {
        t,
        i18n,
        messages_t,
        common_t,
        actions_t
    };
};
