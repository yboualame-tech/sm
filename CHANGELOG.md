# Changelog

## [1.0.0] - 2026-04-07

### Added
- Initial release of Snake game
- Terminal-based gameplay with real-time rendering
- WASD and Arrow key controls
- Score system and difficulty progression
- Grid-based snake movement
- Random food generation
- Collision detection (walls and self)

### Technical
- Pure C99 implementation
- No external dependencies (POSIX only)
- Modular architecture with separate snake, food, and game modules
- Memory-safe with ASAN support
- Cross-platform (macOS, Linux)

### Features
- Grid size: 30x15 cells
- Progressive difficulty (speed increases with score)
- Game over detection
- Restart functionality
