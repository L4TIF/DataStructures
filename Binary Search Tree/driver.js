const Tree = require("./bst");

const getRandomNumber = (num) => {
    const array = [];
    for (let i = 0; i < num; i++) {
        array.push(Math.floor(Math.random() * 100));
    }
    return array
}


const arr = getRandomNumber(100)
const binaryTree = Tree(arr);


// binaryTree.prettyPrint();

// binaryTree.levelOrder(node => console.log((node.data)))
// binaryTree.preOrder(node => console.log(node.data))
// binaryTree.inOrder(node => console.log(node.data))
// binaryTree.postOrder(node => console.log(node.data))


binaryTree.insert(121);
binaryTree.insert(212);
binaryTree.insert(565);
binaryTree.insert(265);

console.log(binaryTree.isBalanced());
binaryTree.reBalanced();
console.log(binaryTree.isBalanced());

binaryTree.prettyPrint();


// binaryTree.levelOrder(node => console.log((node.data)))
// binaryTree.preOrder(node => console.log(node.data))
// binaryTree.inOrder(node => console.log(node.data))
// binaryTree.postOrder(node => console.log(node.data))
