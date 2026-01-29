// Maze cell types
export const CELL_TYPES = {
  EMPTY: 0,
  WALL: 1,
  START: 2,
  END: 3,
  PATH: 4,
  EXPLORED: 5,
  CURRENT: 6,
};

// Predefined maze from the images (21x21 grid)
export const PREDEFINED_MAZE = [
  [2, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
  [1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 3],
];

/**
 * Generate a random maze with guaranteed path from start to end
 */
export const generateRandomMaze = (rows = 21, cols = 21) => {
  // Initialize maze with all empty cells
  const maze = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(CELL_TYPES.EMPTY));

  // Add random walls (but not too many to ensure path exists)
  const wallDensity = 0.3; // 30% walls
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (Math.random() < wallDensity) {
        maze[row][col] = CELL_TYPES.WALL;
      }
    }
  }

  // Set START and END
  maze[0][0] = CELL_TYPES.START;
  maze[rows - 1][cols - 1] = CELL_TYPES.END;

  // Clear a guaranteed path from start to end (snake path)
  // This ensures there's always at least one valid path
  let currentRow = 0;
  let currentCol = 0;

  // Move right and down alternatively to create a guaranteed path
  while (currentRow < rows - 1 || currentCol < cols - 1) {
    maze[currentRow][currentCol] = CELL_TYPES.EMPTY;

    // Randomly choose to go right or down (if possible)
    if (currentRow === rows - 1) {
      // Can only go right
      currentCol++;
    } else if (currentCol === cols - 1) {
      // Can only go down
      currentRow++;
    } else {
      // Can go either direction - choose randomly
      if (Math.random() < 0.5) {
        currentCol++;
      } else {
        currentRow++;
      }
    }
  }

  // Ensure START and END are not walls
  maze[0][0] = CELL_TYPES.START;
  maze[rows - 1][cols - 1] = CELL_TYPES.END;

  // Clear immediate neighbors of START
  if (rows > 1) maze[1][0] = CELL_TYPES.EMPTY;
  if (cols > 1) maze[0][1] = CELL_TYPES.EMPTY;

  // Clear immediate neighbors of END
  if (rows > 1) maze[rows - 2][cols - 1] = CELL_TYPES.EMPTY;
  if (cols > 1) maze[rows - 1][cols - 2] = CELL_TYPES.EMPTY;

  return maze;
};

/**
 * Find start and end positions in the maze
 */
export const findStartEnd = (maze) => {
  let start = null;
  let end = null;

  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[0].length; col++) {
      if (maze[row][col] === CELL_TYPES.START) {
        start = { row, col };
      } else if (maze[row][col] === CELL_TYPES.END) {
        end = { row, col };
      }
    }
  }

  return { start, end };
};

/**
 * Get valid neighbors for a cell
 */
export const getNeighbors = (maze, row, col) => {
  const neighbors = [];
  const directions = [
    [-1, 0], // Up
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Left
  ];

  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;

    if (
      newRow >= 0 &&
      newRow < maze.length &&
      newCol >= 0 &&
      newCol < maze[0].length &&
      maze[newRow][newCol] !== CELL_TYPES.WALL
    ) {
      neighbors.push({ row: newRow, col: newCol });
    }
  }

  return neighbors;
};

/**
 * Create a copy of the maze
 */
export const copyMaze = (maze) => {
  return maze.map((row) => [...row]);
};

/**
 * Reset maze visualization (remove path and explored cells)
 */
export const resetMazeVisualization = (maze) => {
  return maze.map((row) =>
    row.map((cell) => {
      if (
        cell === CELL_TYPES.PATH ||
        cell === CELL_TYPES.EXPLORED ||
        cell === CELL_TYPES.CURRENT
      ) {
        return CELL_TYPES.EMPTY;
      }
      return cell;
    }),
  );
};
