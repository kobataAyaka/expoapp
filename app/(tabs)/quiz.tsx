import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useFocusEffect } from 'expo-router';
import GradientButton from '../../components/GradientButton';

export default function Quiz() {
    const [wordList, setWordList] = useState<{ word: string; meaning: string }[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<any>(null);
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const theme = useTheme();

    useFocusEffect(
        useCallback(() => {
            const loadWordList = async () => {
                try {
                    const storedWordList = await AsyncStorage.getItem('wordList');
                    if (storedWordList) {
                        setWordList(JSON.parse(storedWordList));
                    }
                } catch (error) {
                    console.error('Error loading word list:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            loadWordList();
        }, [])
    );

    function generateQuestion() {
        if (wordList.length < 4) return null;
        const correctAnswer = wordList[Math.floor(Math.random() * wordList.length)];
        const incorrectAnswers = wordList
            .filter((item) => item.word !== correctAnswer.word)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        const options = [...incorrectAnswers, correctAnswer].sort(() => 0.5 - Math.random());
        return { question: correctAnswer.word, options, correctAnswer };
    }

    function handleAnswer(selectedAnswer: string) {
        if (selectedAnswer === currentQuestion.correctAnswer.meaning) {
            setFeedback('정답입니다!');
        } else {
            setFeedback('틀렸습니다.');
        }
        setTimeout(() => {
            setFeedback('');
            setCurrentQuestion(generateQuestion());
        }, 1000);
    }

    if (isLoading) {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <Text>로딩 중...</Text>
            </View>
        );
    }

    if (wordList.length < 4) {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <FontAwesome
                    name="lock"
                    size={100}
                    color={theme.colors.onSurfaceDisabled}
                    style={styles.lockIcon}
                />
                <Text style={styles.lockText}>단어를 4개 이상 추가해주세요!</Text>
            </View>
        );
    }

    if (!currentQuestion) {
        setCurrentQuestion(generateQuestion());
        return null;
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={styles.questionText}>문제: {currentQuestion.question} 의 뜻은?</Text>
            {currentQuestion.options.map((option: { meaning: string }, index: number) => (
                <View key={index} style={styles.optionButton}>
                    <GradientButton
                        text={option.meaning}
                        onPress={() => handleAnswer(option.meaning)}
                    />
                </View>
            ))}
            {feedback !== '' && <Text style={styles.feedbackText}>{feedback}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    questionText: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    optionButton: {
        marginVertical: 8,
        width: '80%',
    },
    feedbackText: {
        fontSize: 20,
        marginTop: 20,
    },
    lockIcon: {
        marginBottom: 20,
    },
    lockText: {
        fontSize: 18,
        textAlign: 'center',
    },
});

