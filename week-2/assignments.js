/////////////////////////////////////////////////////
////////////////////   1.  //////////////////////////
/////////////////////////////////////////////////////
function calculate(min, max) {
  let num = min;
  let sum = 0;
  while (num <= max) {
    sum += num;
    num += 1;
  }
  console.log(sum);
}
calculate(1, 3);
calculate(4, 8);

/////////////////////////////////////////////////////
////////////////////   2.  //////////////////////////
/////////////////////////////////////////////////////
function avg(data) {
  // 請用你的程式補完這個函式的區塊
  let num = data.count;
  let emparray = data.employees;
  let salsum = 0;
  for (let i = 0; i < num; i++) {
    salsum += emparray[i].salary;
  }
  console.log(salsum / num);
}

avg({
  count: 3,
  employees: [
    {
      name: "John",
      salary: 30000,
    },
    {
      name: "Bob",
      salary: 60000,
    },
    {
      name: "Jenny",
      salary: 50000,
    },
  ],
}); // 呼叫 avg 函式

/////////////////////////////////////////////////////
////////////////////   3.  //////////////////////////
/////////////////////////////////////////////////////
//solution 1) O(N^2)
function maxProduct(nums) {
  // 請用你的程式補完這個函式的區塊
  let length = nums.length;
  let biggest = nums[0] * nums[1];
  for (let i = 0; i <= length - 2; i++) {
    for (let n = 2; n <= length - 1; n++) {
      if (nums[i] * nums[n] > biggest) {
        biggest = nums[i] * nums[n];
      }
    }
  }
  console.log(biggest);
}
maxProduct([5, 20, 2, 6]); // 得到 120
maxProduct([10, -20, 0, 3]); // 得到 30
maxProduct([-1, 2]); // 得到 -2
maxProduct([-1, 0, 2]); // 得到 0
maxProduct([-1, -2, 0]); // 得到 2

// solution 2) O(N)
function maxProduct(nums) {
  let posiarray = [0, 0];
  let negaarray = [0, 0];
  nums.forEach((i) => {
    if (i >= 0) {
      if (i > posiarray[0]) {
        posiarray[1] = posiarray[0];
        posiarray[0] = i;
      } else if (i > posiarray[1]) {
        posiarray[1] = i;
      }
    } else {
      if (i < negaarray[0]) {
        negaarray[1] = negaarray[0];
        negaarray[0] = i;
      } else if (i < negaarray[1]) {
        negaarray[1] = i;
      }
    }
  });
  if (nums.length == 2) {
    console.log(nums[0] * nums[1]);
  } else if (posiarray[0] * posiarray[1] > negaarray[0] * negaarray[1]) {
    console.log(posiarray[0] * posiarray[1]);
  } else {
    console.log(negaarray[0] * negaarray[1]);
  }
}
maxProduct([5, 20, 2, 6]); // 得到 120
maxProduct([10, -20, 0, 3]); // 得到 30
maxProduct([-1, 2]); // 得到 -2
maxProduct([-1, 0, 2]); // 得到 0
maxProduct([-1, -2, 0]); // 得到 2

/////////////////////////////////////////////////////
////////////////////   4.  //////////////////////////
/////////////////////////////////////////////////////
function twoSum(nums, target) {
  // your code here
  for (let i = 0; i < nums.length; i++) {
    let dif = target - nums[i];
    if (nums.indexOf(dif) > 0) {
      return [i, nums.indexOf(dif)];
    }
  }
}

let result = twoSum([2, 11, 7, 15], 9);
console.log(result); // show [0, 2] because nums[0]+nums[2] is 9

/////////////////////////////////////////////////////
////////////////////   5.  //////////////////////////
/////////////////////////////////////////////////////
// time complexity O(N)
function maxZeros(nums) {
  let biggest = 0;
  let count = 0;
  nums.forEach((e) => {
    if (e == 0) {
      count += 1;
      if (count > biggest) {
        biggest = count;
      }
    } else {
      count = 0;
    }
  });
  console.log(biggest);
}

maxZeros([0, 1, 0, 0]); // 得到 2
maxZeros([1, 0, 0, 0, 0, 1, 0, 1, 0, 0]); // 得到 4
maxZeros([1, 1, 1, 1, 1]); // 得到 0
maxZeros([0, 0, 0, 1, 1]); // 得到 3
