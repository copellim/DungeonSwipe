import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Animated } from 'react-native';
import { Direction, GameState } from '../types/game';
import { getAdjacentRoomInfo } from '../logic/gameLogic';
import { debugPrintRoomInfo } from '../logic/debugHelper';

interface RoomRendererProps {
  gameState: GameState;
}

const backgroundSources = {
  open_door: require('../../assets/open_door.webp'),
  closed_door: require('../../assets/closed_door.webp'),
};

export default function RoomRenderer({ gameState }: RoomRendererProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const moveAnim = useRef(new Animated.Value(0)).current;
  const previousDirection = useRef<Direction>(gameState.playerFacing);
  const previousPosition = useRef(gameState.playerPosition);

  useEffect(() => {
    const directionChanged = previousDirection.current !== gameState.playerFacing;
    const positionChanged =
      previousPosition.current.x !== gameState.playerPosition.x ||
      previousPosition.current.y !== gameState.playerPosition.y;

    if (directionChanged) {
      console.log('Direzione cambiata!', previousDirection.current, '->', gameState.playerFacing);
      triggerRotationAnimation();
      previousDirection.current = gameState.playerFacing;
    }

    if (positionChanged) {
      console.log('Posizione cambiata!', previousPosition.current, '->', gameState.playerPosition);
      triggerMovementAnimation();
      previousPosition.current = gameState.playerPosition;
    }
  }, [gameState.playerFacing, gameState.playerPosition]);

  const triggerRotationAnimation = () => {
    const direction = getSlideDirection(previousDirection.current, gameState.playerFacing);
    fadeAnim.setValue(direction === 'right' ? -30 : 30);

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const triggerMovementAnimation = () => {
    moveAnim.setValue(-40);

    Animated.timing(moveAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const getSlideDirection = (from: Direction, to: Direction): 'left' | 'right' => {
    const directions = ['north', 'east', 'south', 'west'];
    const fromIndex = directions.indexOf(from);
    const toIndex = directions.indexOf(to);

    const diff = (toIndex - fromIndex + 4) % 4;
    return diff === 1 || diff === 2 ? 'right' : 'left';
  };

  const roomInfo = getAdjacentRoomInfo(
    gameState.playerPosition,
    gameState.playerFacing,
    gameState.gridSize,
    gameState.mob.position,
    gameState.mob.direction,
    gameState.target
  );

  const backgroundKey = roomInfo.hasExit ? 'open_door' : 'closed_door';
  const backgroundSource = backgroundSources[backgroundKey];

  debugPrintRoomInfo(roomInfo);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.backgroundImage,
          {
            transform: [{ translateX: fadeAnim }, { translateY: moveAnim }],
          },
        ]}>
        <ImageBackground
          source={backgroundSource}
          style={styles.backgroundImage}
          resizeMode="cover">
          <View style={styles.overlay}>{renderRoomContent(roomInfo)}</View>
        </ImageBackground>
      </Animated.View>
    </View>
  );
}

function renderRoomContent(roomInfo: any) {
  return (
    <>
      {roomInfo.hasMob && <Text style={styles.mob}>👹 {getMobDirectionSymbol(roomInfo.mobDirection!)}</Text>}
      {roomInfo.hasTarget && <Text style={styles.target}>🎯 TARGET</Text>}
    </>
  );
}

function getMobDirectionSymbol(direction: Direction): string {
  switch (direction) {
    case 'north':
      return '⬆️';
    case 'south':
      return '⬇️';
    case 'east':
      return '➡️';
    case 'west':
      return '⬅️';
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundFallback: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  doorway: {
    backgroundColor: 'rgba(42, 42, 42, 0.8)',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 200,
    borderWidth: 2,
    borderColor: '#555',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  door: {
    fontSize: 28,
    color: '#D2B48C',
    marginBottom: 15,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  mob: {
    fontSize: 22,
    color: '#FF4500',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  target: {
    fontSize: 22,
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  wall: {
    backgroundColor: 'rgba(68, 68, 68, 0.8)',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  wallText: {
    fontSize: 24,
    color: '#999',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  debugInfo: {
    position: 'absolute',
    top: 50,
    left: 20,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 3,
  },
});
