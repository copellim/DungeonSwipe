import { Position } from '../types/game';

export function debugPrintDungeon(
  gridSize: number,
  playerPosition: Position,
  mobPosition: Position,
  targetPosition: Position
): void {
  console.clear();
  console.debug('\n=== DUNGEON MAP ===');

  for (let y = gridSize - 1; y >= 0; y--) {
    let row = '';
    for (let x = 0; x < gridSize; x++) {
      let cell = '.';

      if (playerPosition.x === x && playerPosition.y === y) {
        cell = 'P';
      } else if (mobPosition.x === x && mobPosition.y === y) {
        cell = 'M';
      } else if (targetPosition.x === x && targetPosition.y === y) {
        cell = 'X';
      }

      row += cell + ' ';
    }
    console.log(row);
  }
  console.log('===================\n');
}

export function debugPrintRoomInfo(roomInfo: any): void {
  console.debug('\n=== ROOM INFO ===');
  console.debug('Has Exit:', roomInfo.hasExit);
  console.debug('Has Mob:', roomInfo.hasMob);
  console.debug('Has Target:', roomInfo.hasTarget);
  console.debug('Mob Direction:', roomInfo.mobDirection);
  console.debug('===================\n');
}
