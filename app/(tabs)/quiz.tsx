import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const wordList = [
  { word: 'apple', meaning: '사과' },
  { word: 'banana', meaning: '바나나' },
  { word: 'cat', meaning: '고양이' },
  { word: 'dog', meaning: '개' },
  { word: 'elephant', meaning: '코끼리' },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion());
  const [feedback, setFeedback] = useState('');

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
    }, 1000); // 1秒後に次の問題を表示
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>문제: {currentQuestion.question} 의 뜻은?</Text>
      {currentQuestion.options.map((option, index) => (
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
});
