const Tree = require("./script.js");

describe("Binary Search Tree", () => {
  let tree;

  beforeEach(() => {
    tree = new Tree([4, 7, 2, 9, 1, 5, 3]);
  });

  test("should build a balanced tree", () => {
    expect(tree.root.data).toBe(4);
    expect(tree.root.left.data).toBe(2);
    expect(tree.root.right.data).toBe(7);
  });

  test("should insert a value into the tree", () => {
    tree.insert(6);
    expect(tree.find(6).data).toBe(6);
  });

  test("should delete a value from the tree", () => {
    tree.delete(7);
    expect(tree.find(7)).toBe(null);
  });

  test("should find a value in the tree", () => {
    const node = tree.find(5);
    expect(node.data).toBe(5);
  });

  test("should perform level-order traversal", () => {
    const values = tree.levelOrder();
    expect(values).toEqual([4, 2, 7, 1, 3, 5, 9]);
  });

  test("should perform inorder traversal", () => {
    const values = tree.inorder();
    expect(values).toEqual([1, 2, 3, 4, 5, 7, 9]);
  });

  test("should perform preorder traversal", () => {
    const values = tree.preorder();
    expect(values).toEqual([4, 2, 1, 3, 7, 5, 9]);
  });

  test("should perform postorder traversal", () => {
    const values = tree.postorder();
    expect(values).toEqual([1, 3, 2, 5, 9, 7, 4]);
  });

  test("should return the height of a node", () => {
    const height = tree.height(tree.root);
    expect(height).toBe(2);
  });

  test("should return the depth of a node", () => {
    const depth = tree.depth(tree.root.left);
    expect(depth).toBe(1);
  });

  test("should check if the tree is balanced", () => {
    expect(tree.isBalanced()).toBe(true);
  });

  test("should rebalance the tree", () => {
    tree.insert(10);
    tree.insert(11);
    tree.rebalance();
    expect(tree.isBalanced()).toBe(true);
  });
});
