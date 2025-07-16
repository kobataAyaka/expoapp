import { LinearGradient } from 'expo-linear-gradient';
import { Text, useTheme } from 'react-native-paper';
import { ComponentProps } from 'react';
import { Text as RNText, StyleSheet, Platform } from 'react-native';

interface GradientTextProps extends ComponentProps<typeof RNText> {
    children: React.ReactNode;
}

export default function GradientText({ children, style, ...props }: GradientTextProps) {
    const theme = useTheme();
    const gradientColors = [theme.colors.gradientStart, theme.colors.gradientEnd];

    if (Platform.OS === 'web') {
        return (
            <RNText
                style={[
                    style,
                    styles.webGradientText,
                    {
                        backgroundImage: `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})`,
                    },
                ]}
                {...props}
            >
                {children}
            </RNText>
        );
    } else {
        const MaskedView = require('@react-native-masked-view/masked-view').default;
        return (
            <MaskedView
                style={styles.maskedView}
                maskElement={
                    <RNText style={style} {...props}>
                        {children}
                    </RNText>
                }
            >
                <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.linearGradient}
                >
                    {/* グラデーションをマスクするためのダミーテキスト */}
                    <RNText style={[style, { opacity: 0 }]} {...props}>
                        {children}
                    </RNText>
                </LinearGradient>
            </MaskedView>
        );
    }
}

const styles = StyleSheet.create({
    maskedView: {
        flex: 1,
    },
    linearGradient: {
        flex: 1,
    },
    webGradientText: {
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
    },
});