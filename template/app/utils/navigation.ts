import { AppStackParamsList } from "$types/navigation.types";
import { createNavigationContainerRef } from "@react-navigation/native";

export const appStackNavigationRef = createNavigationContainerRef<AppStackParamsList>();