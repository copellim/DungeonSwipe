import { Direction, Position } from '../types/game';

export function canMoveInDirection(direction: Direction, actorPosition: Position, gridSize: number): boolean {
  switch (direction) {
    case 'north':
      return actorPosition.y < gridSize - 1;
    case 'south':
      return actorPosition.y > 0;
    case 'east':
      return actorPosition.x < gridSize - 1;
    case 'west':
      return actorPosition.x > 0;
  }
}

export function moveInDirection(direction: Direction, actorPosition: Position): Position {
  switch (direction) {
    case 'north':
      return { ...actorPosition, y: actorPosition.y + 1 };
    case 'south':
      return { ...actorPosition, y: actorPosition.y - 1 };
    case 'east':
      return { ...actorPosition, x: actorPosition.x + 1 };
    case 'west':
      return { ...actorPosition, x: actorPosition.x - 1 };
  }
}

export function moveInDirectionWithBounce(
  direction: Direction,
  actorPosition: Position,
  gridSize: number
): { position: Position; direction: Direction } {
  let finalDirection = direction;
  let finalPosition = actorPosition;
  if (!canMoveInDirection(direction, actorPosition, gridSize)) {
    finalDirection = bounceDirection(direction);
  }
  if (canMoveInDirection(finalDirection, finalPosition, gridSize)) {
    finalPosition = moveInDirection(finalDirection, finalPosition);
  }
  return {
    position: finalPosition,
    direction: finalDirection,
  };
}

export function bounceDirection(direction: Direction): Direction {
  switch (direction) {
    case 'north':
      return 'south';
    case 'south':
      return 'north';
    case 'east':
      return 'west';
    case 'west':
      return 'east';
  }
}

export function rotatePlayerDirection(playerFacing: Direction, clockWise: boolean): Direction {
  const directions: Direction[] = ['north', 'east', 'south', 'west'];
  const currentIndex = directions.indexOf(playerFacing);
  const newIndex = clockWise
    ? (currentIndex + 1) % directions.length
    : (currentIndex - 1 + directions.length) % directions.length;
  return directions[newIndex];
}
