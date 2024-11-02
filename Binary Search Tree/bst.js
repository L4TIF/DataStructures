const Node = (data, left = null, right = null) => {
    return { data, left, right }
}

const Tree = (array) => { //takes sorted array for buildtree function
    const sortedArray = sortArray(array);



    // create tree with sorted array
    const buildTree = (sortedArray) => {

        if (sortedArray.length === 0) return null;
        const mid = Math.floor(sortedArray.length / 2);
        const root = Node(sortedArray[mid]);
        root.left = buildTree(sortedArray.slice(0, mid)); //create left subtree
        root.right = buildTree(sortedArray.slice(mid + 1)); //create right subtree
        return root;
    }


    // insets node
    const insert = (value, currRoot = root) => {

        if (!currRoot) return Node(value)

        if (value < currRoot.data) // go left
            if (!currRoot.left)
                currRoot.left = Node(value);
            else
                insert(value, currRoot.left);

        else
            if (!currRoot.right)   // go right
                currRoot.right = Node(value);
            else
                insert(value, currRoot.right)

    }


    const findMin = (node) => {
        while (node.left !== null) {
            node = node.left; // Traverse to the leftmost node
        }
        return node; // Return the node with the minimum value
    };


    const deleteItem = (value, currRoot = root) => {
        if (currRoot === null) return currRoot; // base case

        if (currRoot.data > value)
            currRoot.left = deleteItem(value, currRoot.left);
        else if (currRoot.data < value)
            currRoot.right = deleteItem(value, currRoot.right);
        else {
            if (currRoot.left === null)
                return currRoot.right;
            if (currRoot.right === null)
                return currRoot.left;

            // Node with two children: find the in-order successor
            const successor = findMin(currRoot.right);

            // Replace the value of the current node with the successor's value
            currRoot.data = successor.data;

            // Delete the in-order successor
            currRoot.right = deleteItem(successor.data, currRoot.right);


        }


        return currRoot
    }


    // prints the tree 
    const prettyPrint = (currentRoot = root, prefix = "", isLeft = true) => {
        if (currentRoot === null) {
            return;
        }
        if (currentRoot.right !== null) {
            prettyPrint(currentRoot.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${currentRoot.data}`);
        if (currentRoot.left !== null) {
            prettyPrint(currentRoot.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    // find the given node using the value and returns it
    const find = (value, currRoot = root) => {
        if (!currRoot) return null;
        if (currRoot.data === value) return currRoot;


        if (currRoot.data < value)
            return find(value, currRoot.right)
        else
            return find(value, currRoot.left)
    }

    // traverse tree in level order and run a callback function to each node (using recursion)
    const levelOrder = (callback, queue = [root]) => {
        if (!callback) throw new Error('callback is required')
        if (queue.length === 0) return;

        const currentNode = queue.shift(); // retriving the current node to process
        callback(currentNode); // passing the node to the callback

        if (currentNode.left)
            queue.push(currentNode.left);
        if (currentNode.right)
            queue.push(currentNode.right);


        levelOrder(callback, queue)
    }

    // using iteration 
    // const levelOrder = (callback, currRoot = root) => {
    //     if (!currRoot) return null;
    //     let count = 1
    //     const queue = [currRoot]; // Initialize the queue with the root node

    //     while (queue.length > 0) {
    //         const currentNode = queue.shift(); // Remove the first node in the queue
    //         callback(currentNode); // Apply the callback to the current node

    //         // Add the left and right children to the queue if they exist
    //         if (currentNode.left) queue.push(currentNode.left);
    //         if (currentNode.right) queue.push(currentNode.right);

    //         console.log(count++)
    //     }
    // };

    // inOrder traversal of tree and passing each node to callback
    const inOrder = (callback, currentNode = root) => {
        if (!callback) throw new Error('callback required')
        if (!currentNode) return;

        inOrder(callback, currentNode.left);
        callback(currentNode);
        inOrder(callback, currentNode.right)
    }
    // preOrder traversal of tree and passing each node to callback
    const preOrder = (callback, currentNode = root) => {
        if (!callback) throw new Error('callback required')
        if (!currentNode) return;

        callback(currentNode);
        preOrder(callback, currentNode.left);
        preOrder(callback, currentNode.right)
    }

    // postOrder traversal of tree and passing each node to callback
    const postOrder = (callback, currentNode = root) => {
        if (!callback) throw new Error('callback required')
        if (!currentNode) return;

        postOrder(callback, currentNode.left);
        postOrder(callback, currentNode.right)
        callback(currentNode);
    }

    //get height of the tree from given node
    const height = (node = root) => {
        if (!node) return 0;
        return 1 + Math.max(height(node.left), height(node.right));
    }

    //get depth of the tree from root node to the given node
    const depth = (node, currentNode = root, depthNum = 0) => {
        if (!node || typeof node.data === 'undefined') return 'node does not exist'; // if node doesnt exist
        if (!currentNode) return null; // 
        if (node.data === currentNode.data) return depthNum;

        return depth(node, node.data > currentNode.data ? currentNode.right : currentNode.left, depthNum + 1);
    }

    //check whether the tree is balanced or not
    const isBalanced = (node = root) => {
        if (!node) return true;

        const isCurrentlyBalanced = Math.abs(height(node.left) - height(node.right)) <= 1;


        return isCurrentlyBalanced && isBalanced(node.left) && isBalanced(node.right);
    }

    const reBalanced = () => {
        const sortedArray = [];
        inOrder(node => sortedArray.push(node.data));
        root = buildTree(sortedArray);
    }

    let root = buildTree(sortedArray);

    return { root, prettyPrint, insert, deleteItem, find, levelOrder, inOrder, preOrder, postOrder, height, depth, isBalanced, reBalanced }
}

const sortArray = (array) => {
    if (array.length <= 1) return array;
    const mid = Math.floor(array.length / 2)
    const left = sortArray(array.slice(0, mid))
    const right = sortArray(array.slice(mid));

    return merge(left, right);
}

const merge = (left, right) => {
    let result = [];
    while (left.length && right.length) {

        if (left[0] < right[0]) {
            result.push(left.shift());

        } else {

            result.push(right.shift());
        }

    }
    return removeDuplicate(result.concat(left).concat(right));
}

const removeDuplicate = (array) => { // duplicates removed from sorted array
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== array[i + 1])
            result.push(array[i]);
    }
    return result
}

module.exports = Tree;