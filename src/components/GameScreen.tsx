import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Direction, GameState, Mob, Position } from '../types/game';
import { Gesture, GestureDetector, GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import {
  canMoveInDirection,
  moveInDirection,
  moveInDirectionWithBounce,
  rotatePlayerDirection,
} from '../logic/gameLogic';
import RoomRenderer from './RoomRenderer';
import { debugPrintDungeon } from '../logic/debugHelper';

interface GameScreenProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export default function GameScreen({ gameState, setGameState }: GameScreenProps) {
  const executeTurn = (playerDirection: 'north' | 'south' | 'east' | 'west') => {
    setGameState((currentState: GameState) => {
      const newPlayerPosition = movePlayer(currentState.playerPosition, playerDirection);
      const newMobPosition = moveMob(currentState.mob, currentState.gridSize);

      debugPrintDungeon(currentState.gridSize, newPlayerPosition, newMobPosition.position, currentState.target);

      if (checkWin(newPlayerPosition, currentState.target)) {
        return {
          ...currentState,
          gameStatus: 'won',
        };
      }

      if (checkCollision(newPlayerPosition, newMobPosition)) {
        return {
          ...currentState,
          gameStatus: 'gameOver',
        };
      }

      return {
        ...currentState,
        playerPosition: newPlayerPosition,
        mob: newMobPosition,
      };
    });
  };

  const movePlayer = (position: Position, direction: Direction): Position => {
    if (canMoveInDirection(direction, position, gameState.gridSize)) {
      return moveInDirection(direction, position);
    }
    return position;
  };

  const moveMob = (mob: Mob, gridSize: number): Mob => {
    const result = moveInDirectionWithBounce(mob.direction, mob.position, gridSize);

    return {
      ...mob,
      position: result.position,
      direction: result.direction,
    };
  };

  const checkCollision = (playerPosition: Position, mob: Mob): boolean => {
    return playerPosition.x === mob.position.x && playerPosition.y === mob.position.y;
  };

  const checkWin = (playerPosition: Position, targetPosition: Position): boolean => {
    return playerPosition.x === targetPosition.x && playerPosition.y === targetPosition.y;
  };

  const resetGame = () => {
    setGameState({
      playerPosition: { x: 0, y: 0 },
      playerFacing: 'north',
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
    const absoluteThreshold = 50;

    const maxTranslation = Math.max(Math.abs(translationX), Math.abs(translationY));
    if (maxTranslation < absoluteThreshold) return;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      const turnClockwise = translationX > absoluteThreshold;
      setGameState((currentState) => ({
        ...currentState,
        playerFacing: rotatePlayerDirection(currentState.playerFacing, turnClockwise),
      }));
    } else {
      const moveForward = translationY < -absoluteThreshold;
      if (moveForward) {
        executeTurn(gameState.playerFacing);
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
          <RoomRenderer gameState={gameState} />
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
