import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
    const theme = useTheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: theme.colors.surface,
                },
                headerStyle: {
                    backgroundColor: theme.colors.surface,
                },
                headerTintColor: theme.colors.onSurface,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="language" color={color} />,
                }}
            />
            <Tabs.Screen
                name="quiz"
                options={{
                    title: 'Quiz',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="lightbulb-o" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cogs" color={color} />,
                }}
            />
        </Tabs>
    );
}
