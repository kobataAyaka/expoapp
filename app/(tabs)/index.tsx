import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Index() {
    const [word, setWord] = useState('');
const [words, setWords] = useState<string[]>([]);

const addWord = () => {
  if (word.trim() !== '') {
    setWords([...words, word]);
    setWord('');
  }
}

const removeWord = (index: number) => {
  const newWords = [...words];
  newWords.splice(index, 1);
  setWords(newWords);
}

  return (
    <View style={styles.container}>
      {/* <Text>어서 오세요~!!</Text> */}
       <TextInput
          placeholder="새로은 단어를 입력하세요"
          value={word}
          onChangeText={(text) => setWord(text)}
            style={{ borderWidth: 1, width: 200, marginBottom: 10, padding: 5 }}
    />
        <Button title="추가" onPress={addWord} />
        <FlatList
            data={words || []} // words가 undefined인 경우 빈 배열을 넘기기
            renderItem={({ item, index }) => (
            <View>
                <Text>{item}</Text>
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
});
