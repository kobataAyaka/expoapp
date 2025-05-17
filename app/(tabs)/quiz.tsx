import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Key, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Quiz() {
  const [wordList, setWordList] = useState<{ word: string; meaning: string }[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 영속화된 단어 목록을 불러오기
  useEffect(() => {
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
  }, []);

  // 문제 생성 함수
  function generateQuestion() {
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
    }, 1000); // 1초 후에 다음 문제로 넘어감
  }

  // 로딩 중일 때
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  if (wordList.length < 4) {
    return (
      <View style={styles.container}>
        <FontAwesome
          name="lock"
          size={100}
          color="gray"
          style={{
            textAlign: 'center', // FontAwesome은 기본적으로 텍스트로 렌더링되므로 텍스트 정렬을 설정
            textAlignVertical: 'center', // 세로 정렬
          }}
        />
        <Text style={styles.lockText}>단어를 4개 이상 추가해주세요!</Text>
      </View>
    );
  }

  // 퀴즈 문제를 생성
  if (!currentQuestion) {
    setCurrentQuestion(generateQuestion());
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>문제: {currentQuestion.question} 의 뜻은?</Text>
      {currentQuestion.options.map((option: { meaning: string; }, index: Key | null | undefined) => (
        <Button
          key={index}
          title={option.meaning}
          onPress={() => handleAnswer(option.meaning)}
        />
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
    fontSize: 20,
    marginBottom: 20,
  },
  feedbackText: {
    fontSize: 18,
    color: 'green',
    marginTop: 20,
  },
  lockIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  lockText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
});
