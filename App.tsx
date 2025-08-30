import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GameState } from './src/types/game';
import GameScreen from './src/components/GameScreen';

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    playerPosition: {
      x: 0,
      y: 0,
    },
    mob: {
      id: 1,
      position: {
        x: 3,
        y: 3,
      },
      direction: 'east',
    },
    target: {
      x: 4,
      y: 4,
    },
    gridSize: 5,
    gameStatus: 'playing',
  });

  return (
    <View style={styles.container}>
      <GameScreen
        gameState={gameState}
        setGameState={setGameState}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
