import React from "react";
import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


type Props = {
    isTimerRunning: boolean;
    stopTimer: () => void;
    startTimer: () => void;
}



export const TimerToggleButton: React.FC<Props> = ({isTimerRunning, stopTimer, startTimer}) => {
    const iconSize = 60;

    const toggleTimer = () => {
        if (isTimerRunning) {
          stopTimer();
        } else {
          startTimer();
        }
      };
      return (
        <TouchableOpacity  onPress={isTimerRunning ? stopTimer : startTimer}>
        {isTimerRunning ? (
          <Icon name="pause" size={iconSize} color="#fff" />
        ) : (
          <Icon name="play" size={iconSize} color="#fff" />
        )}
      </TouchableOpacity>
      );
    };
const styles = StyleSheet.create({
    icon: {
        alignSelf: 'center',
        color: '#fff'
    },
    container: {
        borderWidth: 5,
        width: 250,
        height: 250,
        borderRadius: 250/2, 
        justifyContent: 'center',
        borderColor: '#fff',
        marginVertical:50
    }
})