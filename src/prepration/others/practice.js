// function containsDuplicates (nums){

//   let map = {};

//   if(Array.isArray(nums)){

//     for(let i=0; i< nums.length; i++){
//       if(map[nums[i]]!== undefined){
//         return true;
//       } else{
//         map[nums[i]] = i;
//       }
//     }
//   }
//   return false;
// }

// Output:

// 19 ms | 44.9 MB
// true

function containsDuplicates(nums) {
  const set = new Set();

  for (const num of nums) {
    if (set.has(num)) {
      return true;
    }
    set.add(num);
  }
  return false;
}

// Output:

// 19 ms | 45.1 MB
// true
console.log(containsDuplicates([0, 1, 0, 0, 1]));
//======

// function isAnagram(s,t) {
//   if(s.length!==t.length){
//     return false;
//   }

//   s = s.toLowerCase().split('').sort().join('');

//   t = t.toLowerCase().split('').sort().join('');

//   console.log(s, t);

//   if(s===t){
//     return true;

//   }

//   return false;

// }

function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  let map = {};
  for (ch of s) {
    map[ch] = (map[ch] || 0) + 1;
  }
  for (ch of t) {
    if (!map[ch]) {
      return false;
    }
    map[ch]--;
  }
  return true;
}

console.log(isAnagram("anagram", "nagaram"));
//======
function twoSum(nums, target) {
  let map = {};

  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map[diff] !== undefined) {
      return [map[diff], i];
    }
    map[nums[i]] = i;
  }
  return [];
}

console.log(twoSum([2, 7, 9, 11], 9));

// Output:

// 19 ms | 45.3 MB
// [ 0, 1 ]


//======

// Input:

// str = "leetcode";
// Output:

// "l";


function firstNonRepeatingChar (str){
  
  let freq = {};
  
  for(ch of str){
    freq[ch] = (freq[ch]||0) + 1;
  }
  
  for(ch of str){
   if(freq[ch] === 1){
    return ch;
   }
  }
  return null;
  
}

console.log(firstNonRepeatingChar("IBM INDIA"))

// Output:

// 19 ms | 45.2 MB
// B

//======

// Input:

// nums = [0, 1, 0, 3, 12];
// Output:

// [1, 3, 12, 0, 0];


function moveZero(nums){
  let index = 0;
  
  for (let i =0 ; i< nums.length; i++){
    if(nums[i]!==0){
      nums[index++] = nums[i];
    }
  }
  
  while(index<nums.length){
    nums[index++] = 0;
  }
  
  return nums;
}

console.log(moveZero([1, 1, 0, 1, 0, 3, 12, 0, 0]))

// Output:

// 19 ms | 44.7 MB
// [
//   1, 1, 1, 3, 12,
//   0, 0, 0, 0
// ]
