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
  mob: Mob;
  target: Position;
  gridSize: number;
  gameStatus: 'playing' | 'gameOver' | 'won';
}
