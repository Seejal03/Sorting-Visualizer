
export const getBubbleSortAnimations = (array) => {
  const animations = [];
  const n = array.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push([j, j + 1, 'compare']);
      if (array[j] > array[j + 1]) {
        animations.push([j, j + 1, 'swap']);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return animations;
};

export const getSelectionSortAnimations = (array) => {
  const animations = [];
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      animations.push([minIdx, j, 'compare']);
      if (array[j] < array[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      animations.push([i, minIdx, 'swap']);
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
    }
  }
  return animations;
};

export const getInsertionSortAnimations = (array) => {
  const animations = [];
  const n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      animations.push([j, j + 1, 'compare']);
      animations.push([j, j + 1, 'swap']);
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
  }
  return animations;
};

export const getQuickSortAnimations = (array, left = 0, right = array.length - 1, animations = []) => {
  if (left >= right) return animations;
  const pivotIndex = partition(array, left, right, animations);
  getQuickSortAnimations(array, left, pivotIndex - 1, animations);
  getQuickSortAnimations(array, pivotIndex + 1, right, animations);
  return animations;
};

const partition = (array, left, right, animations) => {
  const pivot = array[right];
  let i = left - 1;
  for (let j = left; j < right; j++) {
    animations.push([j, right, 'compare']);
    if (array[j] < pivot) {
      i++;
      animations.push([i, j, 'swap']);
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  animations.push([i + 1, right, 'swap']);
  [array[i + 1], array[right]] = [array[right], array[i + 1]];
  return i + 1;
};

export const getMergeSortAnimations = (array) => {
  const animations = [];
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
};

const mergeSortHelper = (mainArray, startIdx, endIdx, auxiliaryArray, animations) => {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
};

const doMerge = (mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) => {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j, 'compare']);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i], 'overwrite']);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j], 'overwrite']);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([k, auxiliaryArray[i], 'overwrite']);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([k, auxiliaryArray[j], 'overwrite']);
    mainArray[k++] = auxiliaryArray[j++];
  }
};

export const getRadixSortAnimations = (array) => {
  const animations = [];
  const max = Math.max(...array);
  let exp = 1;
  while (Math.floor(max / exp) > 0) {
    countSort(array, exp, animations);
    exp *= 10;
  }
  return animations;
};

const countSort = (array, exp, animations) => {
  const output = new Array(array.length).fill(0);
  const count = new Array(10).fill(0);
  for (let i = 0; i < array.length; i++) {
    count[Math.floor(array[i] / exp) % 10]++;
  }
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  for (let i = array.length - 1; i >= 0; i--) {
    const digit = Math.floor(array[i] / exp) % 10;
    output[count[digit] - 1] = array[i];
    animations.push([count[digit] - 1, array[i], 'overwrite']);
    count[digit]--;
  }
  for (let i = 0; i < array.length; i++) {
    array[i] = output[i];
  }
};