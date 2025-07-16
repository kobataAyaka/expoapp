import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { Icon, useTheme } from 'react-native-paper';

// textかiconのどちらか一方が必須となるように型を定義
type GradientButtonProps = {
    onPress: () => void;
} & ({ text: string; icon?: never; } | { text?: never; icon: string; });

export default function GradientButton({ onPress, text, icon }: GradientButtonProps) {
    const theme = useTheme();

    // アイコンボタンの場合は円形にするためのスタイルを動的に適用
    const buttonStyle: ViewStyle[] = [styles.button];
    if (icon) {
        buttonStyle.push(styles.iconButton);
    }

    return (
        <Pressable onPress={onPress}>
            <LinearGradient
                colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={buttonStyle}
            >
                {icon ? (
                    <Icon source={icon} size={24} color="#FFFFFF" />
                ) : (
                    <Text style={styles.text}>{text}</Text>
                )}
            </LinearGradient>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconButton: {
        padding: 10, // アイコン用のパディング
        borderRadius: 50, // 円形にする
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});