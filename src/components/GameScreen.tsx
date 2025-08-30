import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GameState } from '../types/game';
import { Gesture, GestureDetector, GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

interface GameScreenProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export default function GameScreen({ gameState, setGameState }: GameScreenProps) {
  const movePlayer = (direction: 'north' | 'south' | 'east' | 'west') => {
    setGameState((currentState: GameState) => {
      const newPosition = { ...currentState.playerPosition };
      switch (direction) {
        case 'north':
          newPosition.y = Math.max(0, newPosition.y - 1);
          break;
        case 'south':
          newPosition.y = Math.min(currentState.gridSize - 1, newPosition.y + 1);
          break;
        case 'east':
          newPosition.x = Math.min(currentState.gridSize - 1, newPosition.x + 1);
          break;
        case 'west':
          newPosition.x = Math.max(0, newPosition.x - 1);
          break;
      }

      const stateWithPlayerMoved = {
        ...currentState,
        playerPosition: newPosition,
      };

      const finalState = moveMob(stateWithPlayerMoved);

      if (checkWin(finalState)) {
        return {
          ...finalState,
          gameStatus: 'won',
        };
      }

      if (checkCollision(finalState)) {
        return {
          ...finalState,
          gameStatus: 'gameOver',
        };
      }

      return finalState;
    });
  };

  const moveMob = (currentGameState: GameState): GameState => {
    const mob = currentGameState.mob;
    let newPosition = { ...mob.position };
    let newDirection = mob.direction;

    // Calcola dove il mob VORREBBE andare
    switch (mob.direction) {
      case 'north':
        if (newPosition.y > 0) {
          newPosition.y = newPosition.y - 1;
        } else {
          // Colpisce il muro nord, rimbalza a sud
          newDirection = 'south';
        }
        break;
      case 'south':
        if (newPosition.y < currentGameState.gridSize - 1) {
          newPosition.y = newPosition.y + 1;
        } else {
          // Colpisce il muro sud, rimbalza a nord
          newDirection = 'north';
        }
        break;
      case 'west':
        if (newPosition.x > 0) {
          newPosition.x = newPosition.x - 1;
        } else {
          // Colpisce il muro ovest, rimbalza a est
          newDirection = 'east';
        }
        break;
      case 'east':
        if (newPosition.x < currentGameState.gridSize - 1) {
          newPosition.x = newPosition.x + 1;
        } else {
          // Colpisce il muro est, rimbalza a ovest
          newDirection = 'west';
        }
        break;
    }

    return {
      ...currentGameState,
      mob: {
        ...mob,
        position: newPosition,
        direction: newDirection,
      },
    };
  };

  const checkCollision = (gameState: GameState): boolean => {
    return (
      gameState.playerPosition.x === gameState.mob.position.x && gameState.playerPosition.y === gameState.mob.position.y
    );
  };

  const checkWin = (gameState: GameState): boolean => {
    return gameState.playerPosition.x === gameState.target.x && gameState.playerPosition.y === gameState.target.y;
  };

  const resetGame = () => {
    setGameState({
      playerPosition: { x: 0, y: 0 },
      mob: {
        id: 1,
        position: { x: 3, y: 3 },
        direction: 'east',
      },
      gridSize: 5,
      target: { x: 4, y: 4 },
      gameStatus: 'playing',
    });
  };

  const panGesture = Gesture.Pan().onEnd((event) => {
    if (gameState.gameStatus !== 'playing') return;

    const { translationX, translationY } = event;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 50) {
        movePlayer('east');
      } else if (translationX < -50) {
        movePlayer('west');
      }
    } else {
      if (translationY > 50) {
        movePlayer('south');
      } else if (translationY < -50) {
        movePlayer('north');
      }
    }
  });

  if (gameState.gameStatus === 'won') {
    return (
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.gameArea}>
          <Text style={styles.winTitle}>VITTORIA! 🎉</Text>
          <Text style={styles.winText}>Hai raggiunto l'obiettivo!</Text>
          <Text
            style={styles.button}
            onPress={resetGame}>
            Gioca di nuovo
          </Text>
        </View>
      </GestureHandlerRootView>
    );
  }

  if (gameState.gameStatus === 'gameOver') {
    return (
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.gameArea}>
          <Text style={styles.gameOverTitle}>GAME OVER!</Text>
          <Text style={styles.gameOverText}>Il mob ti ha catturato!</Text>
          <Text
            style={styles.button}
            onPress={resetGame}>
            Riprova
          </Text>
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <View style={styles.gameArea}>
          <Text style={styles.title}>Dungeon Game</Text>
          <Text style={styles.instruction}>Swipe to move</Text>
          <Text style={styles.position}>
            Player position: ({gameState.playerPosition.x}, {gameState.playerPosition.y})
          </Text>
          <Text style={styles.position}>
            Mob position: ({gameState.mob.position.x}, {gameState.mob.position.y})
          </Text>
          <Text style={styles.position}>Mob direction: {gameState.mob.direction}</Text>
          <Text style={styles.position}>
            Target position: ({gameState.target.x}, {gameState.target.y})
          </Text>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
  },
  position: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  gameOverTitle: {
    fontSize: 32,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gameOverText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    fontSize: 18,
    color: 'white',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    textAlign: 'center',
    overflow: 'hidden',
  },
  winTitle: {
    fontSize: 32,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  winText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
});
