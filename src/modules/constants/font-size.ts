/* eslint-disable prettier/prettier */
import { PixelRatio } from 'react-native';

export const FontSize = {
    xSmall: PixelRatio.get() >= 2 ? 10 : 9,
    small: PixelRatio.get() >= 2 ? 12 : 11,
    medium: PixelRatio.get() >= 2 ? 13 : 12,
    xMedium: PixelRatio.get() >= 2 ? 14 : 13,
    xxMedium: PixelRatio.get() >= 2 ? 15 : 14,
    large: PixelRatio.get() >= 2 ? 16 : 15,
    xLarge: PixelRatio.get() >= 2 ? 18 : 17,
    xxLarge: PixelRatio.get() >= 2 ? 20 : 19,
    xxxLarge: PixelRatio.get() >= 2 ? 30 : 28,
    xxxxLarge: PixelRatio.get() >= 2 ? 40 : 38,
    xxxxxLarge: PixelRatio.get() >= 2 ? 60 : 48,
};
