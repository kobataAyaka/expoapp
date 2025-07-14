import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

interface GradientButtonProps {
    onPress: () => void;
    text: string;
}

export default function GradientButton({ onPress, text }: GradientButtonProps) {
    const theme = useTheme();

    return (
        <Pressable onPress={onPress}>
            <LinearGradient
                colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                start={{ x: 0, y: 0 }} // 左上から開始
                end={{ x: 1, y: 1 }}   // 右下で終了
                style={styles.button}
            >
                <Text style={styles.text}>{text}</Text>
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
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
