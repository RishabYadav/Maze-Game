# Contributing to Maze Solver & Visualizer

Thank you for your interest in contributing! This project was created as part of an interview assignment, but improvements and suggestions are always welcome.

## How to Contribute

### Reporting Issues
- Check if the issue already exists
- Provide detailed description
- Include steps to reproduce
- Share screenshots if applicable
- Mention device/OS information

### Suggesting Enhancements
- Describe the enhancement clearly
- Explain why it would be useful
- Provide examples if possible

### Code Contributions

#### Getting Started
1. Fork the repository
2. Clone your fork
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test thoroughly
6. Commit with meaningful messages
7. Push to your fork
8. Create a Pull Request

#### Code Standards
- Follow existing code style
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused
- Write clean, readable code
- Test on both iOS and Android

#### Commit Message Format
```
<type>: <description>

[optional body]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Build process or auxiliary tool changes

Examples:
- `feat: Add adjustable animation speed`
- `fix: Resolve path reconstruction issue in A*`
- `docs: Update setup instructions`

### Testing Guidelines
- Test all algorithms (BFS, DFS, A*)
- Verify on different maze sizes
- Check edge cases (no path, single cell, etc.)
- Test on iOS and Android
- Ensure responsive layout works
- Verify animations are smooth

### Pull Request Process
1. Update README.md if needed
2. Ensure all tests pass
3. Update documentation
4. Describe your changes clearly
5. Reference any related issues

## Development Setup

See [README.md](README.md) for setup instructions.

## Project Structure

```
src/
├── App.js                  # Main component
├── algorithms/             # Pathfinding algorithms
├── components/             # Reusable UI components
└── utils/                  # Utility functions
```

## Areas for Contribution

### High Priority
- [ ] Performance optimization for large mazes
- [ ] Unit tests for algorithms
- [ ] Integration tests for UI
- [ ] Accessibility improvements

### Medium Priority
- [ ] Adjustable animation speed
- [ ] Manual maze editing
- [ ] Path cost visualization
- [ ] Algorithm comparison view

### Low Priority
- [ ] Dark mode support
- [ ] Maze templates library
- [ ] Export maze as image
- [ ] Social sharing features

## Questions?

Feel free to open an issue for any questions or clarifications.

## License

This is an educational project created for interview purposes.

---

Thank you for contributing! 🙏
