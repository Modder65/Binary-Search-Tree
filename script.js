class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    const sortedArray = [...new Set(arr)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
  }

  buildTree(arr) {
    if (arr.length === 0) return null;
    const midIdx = Math.floor(arr.length / 2);
    const rootNode = new Node(arr[midIdx]);
    rootNode.left = this.buildTree(arr.slice(0, midIdx));
    rootNode.right = this.buildTree(arr.slice(midIdx + 1));
    return rootNode;
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (value < current.data) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (value > current.data) {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else {
        // No duplicates allowed
        return;
      }
    }
  }

  delete(value) {
    const removeNode = (node, value) => {
      if (!node) return null;
      if (value === node.data) {
        // Node with no children
        if (!node.left && !node.right) return null;
        // Node with one child
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        // Node with two children
        let tempNode = node.right;
        while (tempNode.left) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else {
        node.right = removeNode(node.right, value);
        return node;
      }
    };
    this.root = removeNode(this.root, value);
  }

  find(value) {
    let current = this.root;
    while (current) {
      if (value === current.data) return current;
      if (value < current.data) current = current.left;
      else current = current.right;
    }
    return null;
  }

  levelOrder(fn = null) {
    if (!this.root) return [];
    const queue = [this.root];
    const values = [];
    while (queue.length) {
      const currentNode = queue.shift();
      if (fn) {
        fn(currentNode);
      } else {
        values.push(currentNode.data);
      }
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    return values;
  }

  inorder(fn = null, node = this.root, values = []) {
    if (node) {
      this.inorder(fn, node.left, values);
      if (fn) fn(node);
      else values.push(node.data);
      this.inorder(fn, node.right, values);
    }
    return values;
  }

  preorder(fn = null, node = this.root, values = []) {
    if (node) {
      if (fn) fn(node);
      else values.push(node.data);
      this.preorder(fn, node.left, values);
      this.preorder(fn, node.right, values);
    }
    return values;
  }

  postorder(fn = null, node = this.root, values = []) {
    if (node) {
      this.postorder(fn, node.left, values);
      this.postorder(fn, node.right, values);
      if (fn) fn(node);
      else values.push(node.data);
    }
    return values;
  }

  height(node) {
    if (!node) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    let depth = 0;
    let current = this.root;
    while (current && current.data !== node.data) {
      depth++;
      if (node.data < current.data) current = current.left;
      else current = current.right;
    }
    return current ? depth : -1;
  }

  isBalanced(node = this.root) {
    if (!node) return true;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    const values = this.inorder();
    this.root = this.buildTree(values);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

module.exports = Tree;
