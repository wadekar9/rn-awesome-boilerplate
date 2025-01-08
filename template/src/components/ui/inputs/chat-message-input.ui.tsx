import React from 'react';
import { Keyboard, NativeSyntheticEvent, Platform, StyleSheet, TextInput, TextInputContentSizeChangeEventData, View } from 'react-native';
import { EFonts, moderateScale } from '$constants/styles.constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmojiPicker, { EmojiType, en } from 'rn-emoji-keyboard'
import { Colors } from '$constants/colors.constants';
import { waitForSeconds } from '$helpers/utils.helper';
import { IMediaFile, ITheme } from '$types/common';
import { useAppTheme, useDocumentPicker } from '$hooks/common';
import { IconButton } from '../buttons';
import { AttachOutlineIcon, EmojiOutlineIcon, SendOutlineIcon } from '$assets/icons';
import { MediaUploadOptionsSheet } from '$components/bottom-sheet';

interface ChatMessageInputProps {
  onSend?: (text: string) => void;
  onSendMedia?: (e: IMediaFile[]) => void;
};

interface ChatMessageInputRef {
  clear: () => void;
};

const DEFAULT_HEIGHT = Platform.OS == 'ios' ? 40 : 50;
const MAX_HEIGHT = 135;
const MAX_CONTENT = 500;

const ChatMessageInput = React.forwardRef<ChatMessageInputRef, ChatMessageInputProps>((props, ref) => {

  const { onSend, onSendMedia } = props;
  const { theme, colors } = useAppTheme();

  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>('');
  const [height, setHeight] = React.useState<number>(DEFAULT_HEIGHT);
  const insets = useSafeAreaInsets();
  const { openPicker } = useDocumentPicker((e) => onSendMedia && onSendMedia(e));

  const inputRef = React.useRef<TextInput>(null);
  const mediaOptionSheet = React.useRef<any>(null);

  const styles = styling(theme);

  React.useImperativeHandle(ref, () => ({
    blur: () => inputRef.current?.blur(),
    focus: () => inputRef.current?.focus(),
    clear: () => {
      setText('');
      setHeight(DEFAULT_HEIGHT);
    },
  }));

  React.useEffect(() => Keyboard.dismiss, []);

  const handleContentSizeChange = React.useCallback((event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
    const newHeight = event.nativeEvent.contentSize.height;
    setHeight(Math.min(Math.max(DEFAULT_HEIGHT, newHeight), MAX_HEIGHT));
  }, [MAX_HEIGHT, DEFAULT_HEIGHT]);

  const handleSend = React.useCallback(() => {
    if (text.trim().length > 0) {
      onSend && onSend(text.trim());
      setText('');
      setHeight(DEFAULT_HEIGHT);
    }
  }, [text, onSend, DEFAULT_HEIGHT]);

  const onSelectEmoji = React.useCallback((emoji: EmojiType) => {
    setIsEmojiPickerOpen(false);
    setText((prev) => prev.concat(emoji.emoji));
  }, []);

  const iosPlatformStyles = React.useMemo(() => {
    return Platform.OS === 'ios' ? {
      top: (height > DEFAULT_HEIGHT) ? 0 : moderateScale(10),
      marginVertical: (height > DEFAULT_HEIGHT) ? moderateScale(12) : 0
    } : {}
  }, [height])

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom || moderateScale(20) }]}>
      <View style={styles.container}>
        <View style={styles.content}>
          <IconButton
            style={styles.icon}
            onPress={() => {
              Keyboard.dismiss();
              waitForSeconds(() => setIsEmojiPickerOpen(true), 500);
            }}
          >
            <EmojiOutlineIcon fill={colors.text} />
          </IconButton>
          <TextInput
            ref={inputRef}
            value={text}
            onChangeText={setText}
            style={[styles.textInput, { height }, iosPlatformStyles]}
            placeholder="Write a message..."
            placeholderTextColor={colors.grey}
            cursorColor={colors.primary}
            underlineColorAndroid="transparent"
            keyboardAppearance="light"
            blurOnSubmit={false}
            multiline={true}
            textAlignVertical={'auto'}
            maxLength={MAX_CONTENT}
            onContentSizeChange={handleContentSizeChange}
            onSubmitEditing={Keyboard.dismiss}
          />
          <IconButton
            style={styles.icon}
            onPress={() => {
              Keyboard.dismiss();
              waitForSeconds(() => mediaOptionSheet.current?.open(), 500);
            }}
          >
            <AttachOutlineIcon stroke={colors.text} />
          </IconButton>
        </View>
        <View style={styles.linear}>
          <IconButton style={styles.sendButton} onPress={handleSend}>
            <SendOutlineIcon stroke={colors.white} width={moderateScale(25)} height={moderateScale(25)} />
          </IconButton>
        </View>
      </View>

      <EmojiPicker
        onEmojiSelected={onSelectEmoji}
        open={isEmojiPickerOpen}
        onClose={() => setIsEmojiPickerOpen(false)}
        categoryPosition="top"
        translation={en}
        theme={{
          knob: Colors[theme].white,
          container: Colors[theme].surface,
          header: Colors[theme].text,
          category: {
            icon: Colors[theme].primary,
            iconActive: Colors[theme].white,
            container: Colors[theme].background,
            containerActive: Colors[theme].primary
          },
        }}
      />

      <MediaUploadOptionsSheet
        ref={mediaOptionSheet}
        onChooseFile={(e) => {
          if (e.length) {
            console.log("mediaOptionSheet", e);
          }
        }}
      />
    </View>
  )
})

export default React.memo(ChatMessageInput);

const styling = (theme: ITheme) => StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingTop: moderateScale(15)
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: moderateScale(8),
  },
  linear: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(30),
    overflow: 'hidden',
    alignSelf: 'flex-end',
    backgroundColor: Colors[theme].primary
  },
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: moderateScale(1),
    borderColor: Colors[theme].border,
    borderRadius: moderateScale(10),
    backgroundColor: Colors[theme].background,
    overflow: 'hidden'
  },
  textInput: {
    flex: 1,
    height: 'auto',
    fontFamily: EFonts.REGULAR,
    fontSize: moderateScale(16),
    color: Colors[theme].text
  },
  icon: {
    paddingHorizontal: moderateScale(12),
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  }
})