export interface Position {
  x: number;
  y: number;
}

export interface Mob {
  id: number;
  position: Position;
  direction: 'north' | 'south' | 'east' | 'west';
}

export interface GameState {
  playerPosition: Position;
  playerFacing: Direction;
  mob: Mob;
  target: Position;
  gridSize: number;
  gameStatus: 'playing' | 'gameOver' | 'won';
}

export type Direction = 'north' | 'south' | 'east' | 'west';

export interface AdjacentRoomInfo {
  hasExit: boolean;
  hasMob: boolean;
  mobDirection?: Direction;
  hasTarget: boolean;
}
