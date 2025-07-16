import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Button, Card, Text, TextInput, useTheme } from 'react-native-paper';
import GradientButton from '../../components/GradientButton';

export default function Index() {
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const [wordList, setWordList] = useState<{ word: string; meaning: string }[]>([]);
    const [isError, setIsError] = useState(false);
    const theme = useTheme();

    const loadWordList = async () => {
        try {
            const storedWordList = await AsyncStorage.getItem('wordList');
            if (storedWordList) {
                setWordList(JSON.parse(storedWordList));
            }
        } catch (error) {
            console.error('Error loading data', error);
        }
    };

    useEffect(() => {
        loadWordList();
    }, []);

    const addWord = async () => {
        if (word.trim() !== '' && meaning.trim() !== '') {
            const newWordList = [...wordList, { word, meaning }];
            setWordList(newWordList);
            setWord('');
            setMeaning('');
            setIsError(false);

            try {
                await AsyncStorage.setItem('wordList', JSON.stringify(newWordList));
            } catch (error) {
                console.error('Error saving data', error);
            }
        } else {
            setIsError(true);
            alert('단어와 뜻을 모두 입력하세요');
        }
    };

    const removeWord = async (index: number) => {
        const newWordList = [...wordList];
        newWordList.splice(index, 1);
        setWordList(newWordList);
        await AsyncStorage.setItem('wordList', JSON.stringify(newWordList));
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Appbar.Header>
                <Appbar.Content title="단어장" />
            </Appbar.Header>
            <View style={styles.content}>
                <Card style={styles.card}>
                    <Card.Content>
                        <TextInput
                            label="영단어"
                            value={word}
                            onChangeText={(text) => {
                                setWord(text);
                                setIsError(false);
                            }}
                            style={styles.input}
                            error={isError}
                        />
                        <TextInput
                            label="한국어 뜻"
                            value={meaning}
                            onChangeText={(text) => {
                                setMeaning(text);
                                setIsError(false);
                            }}
                            style={styles.input}
                            error={isError}
                        />
                    </Card.Content>
                    <Card.Actions>
                        <GradientButton onPress={addWord} text="추가" />
                    </Card.Actions>
                </Card>
                <FlatList
                    data={wordList}
                    renderItem={({ item, index }) => (
                        <Card style={styles.wordCard}>
                            <Card.Content style={styles.wordItem}>
                                <Text variant="titleMedium">{item.word}</Text>
                                <Text variant="bodyMedium" style={styles.meaningText}>
                                    {item.meaning}
                                </Text>
                                <Button icon="delete" onPress={() => removeWord(index)} children={undefined} />
                            </Card.Content>
                        </Card>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.list}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    card: {
        marginBottom: 16,
    },
    input: {
        marginBottom: 10,
    },
    list: {
        flex: 1,
    },
    wordCard: {
        marginBottom: 8,
    },
    wordItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    meaningText: {
        color: 'gray',
    },
});