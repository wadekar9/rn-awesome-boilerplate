import { Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useAppTheme } from '$hooks/common';
import { ITheme } from '$types/common.types';
import { EFonts, moderateScale } from '$constants/styles.constants';
import { COLORS } from '$constants/colors.constants';
import { Calendar } from 'lucide-react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { ThemeText } from '../themed';

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
  disabled = false,
}) => {

  const { colors, theme } = useAppTheme();
  const styles = styling(theme);

  const [TODAY_DATE] = useState<Date>(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);

  function showPicker() {
    setIsDatePickerVisible(true);
  }

  function hidePicker() {
    setIsDatePickerVisible(false);
  }

  function onConfirmDate(event: DateTimePickerEvent, date?: Date) {
    hidePicker();
    if (event.type === 'dismissed' || !date) return;
    onDateChange && onDateChange(date);
  }

  const formatDate = (date: Date) => `${date.toLocaleDateString()}`;

  return (
    <View style={styles.wrapper}>
      {label && <ThemeText style={styles.label}>{label}</ThemeText>}
      <Pressable
        style={[styles.container, { opacity: disabled ? 0.5 : 1 }]}
        onPress={showPicker}
        disabled={disabled}
      >
        <View style={styles.icon}>
          <Calendar width={moderateScale(25)} height={moderateScale(25)} color={colors['icon-default']} />
        </View>
        <View style={styles.content}>
          {value ? (<ThemeText style={styles.value}>{formatDate(value)}</ThemeText>) : (<ThemeText style={[styles.value, styles.placeholder]}>{placeholder}</ThemeText>)}
        </View>
      </Pressable>

      {error && (
        <View style={styles.errorTextWrapper}>
          <ThemeText numberOfLines={3} style={styles.errorText}>{error}</ThemeText>
        </View>
      )}

      {isDatePickerVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value || TODAY_DATE}
          mode={pickerMode}
          onChange={onConfirmDate}
          is24Hour={is24Hour}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          textColor={colors['text-primary']}
          themeVariant={theme}
        />
      )}
    </View>
  );
};

export default React.memo(DatePickerInput);

const styling = (theme: ITheme) => StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  container: {
    height: moderateScale(50),
    backgroundColor: COLORS[theme]['surface-alt'],
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    borderColor: COLORS[theme].border,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  label: {
    color: COLORS[theme]['text-primary'],
    fontFamily: EFonts.REGULAR,
    textAlign: 'left',
    marginBottom: moderateScale(4),
  },
  icon: {
    height: '100%',
    width: undefined,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorTextWrapper: {
    marginTop: moderateScale(6),
  },
  errorText: {
    fontFamily: EFonts.REGULAR,
    fontSize: moderateScale(13),
    color: COLORS[theme]['state-danger'],
    flexWrap: 'wrap',
  },
  value: {
    fontFamily: EFonts.REGULAR,
    fontSize: moderateScale(16),
    color: COLORS[theme]['text-primary'],
  },
  placeholder: {
    color: COLORS[theme]['text-muted'],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});
