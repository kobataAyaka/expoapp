import { Tabs } from 'expo-router';
import { Text, useTheme } from 'react-native-paper';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import GradientText from '../../components/GradientText';

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
                    headerTitle: () => <GradientText style={{ fontSize: 24 }}>Home</GradientText>,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="language" color={color} />,
                    tabBarLabel: ({ color }) => <Text style={{ color }}>Home</Text>,
                }}
            />
            <Tabs.Screen
                name="quiz"
                options={{
                    headerTitle: () => <GradientText style={{ fontSize: 24 }}>Quiz</GradientText>,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="lightbulb-o" color={color} />,
                    tabBarLabel: ({ color }) => <Text style={{ color }}>Quiz</Text>,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    headerTitle: () => <GradientText style={{ fontSize: 24 }}>Settings</GradientText>,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cogs" color={color} />,
                    tabBarLabel: ({ color }) => <Text style={{ color }}>Settings</Text>,
                }}
            />
        </Tabs>
    );
}