import * as mime from 'react-native-mime-types';
import {parsePhoneNumberFromString} from 'libphonenumber-js';

export const waitForSeconds = async (callback: Function, seconds = 1000) => {
    await new Promise(resolve => setTimeout(() => resolve(null), seconds));
    if (typeof callback === 'function') {
        callback(null);
    }
};

export const getFileMimeType = (path: string) => mime.lookup(path) as string;

export const removeCountryCode = (phone: string) => {
  const phoneNumber = parsePhoneNumberFromString(phone);
  return phoneNumber ? phoneNumber.nationalNumber : phone;
};