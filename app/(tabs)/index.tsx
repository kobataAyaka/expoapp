import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Index() {
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const [lineColor, setLineColor] = useState('#000000'); // 선 색상 상태
    const [wordList, setWordList] = useState<{ word: string; meaning: string }[]>([]);

    const defaultLineColor = '#000000';
    const errorLineColor = '#FF0000';

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
    // 컴포넌트가 마운트될 때 단어 목록을 불러옵니다.
    useEffect(() => {
        loadWordList();
    }, []);

    const addWord = async () => {
        if (word.trim() !== '' && meaning.trim() !== '') {
            const newWordList = [...wordList, { word, meaning }];
            setWordList(newWordList);
            setWord('');
            setMeaning('');
            setLineColor(defaultLineColor); // 성공 시 선 색상 초기화

            try {
                await AsyncStorage.setItem('wordList', JSON.stringify(newWordList));
            } catch (error) {
                console.error('Error saving data', error);
            }
        } else {
            setLineColor(errorLineColor); // 입력 오류 시 선 색상 변경
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
        <View style={styles.container}>
            <Text>새로은 단어를 입력하세요</Text>
            <TextInput
                placeholder="영단어"
                value={word}
                onChangeText={(text) => {
                    setWord(text);
                    setLineColor(defaultLineColor); // 입력 시작 시 선 색상 초기화
                }}
                style={{
                    borderWidth: 1,
                    width: 200,
                    marginBottom: 10,
                    padding: 5,
                    borderColor: lineColor, // 상태에 따라 선 색상 변경
                }}
            />
            <TextInput
                placeholder="한국어 뜻"
                value={meaning}
                onChangeText={(text) => {
                    setMeaning(text);
                    setLineColor(defaultLineColor); // 입력 시작 시 선 색상 초기화
                }}
                style={{
                    borderWidth: 1,
                    width: 200,
                    marginBottom: 10,
                    padding: 5,
                    borderColor: lineColor, // 상태에 따라 선 색상 변경
                }}
            />
            <Button title="추가" onPress={addWord} />
            <FlatList
                data={wordList}
                renderItem={({ item, index }) => (
                    <View style={styles.wordItem}>
                        <Text style={styles.wordText}>{item.word}</Text>
                        <Text style={styles.meaningText}>{item.meaning}</Text>
                        <Button title="삭제" onPress={() => removeWord(index)} />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wordItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    wordText: {
        fontSize: 16,
        marginRight: 10,
    },
    meaningText: {
        fontSize: 16,
        color: 'gray',
        marginRight: 10,
    },
});
