const knightMoves = (startPos, endPos) => {
    const moves = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];

    const isVisited = new Set();
    let count = 0;
    let queue = [[startPos, [startPos]]];


    while (queue.length > 0) {
        let levelSize = queue.length; // Number of positions at the current level
        for (let i = 0; i < levelSize; i++) {
            let [currentPosition, path] = queue.shift();  // Dequeue the current position

            // Check if we've reached the target position
            if (currentPosition[0] === endPos[0] && currentPosition[1] === endPos[1]) {
                console.log('You made it in ' + count + ' moves!');
                console.log("Here's your path:");
                path.forEach(m => console.log(m))
                return { moves: count, path }; // Return the number of moves required to reach endPos
            }


            isVisited.add(currentPosition.toString());

            moves.forEach(move => {
                const [i, j] = move;
                let newMove = [currentPosition[0] + i, currentPosition[1] + j];

                if (checkValidMove(newMove) && !isVisited.has(newMove.toString())) {
                    queue.push([newMove, [...path, newMove]]);
                    isVisited.add(newMove.toString());
                }
            })
        }

        count++;
    }
    return null;
}

const checkValidMove = ([i, j]) => {
    return (!((i > 7 || i < 0) || (j > 7 || j < 0)))
}

knightMoves([0, 0], [7, 8])
console.log(knightMoves([3, 3], [7, 3]));

