import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useAppTheme } from '$hooks/common';
import { ITheme } from '$types/common';
import { EFonts, moderateScale } from '$constants/styles.constants';
import { Colors } from '$constants/colors.constants';
import { CalendarOutlineIcon } from '$assets/icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface DatePickerInputProps {
  label?: string;
  error?: string;
  value?: Date | null;
  maximumDate?: Date;
  minimumDate?: Date;
  is24Hour?: boolean;
  onDateChange?: (date: Date) => void;
  pickerMode?: 'datetime' | 'date' | 'time';
  placeholder?: string;
  disabled?: boolean;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  error,
  value = null,
  maximumDate,
  minimumDate,
  is24Hour,
  onDateChange,
  pickerMode = 'date',
  placeholder = 'DD/MM/YYYY',
  disabled = false
}) => {

  const { colors, theme } = useAppTheme();
  const styles = styling(theme);

  const [TODAY_DATE] = useState<Date>(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);

  function showPicker() {
    setIsDatePickerVisible(true);
  };

  function hidePicker() {
    setIsDatePickerVisible(false);
  };

  function onConfirmDate(date: Date) {
    hidePicker();
    onDateChange && onDateChange(date);
  }

  const formatDate = (date: Date) => `${date.toLocaleDateString()}`;

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Pressable
        style={[styles.container, { opacity: disabled ? 0.5 : 1 }]}
        onPress={showPicker}
        disabled={disabled}
      >
        <View style={styles.icon}>
          <CalendarOutlineIcon width={moderateScale(25)} height={moderateScale(25)} stroke={colors.text} />
        </View>
        <View style={styles.content}>
          {value ? (<Text style={styles.value}>{formatDate(value)}</Text>) : (<Text style={[styles.value, styles.placeholder]}>{placeholder}</Text>)}
        </View>
      </Pressable>

      {error && (
        <View style={styles.errorTextWrapper}>
          <Text numberOfLines={3} style={styles.errorText}>{error}</Text>
        </View>
      )}

      <DateTimePickerModal
        mode={pickerMode}
        isVisible={isDatePickerVisible}
        date={value || TODAY_DATE}
        onConfirm={onConfirmDate}
        onCancel={hidePicker}
        isDarkModeEnabled={theme === 'dark'}
        textColor={colors.text}
        is24Hour={is24Hour}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
      />
    </View>
  )
}

export default React.memo(DatePickerInput);

const styling = (theme: ITheme) => StyleSheet.create({
  wrapper: {
    width: '100%'
  },
  container: {
    height: moderateScale(50),
    backgroundColor: Colors[theme].background1,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    borderColor: Colors[theme].border,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  label: {
    color: Colors[theme].text,
    fontFamily: EFonts.REGULAR,
    textAlign: 'left',
    marginBottom: moderateScale(4)
  },
  icon: {
    height: '100%',
    width: undefined,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorTextWrapper: {
    marginTop: moderateScale(6)
  },
  errorText: {
    fontFamily: EFonts.REGULAR,
    fontSize: moderateScale(13),
    color: Colors[theme].danger,
    flexWrap: 'wrap'
  },
  value: {
    fontFamily: EFonts.REGULAR,
    fontSize: moderateScale(16),
    color: Colors[theme].text
  },
  placeholder: {
    color: Colors[theme].grey
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  }
})