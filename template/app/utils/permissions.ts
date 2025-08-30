import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import { PERMISSIONS, requestMultiple, Permission } from 'react-native-permissions';

type PlatformPermissions = {
  android: Permission[];
  ios: Permission[];
};

interface PermissionResult {
  granted: boolean;
  error?: Error;
}

abstract class BasePermissionHandler {
  protected abstract permissions: PlatformPermissions;

  public async requestPermission(): Promise<PermissionResult> {
    try {
      const platformPermissions = this.getPlatformPermissions();
      const result = await requestMultiple(platformPermissions);
      return {
        granted: this.validatePermissionResult(result),
      };
    } catch (error) {
      return {
        granted: false,
        error: error instanceof Error ? error : new Error('Unknown error occurred'),
      };
    }
  }

  protected getPlatformPermissions(): Permission[] {
    return Platform.select({
      android: this.permissions.android,
      ios: this.permissions.ios,
      default: [],
    });
  }

  protected abstract validatePermissionResult(result: Record<string, string>): boolean;
}

class CameraPermissionHandler extends BasePermissionHandler {
  protected permissions: PlatformPermissions = {
    android: [PERMISSIONS.ANDROID.CAMERA],
    ios: [PERMISSIONS.IOS.CAMERA],
  };

  protected validatePermissionResult(result: Record<string, string>): boolean {
    return Platform.select({
      android: result['android.permission.CAMERA'] === 'granted',
      ios: result['ios.permission.CAMERA'] === 'granted',
      default: false,
    });
  }
}


class MediaPermissionHandler extends BasePermissionHandler {
  protected permissions: PlatformPermissions = {
    android: [
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ],
    ios: [PERMISSIONS.IOS.PHOTO_LIBRARY],
  };

  protected validatePermissionResult(result: Record<string, string>): boolean {
    return Platform.select({
      android:
        result['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' ||
        result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted' ||
        result['android.permission.READ_MEDIA_IMAGES'] === 'granted',
      ios: result['ios.permission.PHOTO_LIBRARY'] === 'granted',
      default: false,
    });
  }
}

class LocationPermissionHandler extends BasePermissionHandler {
  protected permissions: PlatformPermissions = {
    android: [
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ],
    ios: [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
  };

  protected validatePermissionResult(result: Record<string, string>): boolean {
    return Platform.select({
      android:
        result['android.permission.ACCESS_COARSE_LOCATION'] === 'granted' ||
        result['android.permission.ACCESS_FINE_LOCATION'] === 'granted',
      ios: result['ios.permission.LOCATION_WHEN_IN_USE'] === 'granted',
      default: false,
    });
  }
}

class NotificationPermissionHandler extends BasePermissionHandler {
  protected permissions: PlatformPermissions = {
    android: [],
    ios: [],
  };

  public async requestPermission(): Promise<PermissionResult> {
    try {
      let granted = false;

      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        granted = response === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const authStatus = await messaging().requestPermission();
        granted = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      }

      return { granted };
    } catch (error) {
      return {
        granted: false,
        error: error instanceof Error ? error : new Error('Unknown error occurred'),
      };
    }
  }

  protected validatePermissionResult(): boolean {
    return false; // Not used for notifications
  }
}

class PermissionManager {
  private static instance: PermissionManager;
  private handlers: Map<string, BasePermissionHandler>;

  private constructor() {
    this.handlers = new Map();
    this.initializeHandlers();
  }

  public static getInstance(): PermissionManager {
    if (!PermissionManager.instance) {
      PermissionManager.instance = new PermissionManager();
    }
    return PermissionManager.instance;
  }

  private initializeHandlers(): void {
    this.handlers.set('camera', new CameraPermissionHandler());
    this.handlers.set('media', new MediaPermissionHandler());
    this.handlers.set('location', new LocationPermissionHandler());
    this.handlers.set('notification', new NotificationPermissionHandler());
  }

  public async requestPermission(type: string): Promise<PermissionResult> {
    const handler = this.handlers.get(type);
    if (!handler) {
      return {
        granted: false,
        error: new Error(`Unknown permission type: ${type}`),
      };
    }
    return handler.requestPermission();
  }
}

export const permissionManager = PermissionManager.getInstance();

export const requestCameraPermissions = async (): Promise<boolean> => {
  const result = await permissionManager.requestPermission('camera');
  return result.granted;
};

export const requestMediaPermissions = async (): Promise<boolean> => {
  const result = await permissionManager.requestPermission('media');
  return result.granted;
};

export const requestLocationPermissions = async (): Promise<boolean> => {
  const result = await permissionManager.requestPermission('location');
  return result.granted;
};

export const requestNotificationPermissions = async (): Promise<boolean> => {
  const result = await permissionManager.requestPermission('notification');
  return result.granted;
};
