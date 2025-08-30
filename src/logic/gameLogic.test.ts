import { Position } from '../types/game';
import { canMoveInDirection, moveInDirectionWithBounce } from './gameLogic';

describe('moveInDirectionWithBounce', () => {
  const gridSize = 3;
  it('moves north when possible', () => {
    const start: Position = { x: 1, y: 1 };
    const result = moveInDirectionWithBounce('north', start, gridSize);
    expect(result.position).toEqual({ x: 1, y: 2 });
    expect(result.direction).toBe('north');
  });

  it('bounces south when blocked north', () => {
    const start: Position = { x: 1, y: 2 };
    const result = moveInDirectionWithBounce('north', start, gridSize);
    expect(result.position).toEqual({ x: 1, y: 1 });
    expect(result.direction).toBe('south');
  });

  it('bounces north when blocked south', () => {
    const start: Position = { x: 1, y: 0 };
    const result = moveInDirectionWithBounce('south', start, gridSize);
    expect(result.position).toEqual({ x: 1, y: 1 });
    expect(result.direction).toBe('north');
  });

  it('bounces west when blocked east', () => {
    const start: Position = { x: 2, y: 1 };
    const result = moveInDirectionWithBounce('east', start, gridSize);
    expect(result.position).toEqual({ x: 1, y: 1 });
    expect(result.direction).toBe('west');
  });

  it('bounces east when blocked west', () => {
    const start: Position = { x: 0, y: 1 };
    const result = moveInDirectionWithBounce('west', start, gridSize);
    expect(result.position).toEqual({ x: 1, y: 1 });
    expect(result.direction).toBe('east');
  });

  it('does not move if blocked in both directions', () => {
    const start: Position = { x: 0, y: 0 };
    const result = moveInDirectionWithBounce('south', start, gridSize);
    expect(result.position).toEqual({ x: 0, y: 1 });
    expect(result.direction).toBe('north');
  });
});

describe('canMoveInDirection', () => {
  it('should allow movement from corner (0,0) only north and east', () => {
    const actorPosition = { x: 0, y: 0 };
    const gridSize = 5;

    expect(canMoveInDirection('north', actorPosition, gridSize)).toBe(true);
    expect(canMoveInDirection('east', actorPosition, gridSize)).toBe(true);
    expect(canMoveInDirection('south', actorPosition, gridSize)).toBe(false);
    expect(canMoveInDirection('west', actorPosition, gridSize)).toBe(false);
  });
});

describe('canMoveInDirection', () => {
  it('should allow movement from corner (4,4) only south and west', () => {
    const actorPosition = { x: 4, y: 4 };
    const gridSize = 5;

    expect(canMoveInDirection('north', actorPosition, gridSize)).toBe(false);
    expect(canMoveInDirection('east', actorPosition, gridSize)).toBe(false);
    expect(canMoveInDirection('south', actorPosition, gridSize)).toBe(true);
    expect(canMoveInDirection('west', actorPosition, gridSize)).toBe(true);
  });
});

describe('canMoveInDirection', () => {
  it('should allow movement from central position (2,2) in all directions', () => {
    const actorPosition = { x: 2, y: 2 };
    const gridSize = 5;

    expect(canMoveInDirection('north', actorPosition, gridSize)).toBe(true);
    expect(canMoveInDirection('east', actorPosition, gridSize)).toBe(true);
    expect(canMoveInDirection('south', actorPosition, gridSize)).toBe(true);
    expect(canMoveInDirection('west', actorPosition, gridSize)).toBe(true);
  });
});

describe('canMoveInDirection', () => {
  it('should allow movement from border (0,4) only south and east', () => {
    const actorPosition = { x: 0, y: 4 };
    const gridSize = 5;

    expect(canMoveInDirection('north', actorPosition, gridSize)).toBe(false);
    expect(canMoveInDirection('east', actorPosition, gridSize)).toBe(true);
    expect(canMoveInDirection('south', actorPosition, gridSize)).toBe(true);
    expect(canMoveInDirection('west', actorPosition, gridSize)).toBe(false);
  });
});

describe('canMoveInDirection', () => {
  it('should allow movement from border (4,0) only north and west', () => {
    const actorPosition = { x: 4, y: 0 };
    const gridSize = 5;

    expect(canMoveInDirection('north', actorPosition, gridSize)).toBe(true);
    expect(canMoveInDirection('east', actorPosition, gridSize)).toBe(false);
    expect(canMoveInDirection('south', actorPosition, gridSize)).toBe(false);
    expect(canMoveInDirection('west', actorPosition, gridSize)).toBe(true);
  });
});
