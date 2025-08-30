import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Direction, GameState } from '../types/game';
import { getAdjacentRoomInfo } from '../logic/gameLogic';

interface RoomRendererProps {
  gameState: GameState;
}

export default function RoomRenderer({ gameState }: RoomRendererProps) {
  const roomInfo = getAdjacentRoomInfo(
    gameState.playerPosition,
    gameState.playerFacing,
    gameState.gridSize,
    gameState.mob.position,
    gameState.mob.direction,
    gameState.target
  );

  return (
    <View style={styles.container}>
      <Text style={styles.facing}>Facing: {gameState.playerFacing}</Text>

      {roomInfo.hasExit ? (
        <View style={styles.doorway}>
          <Text style={styles.door}>🚪 DOOR</Text>
          {roomInfo.hasMob && <Text style={styles.mob}>👹 {getMobDirectionSymbol(roomInfo.mobDirection!)}</Text>}
          {roomInfo.hasTarget && <Text style={styles.target}>🎯 TARGET</Text>}
        </View>
      ) : (
        <View style={styles.wall}>
          <Text style={styles.wallText}>🧱 WALL</Text>
        </View>
      )}
    </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  facing: {
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
  },
  doorway: {
    backgroundColor: '#2a2a2a',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 200,
  },
  door: {
    fontSize: 24,
    color: '#8B4513',
    marginBottom: 15,
  },
  mob: {
    fontSize: 20,
    color: 'red',
    marginBottom: 10,
  },
  target: {
    fontSize: 20,
    color: 'gold',
  },
  wall: {
    backgroundColor: '#444',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 200,
  },
  wallText: {
    fontSize: 24,
    color: '#666',
  },
});
