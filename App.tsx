import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { TimerToggleButton } from './Components/TimerToggleButton';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Timer } from './Components/Timer';

const FOCUS_TIME_MINUTES = 20 * 60 * 1000;
const COMPLETE_TIME_MINUTES = 0 * 60 * 1000;

export default function App() {
  const [timerCount, setTimerCount] = useState<number>(FOCUS_TIME_MINUTES);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<'Meditate' | 'Complete'>('Meditate');
  const [setTimerModalVisible, setSetTimerModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (timerCount === 0) {
      if (timerMode === 'Meditate') {
        setTimerMode('Complete');
        setTimerCount(COMPLETE_TIME_MINUTES);
      } else {
        setTimerMode('Meditate');
        setTimerCount(FOCUS_TIME_MINUTES);
      }
      stopTimer();
    }
  }, [timerCount]);

  const startTimer = () => {
    setIsTimerRunning(true);
    const id = setInterval(() => setTimerCount((prev) => prev - 1000), 1000);
    setTimerInterval(id);
  };

  const stopTimer = () => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
    }
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setTimerCount(FOCUS_TIME_MINUTES);
    setTimerMode('Meditate');
    stopTimer();
  };

  const setTimer = (minutes: number) => {
    setTimerCount(minutes);
    setTimerMode('Meditate');
    setSetTimerModalVisible(false);
  };

  const getFill = () => {
    const totalTime = timerMode === 'Meditate' ? FOCUS_TIME_MINUTES : COMPLETE_TIME_MINUTES;
    const remainingTime = Math.max(timerCount, 0);
    return (remainingTime / totalTime) * 100;
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>{timerMode === 'Meditate' ? 'Time to Meditate' : 'Meditation Completed'} </Text>
      <StatusBar style="auto" />
      <View >
        <View style={styles.timerWrapper}>
       
        <AnimatedCircularProgress
            size={200}
            width={10}
            fill={getFill()}
            tintColor="#fff"
            backgroundColor="#d95550"
            rotation={-90}
          >
            {() => (
              <Text style={styles.timerText}>
                {Math.floor(timerCount / 60000)}:{(timerCount % 60000 / 1000).toFixed(0).padStart(2, '0')}
              </Text>
            )}
          </AnimatedCircularProgress>
          <TimerToggleButton isTimerRunning={isTimerRunning} startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} />
          <Button title="Set Timer" onPress={() => setSetTimerModalVisible(true)} />
        </View>
      </View>
      <Timer visible={setTimerModalVisible} setTimer={setTimer} onCancel={() => setSetTimerModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d95550',
    alignItems: 'center',
    justifyContent: 'center',
    
    },
  timerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerToggleButton: {
    marginTop: 20,
  },
  timerText: {
  fontSize: 36,
  fontWeight: 'bold',
  color: '#fff',
  },
textContainer:{
  fontSize: 30,
        fontWeight: '700'
},
label: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 10,
},
input: {
  height: 40,
  width: 100,
  borderColor: '#fff',
  borderWidth: 1,
  borderRadius: 5,
  padding: 5,
  color: '#fff',
},

  
});
