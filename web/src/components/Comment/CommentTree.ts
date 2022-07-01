const arrayToTree = dataset => {
  const hashTable = Object.create(null);
  dataset.forEach(aData => hashTable[aData.id] = {...aData, children: []});
  const dataTree = [];
  dataset.forEach(aData => {
    if (aData.parentCommentId)
      hashTable[aData.parentCommentId].children.push(hashTable[aData.id])
    else dataTree.push(hashTable[aData.id])
  });
  return dataTree;
};

export { arrayToTree };

type TreeItem<T> = T & { children: TreeItem<T>[] }

export default function buildTree<T>(
  array: T[],
  elementKey: keyof T,
  parentKey: keyof T
): TreeItem<T>[] {
  let tree = [] as TreeItem<T>[]
  for (let i = 0; i < array.length; i++) {
    if (array[i][parentKey]) {
      let parent = array
        .filter((elem) => elem[elementKey] === array[i][parentKey])
        .pop() as TreeItem<T>
      if (!parent['children']) {
        parent.children = []
      }
      parent.children.push(array[i] as TreeItem<T>)
    } else {
      tree.push(array[i] as TreeItem<T>)
    }
  }
  return tree
}