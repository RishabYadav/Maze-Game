import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import MazeGrid from './components/MazeGrid';
import Button from './components/Button';
import Legend from './components/Legend';
import {
  PREDEFINED_MAZE,
  CELL_TYPES,
  copyMaze,
  resetMazeVisualization,
  findStartEnd,
  generateRandomMaze,
} from './utils/mazeUtils';
import { solveBFS, solveDFS, solveAStar } from './algorithms/pathfinding';

const { width } = Dimensions.get('window');

const App = () => {
  const [maze, setMaze] = useState(PREDEFINED_MAZE);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('BFS');
  const [stats, setStats] = useState(null);

  // Calculate cell size based on screen width
  const cellSize = Math.floor((width - 40) / maze[0].length);

  const handleReset = useCallback(() => {
    setMaze(resetMazeVisualization(copyMaze(PREDEFINED_MAZE)));
    setStats(null);
  }, []);

  const handleRandomMaze = useCallback(() => {
    const newMaze = generateRandomMaze(21, 21);
    setMaze(newMaze);
    setStats(null);
  }, []);

  const handleSolve = useCallback(async () => {
    setIsProcessing(true);
    setStats(null);

    // Reset visualization first
    const cleanMaze = resetMazeVisualization(copyMaze(maze));
    setMaze(cleanMaze);

    // Find start and end
    const { start, end } = findStartEnd(cleanMaze);

    if (!start || !end) {
      Alert.alert('Error', 'Start or End point not found in maze!');
      setIsProcessing(false);
      return;
    }

    const startTime = Date.now();

    // Update callback for animation
    const updateCallback = (step) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          setMaze((prevMaze) => {
            const newMaze = copyMaze(prevMaze);
            if (step.type === 'explore') {
              newMaze[step.row][step.col] = CELL_TYPES.EXPLORED;
            } else if (step.type === 'path') {
              newMaze[step.row][step.col] = CELL_TYPES.PATH;
            }
            return newMaze;
          });
          resolve();
        }, 20); // Animation speed
      });
    };

    let result;
    try {
      switch (selectedAlgorithm) {
        case 'BFS':
          result = await solveBFS(cleanMaze, start, end, updateCallback);
          break;
        case 'DFS':
          result = await solveDFS(cleanMaze, start, end, updateCallback);
          break;
        case 'A*':
          result = await solveAStar(cleanMaze, start, end, updateCallback);
          break;
        default:
          result = await solveBFS(cleanMaze, start, end, updateCallback);
      }

      const endTime = Date.now();
      const timeTaken = endTime - startTime;

      setStats({
        algorithm: selectedAlgorithm,
        found: result.found,
        steps: result.steps,
        time: timeTaken,
      });

      if (!result.found) {
        Alert.alert('No Path Found', 'There is no valid path from Start to End!');
      }
    } catch (error) {
      console.error('Error solving maze:', error);
      Alert.alert('Error', 'An error occurred while solving the maze');
    }

    setIsProcessing(false);
  }, [maze, selectedAlgorithm]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>🧩 Maze Solver & Visualizer</Text>
          <Text style={styles.subtitle}>
            Find the path from Start (S) to End (E)
          </Text>
        </View>

        <View style={styles.mazeContainer}>
          <MazeGrid maze={maze} cellSize={cellSize} />
        </View>

        <Legend />

        {stats && (
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Results:</Text>
            <Text style={styles.statsText}>
              Algorithm: {stats.algorithm}
            </Text>
            <Text style={styles.statsText}>
              Status: {stats.found ? '✅ Path Found' : '❌ No Path'}
            </Text>
            <Text style={styles.statsText}>
              Steps Processed: {stats.steps}
            </Text>
            <Text style={styles.statsText}>
              Time: {stats.time}ms
            </Text>
          </View>
        )}

        <View style={styles.algorithmSelector}>
          <Text style={styles.sectionTitle}>Select Algorithm:</Text>
          <View style={styles.algorithmButtons}>
            {['BFS', 'DFS', 'A*'].map((algo) => (
              <Button
                key={algo}
                title={algo}
                onPress={() => setSelectedAlgorithm(algo)}
                variant={selectedAlgorithm === algo ? 'success' : 'secondary'}
                style={styles.algoButton}
                disabled={isProcessing}
              />
            ))}
          </View>
        </View>

        <View style={styles.controls}>
          <Button
            title="Solve Maze"
            onPress={handleSolve}
            disabled={isProcessing}
            variant="primary"
            style={styles.controlButton}
          />
          <Button
            title="Reset"
            onPress={handleReset}
            disabled={isProcessing}
            variant="secondary"
            style={styles.controlButton}
          />
          <Button
            title="Random Maze"
            onPress={handleRandomMaze}
            disabled={isProcessing}
            variant="success"
            style={styles.controlButton}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.infoTitle}>About Algorithms:</Text>
          <Text style={styles.infoText}>
            • <Text style={styles.bold}>BFS</Text> (Breadth-First Search): Guarantees
            shortest path
          </Text>
          <Text style={styles.infoText}>
            • <Text style={styles.bold}>DFS</Text> (Depth-First Search): Explores deeply,
            may not find shortest path
          </Text>
          <Text style={styles.infoText}>
            • <Text style={styles.bold}>A*</Text>: Optimal pathfinding with heuristic
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  mazeContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  algorithmSelector: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  algorithmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  algoButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  controlButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  statsContainer: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1976d2',
  },
  statsText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 2,
  },
  info: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoText: {
    fontSize: 13,
    color: '#555',
    marginVertical: 3,
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default App;
