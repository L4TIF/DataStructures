const Node = require('./node');


const linkedList = () => {
    let currhead = null;
    let currtail = null;
    const append = (value, pointer = currhead) => {

        // if current head doesnt point to any node.
        if (!currhead) {
            currhead = new Node(value);
            return
        }
        if (!pointer.next) {
            pointer.next = new Node(value);
            return
        }
        return append(value, pointer.next);
    }

    const prepend = (value) => {
        let newHead = new Node(value);
        if (!currhead) {
            currhead = newHead;
            return
        }
        newHead.next = currhead;
        currhead = newHead;
    }


    const head = () => currhead;

    const tail = (pointer = currhead) => {
        if (!currhead) return null;
        if (!pointer.next) return pointer;
        return tail(pointer.next)
    }

    const size = (pointer = currhead) => {
        if (!pointer) return 0;
        return 1 + size(pointer.next)
    }

    const at = (index, pointer = currhead, count = 0) => {
        if (isNaN(index) || index < 0 || index > size()) return;
        if (!pointer) return null;
        if (count == index) return pointer;

        return at(index, pointer.next, ++count);
    }

    const pop = (pointer = currhead) => {
        if (!currhead) return null;
        if (!currhead.next) {
            currhead = null;
            return
        };

        if (!pointer.next.next) {
            pointer.next = null;
            return
        }

        return pop(pointer.next);

    }

    const contains = (value, pointer = currhead) => {
        if (!pointer) return false;
        if (pointer.value === value) return true;
        return contains(value, pointer.next);
    }

    const find = (value, pointer = currhead, index = 0) => {

        if (!pointer) return null;
        if (value === pointer.value) return index;

        return find(value, pointer.next, ++index);
    }

    const toString = (pointer = currhead) => {
        if (!pointer) return null;

        return `(${pointer.value}) -> ` + toString(pointer.next)
    }

    const insertAt = (value, index, pointer = currhead, position = 0) => {
        if (isNaN(index) || index < 0 || index > size()) return;
        if (!pointer) return append(value);
        if (index === 0) return prepend(value);



        if (index - 1 === position) {
            const node = new Node(value);
            node.next = pointer.next;
            pointer.next = node;
            return
        }
        return insertAt(value, index, pointer.next, ++position)
    }


    const removeAt = (index, pointer = currhead, position = 0) => {
        if (isNaN(index) || index < 0 || index > size()) return;
        if (!pointer) return null;
        if (index === 0) {
            currhead = pointer.next;
            return
        }
        if (index - 1 === position) {
            pointer.next = pointer.next ? pointer.next.next : pop();
            return
        }
        return removeAt(index, pointer.next, ++position)
    }

    return {
        append, head, tail, prepend, size, at, pop, contains, find, toString, insertAt, removeAt
    }
}


module.exports = linkedList;