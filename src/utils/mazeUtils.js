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
 * Generate a random maze using recursive backtracking
 */
export const generateRandomMaze = (rows = 21, cols = 21) => {
  const maze = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(CELL_TYPES.WALL));

  const stack = [];
  const startRow = 1;
  const startCol = 1;

  maze[startRow][startCol] = CELL_TYPES.EMPTY;
  stack.push([startRow, startCol]);

  const directions = [
    [-2, 0],
    [2, 0],
    [0, -2],
    [0, 2],
  ];

  while (stack.length > 0) {
    const [row, col] = stack[stack.length - 1];

    const neighbors = [];
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (
        newRow > 0 &&
        newRow < rows - 1 &&
        newCol > 0 &&
        newCol < cols - 1 &&
        maze[newRow][newCol] === CELL_TYPES.WALL
      ) {
        neighbors.push([newRow, newCol, row + dr / 2, col + dc / 2]);
      }
    }

    if (neighbors.length > 0) {
      const [newRow, newCol, wallRow, wallCol] =
        neighbors[Math.floor(Math.random() * neighbors.length)];
      maze[newRow][newCol] = CELL_TYPES.EMPTY;
      maze[wallRow][wallCol] = CELL_TYPES.EMPTY;
      stack.push([newRow, newCol]);
    } else {
      stack.pop();
    }
  }

  // Set start and end
  maze[0][0] = CELL_TYPES.START;
  maze[rows - 1][cols - 1] = CELL_TYPES.END;

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
