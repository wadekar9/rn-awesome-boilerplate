import { ScrollView, Text, TextInput } from "react-native";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
Text.defaultProps.numberOfLines = 1;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
TextInput.defaultProps.cursorColor = 'red';

ScrollView.defaultProps = ScrollView.defaultProps || {};
ScrollView.defaultProps.showsVerticalScrollIndicator = false;
ScrollView.defaultProps.showsHorizontalScrollIndicator = false;