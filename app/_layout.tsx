import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';

// ライトモード用のカスタムテーマ
const customLightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#e74b24ff', // 濃いオレンジ
        gradientStart: '#FF7043', // グラデーション開始色（少し明るいオレンジ）
        gradientEnd: '#e61979ff',   // グラデーション終了色（少し暗いオレンジ）
    },
};

// ダークモード用のカスタムテーマ
const customDarkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#e920b3ff', // ダークモード用プライマリ（明るめのオレンジ）
        gradientStart: '#FFAB91', // ダークモードグラデーション開始色
        gradientEnd: '#ff43cdff',   // ダークモードグラデーション終了色
    },
};

export default function Layout() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? customDarkTheme : customLightTheme;

    return (
        <PaperProvider theme={theme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </PaperProvider>
    );
}

