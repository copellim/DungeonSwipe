# DungeonSwipe

Turn-based mobile dungeon game built with React Native. Educational project featuring swipe navigation, enemy AI patterns, and puzzle-solving gameplay. Learning mobile development through game creation.

## Game Concept

A puzzle-adventure game where players navigate dungeons in first-person view, using swipe gestures to move between rooms. Each movement triggers enemy AI, creating a turn-based strategic experience where timing and planning are crucial to avoid enemies and reach objectives.

### Core Mechanics

- **Turn-based Movement**: Every player action triggers mob movement
- **Swipe Controls**: Natural mobile gestures for navigation
- **Enemy AI**: Mobs follow fixed movement patterns with bounce logic
- **Objective-based**: Reach targets while avoiding collisions
- **Room Navigation**: Move between connected dungeon rooms

## How to Play

1. **Movement**: Swipe up/down/left/right to move between adjacent rooms
2. **Objective**: Reach the target (goal) position in each level
3. **Avoid Enemies**: Don't let mobs catch you - collision means game over
4. **Strategy**: Plan your route carefully, as enemies move after each of your moves

## Current Features (PoC Complete)

- [x] Swipe-based movement system
- [x] 5x5 grid-based gameplay
- [x] Turn-based mechanics
- [x] Enemy AI with bounce patterns
- [x] Collision detection
- [x] Win/lose conditions
- [x] Game state management
- [x] TypeScript integration

## Roadmap

### Phase 1: First Person View

- [ ] Room-based rendering instead of grid view
- [ ] Atmospheric backgrounds for each room
- [ ] Navigation indicators (doors/passages)
- [ ] Audio feedback system
- [ ] Smooth transitions between rooms

### Phase 2: Content & Progression

- [ ] Multiple dungeon levels
- [ ] Various enemy types with different AI patterns
- [ ] Inventory system
- [ ] Story elements and NPCs to rescue
- [ ] Level progression system

### Phase 3: Production Ready

- [ ] Performance optimizations
- [ ] Enhanced state management (Context API)
- [ ] Sound effects and music
- [ ] App store preparation

## Learning Goals

This project serves as a practical learning exercise for:

- **React Native Development**: Mobile app architecture and patterns
- **TypeScript Integration**: Type safety in React Native projects
- **Game Development Concepts**: Turn-based systems, AI patterns, state management
- **Mobile UX**: Touch controls, responsive design, performance optimization
- **Project Management**: Roadmap planning, feature development lifecycle

## Contributing

This is an educational project, but suggestions and improvements are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

GNU General Public License v3.0 - feel free to use this code for learning purposes.

## Play Status

**Current Version**: Proof of Concept (Complete)  
**Next Milestone**: First Person View Implementation  
**Playable**: Yes (basic grid-based version)
