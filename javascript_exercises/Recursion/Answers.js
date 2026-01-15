// 1
const findFactorial = function (num) {
    if (num === 0 || num === 1) {
        return 1;
    }
    return num * findFactorial(num - 1);
};

console.log(findFactorial(5));

// 2
const reverseString = function (str) {
    if (str === "") {
        return "";
    }
    return reverseString(str.substr(1)) + str.charAt(0);
};

console.log(reverseString("hello"));

// 3
const swap = function (arr1, arr2) {
    if (arr1.length === 0) {
        return;
    }

    const item = arr1.shift();
    arr2.push(item);

    return swap(arr1, arr2);
};

console.log(swap([1, 2, 3], []));

// Extension

const stack1 = [1, 2, 3];
const stack2 = [];

const swap2 = function(s1, s2) {
  if (s1.length === 0) {
    return;
  }

  const item = s1.pop();
  s2.push(item);

  return swap2(s1, s2);
};

swap2(stack1, stack2);

console.log(stack1);
console.log(stack2);

