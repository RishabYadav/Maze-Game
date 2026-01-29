import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CELL_TYPES } from "../utils/mazeUtils";

const Cell = ({ type, size, row, col, maze }) => {
  const isStart = type === CELL_TYPES.START;
  const isEnd = type === CELL_TYPES.END;
  const isPath = type === CELL_TYPES.PATH;
  const isExplored = type === CELL_TYPES.EXPLORED;

  // Determine which borders to draw based on walls
  const getBorders = () => {
    const borders = {
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderColor: "#000",
      borderStyle: "solid",
    };

    const rows = maze.length;
    const cols = maze[0].length;

    // Draw border if adjacent cell is a wall
    // Top border
    if (row === 0 || maze[row - 1][col] === CELL_TYPES.WALL) {
      borders.borderTopWidth = 2;
    }
    // Left border
    if (col === 0 || maze[row][col - 1] === CELL_TYPES.WALL) {
      borders.borderLeftWidth = 2;
    }
    // Right border
    if (col === cols - 1 || maze[row][col + 1] === CELL_TYPES.WALL) {
      borders.borderRightWidth = 2;
    }
    // Bottom border
    if (row === rows - 1 || maze[row + 1][col] === CELL_TYPES.WALL) {
      borders.borderBottomWidth = 2;
    }

    return borders;
  };

  const getCellBackground = () => {
    // Don't show explored cells background, only the path line
    return null;
  };

  // Draw blue line through path cells
  const getPathLine = () => {
    if (!isPath) return null;

    const rows = maze.length;
    const cols = maze[0].length;

    // Check neighbors to determine line direction
    const hasPathAbove =
      row > 0 &&
      (maze[row - 1][col] === CELL_TYPES.PATH ||
        maze[row - 1][col] === CELL_TYPES.START);
    const hasPathBelow =
      row < rows - 1 &&
      (maze[row + 1][col] === CELL_TYPES.PATH ||
        maze[row + 1][col] === CELL_TYPES.END);
    const hasPathLeft =
      col > 0 &&
      (maze[row][col - 1] === CELL_TYPES.PATH ||
        maze[row][col - 1] === CELL_TYPES.START);
    const hasPathRight =
      col < cols - 1 &&
      (maze[row][col + 1] === CELL_TYPES.PATH ||
        maze[row][col + 1] === CELL_TYPES.END);

    return (
      <View style={styles.pathLineContainer}>
        {/* Vertical line */}
        {(hasPathAbove || hasPathBelow || isStart || isEnd) && (
          <View style={[styles.pathLineVertical, { height: size }]} />
        )}
        {/* Horizontal line */}
        {(hasPathLeft || hasPathRight || isStart || isEnd) && (
          <View style={[styles.pathLineHorizontal, { width: size }]} />
        )}
      </View>
    );
  };

  const getMarkerStyle = () => {
    if (isStart) return styles.startMarker;
    if (isEnd) return styles.endMarker;
    return null;
  };

  const getLabel = () => {
    if (isStart) return "S";
    if (isEnd) return "E";
    return null;
  };

  const label = getLabel();
  const markerStyle = getMarkerStyle();

  // Don't render wall cells at all - they're just gaps
  if (type === CELL_TYPES.WALL) {
    return <View style={[styles.cell, { width: size, height: size }]} />;
  }

  return (
    <View
      style={[
        styles.cell,
        { width: size, height: size },
        getBorders(),
        getCellBackground(),
      ]}
    >
      {getPathLine()}
      {markerStyle && (
        <View
          style={[
            markerStyle,
            {
              width: size * 0.7,
              height: size * 0.7,
              borderRadius: size * 0.35,
            },
          ]}
        >
          <Text style={[styles.label, { fontSize: size * 0.45 }]}>{label}</Text>
        </View>
      )}
    </View>
  );
};

const MazeGrid = ({ maze, cellSize }) => {
  if (!maze || maze.length === 0) return null;

  return (
    <View style={styles.container}>
      {maze.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              type={cell}
              size={cellSize}
              row={rowIndex}
              col={colIndex}
              maze={maze}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: "#000",
    alignSelf: "center",
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    position: "relative",
  },
  pathLineContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  pathLineVertical: {
    position: "absolute",
    width: 4,
    backgroundColor: "#2196F3",
  },
  pathLineHorizontal: {
    position: "absolute",
    height: 4,
    backgroundColor: "#2196F3",
  },
  explored: {
    backgroundColor: "#FFE082",
  },
  startMarker: {
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  endMarker: {
    backgroundColor: "#f44336",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default MazeGrid;
