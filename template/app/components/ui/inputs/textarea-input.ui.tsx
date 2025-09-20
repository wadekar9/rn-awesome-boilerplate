import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { Colors } from '$constants/colors.constants';
import { useAppTheme } from '$hooks/common';
import { ITheme } from '$types/common.types';

interface TextareaInputRef {
  clear: () => void;
  blur: () => void;
  focus: () => void;
}

interface TextareaInputProps extends Omit<TextInputProps, 'style' | 'editable' | 'multiline'> {
  label?: string;
  error?: string;
  disabled?: boolean;
  LeftAccessory?: React.ReactNode;
}

const TextareaInput = React.forwardRef<TextareaInputRef, TextareaInputProps>(({
  label,
  error,
  disabled = false,
  LeftAccessory,
  ...props
}, ref) => {

  const { colors, theme } = useAppTheme();
  const styles = styling(theme);

  const inputRef = React.useRef<TextInput>(null);

  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  React.useImperativeHandle(ref, () => ({
    clear: () => null,
    blur: () => null,
    focus: () => null,
  }), [])

  const handleFocus = React.useCallback((e: any) => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus(e);
  }, [props]);

  const handleBlur = React.useCallback((e: any) => {
    setIsFocused(false);
    if (props.onBlur) props.onBlur(e);
  }, [props]);

  const handleSubmitEditing = React.useCallback((e: any) => {
    if (!props.onSubmitEditing) {
      inputRef.current?.blur();
      return
    }
    props.onSubmitEditing(e);
  }, [props]);

  const $EXTRA_STYLES = React.useMemo((): StyleProp<ViewStyle> => {
    if (!LeftAccessory) {
      return { paddingLeft: moderateScale(12), paddingRight: moderateScale(12) }
    }
    return { paddingHorizontal: moderateScale(12) };
  }, [LeftAccessory])

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.containerWrapper, { opacity: disabled ? 0.6 : 1 }, isFocused && { borderColor: colors.primary }]}>
        <View style={[styles.container, $EXTRA_STYLES]}>
          {!!LeftAccessory && (<View style={styles.icon}>{LeftAccessory}</View>)}
          <TextInput
            {...props}
            ref={inputRef}
            numberOfLines={5}
            multiline={true}
            style={styles.textInput}
            placeholder={props.placeholder || "Type Something here..."}
            placeholderTextColor={colors.grey}
            cursorColor={colors.primary}
            editable={!disabled}
            keyboardAppearance={theme}
            blurOnSubmit={props.blurOnSubmit || false}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSubmitEditing={handleSubmitEditing}
          />
        </View>
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text numberOfLines={3} style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
});

export default React.memo(TextareaInput);

const styling = (theme: ITheme) => StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    color: Colors[theme].text,
    fontFamily: EFonts.REGULAR,
    textAlign: 'left',
    textTransform: 'capitalize',
    marginBottom: moderateScale(4)
  },
  containerWrapper: {
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    borderColor: Colors[theme].border,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    height: moderateScale(150),
  },
  textInput: {
    height: '100%',
    fontFamily: EFonts.REGULAR,
    fontSize: EFontSize.XL,
    color: Colors[theme].text,
    paddingVertical: moderateScale(10),
  },
  errorContainer: {
    marginTop: moderateScale(8),
  },
  errorText: {
    fontFamily: EFonts.REGULAR,
    fontSize: moderateScale(13),
    color: Colors[theme].primary,
    flexWrap: 'wrap',
  },
  icon: {
    height: moderateScale(50),
    paddingHorizontal: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'red'
  }
});