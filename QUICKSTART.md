# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd Maze-Solver
npm install
```

### Step 2: Run the App
**iOS (macOS only):**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

**Note**: Make sure you have an emulator running or device connected.

### Step 3: Solve Mazes!
1. Select an algorithm (BFS, DFS, or A*)
2. Tap "Solve Maze" button
3. Watch the visualization!

## 📱 App Features at a Glance

### Buttons & Controls
- **BFS / DFS / A*** - Select pathfinding algorithm
- **Solve Maze** - Start solving the current maze
- **Reset** - Clear visualization and reset to initial state
- **Random Maze** - Generate a new random maze

### What You'll See
- 🟢 **Green cell (S)** - Start point
- 🔴 **Red cell (E)** - End point
- ⬛ **Black cells** - Walls (blocked)
- ⬜ **White cells** - Empty (walkable)
- 🟡 **Yellow cells** - Explored during search
- 🔵 **Blue cells** - Final path from start to end

### Statistics Display
After solving, you'll see:
- Algorithm used
- Path found status (✅/❌)
- Number of steps processed
- Time taken (milliseconds)

## 🎯 Algorithm Comparison

Try all three algorithms on the same maze to see the difference!

### BFS (Breadth-First Search)
- **Best for**: Finding shortest path
- **Explores**: Level by level from start
- **Result**: Always finds shortest path

### DFS (Depth-First Search)
- **Best for**: Exploring all possibilities
- **Explores**: Deep paths before backtracking
- **Result**: May not find shortest path

### A* (A-star)
- **Best for**: Optimal pathfinding
- **Explores**: Towards goal using heuristic
- **Result**: Finds shortest path efficiently

## 🐛 Troubleshooting

### Issue: "Command not found: react-native"
**Solution**: Install React Native CLI
```bash
npm install -g react-native-cli
```

### Issue: Metro bundler error
**Solution**: Clear cache and restart
```bash
npm start -- --reset-cache
```

### Issue: iOS build fails
**Solution**: Install CocoaPods and dependencies
```bash
cd ios
pod install
cd ..
npm run ios
```

### Issue: Android build fails
**Solution**: Clean gradle build
```bash
cd android
./gradlew clean
cd ..
npm run android
```

## 💡 Pro Tips

1. **Compare Algorithms**: Reset and try different algorithms on the same maze
2. **Random Mazes**: Generate multiple random mazes to test edge cases
3. **Watch Carefully**: The yellow exploration shows how each algorithm searches
4. **Check Stats**: Compare steps and time between algorithms

## 📚 Learn More

- Read [README.md](README.md) for detailed documentation
- Check [AI_PROMPTS.md](AI_PROMPTS.md) to see AI assistance used
- View [DEVELOPMENT.md](DEVELOPMENT.md) for technical details

## 🎉 Enjoy!

Have fun exploring pathfinding algorithms visually! 

---

**Need Help?** Check the full README.md or create an issue.
