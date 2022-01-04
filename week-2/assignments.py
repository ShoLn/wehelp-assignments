# ##################################################
# ##################################################1.
# def calculate(min, max):
#     len = max - min + 1
#     sum = 0
#     for i in range(len):
#         new = min + i
#         sum += new
#     print(sum)
# calculate(1, 3)
# calculate(4, 8)

# ##################################################
# ##################################################2.
# def avg(data):
# # 請用你的程式補完這個函式的區塊
#     num = data['count']
#     emparray = data['employees']
#     salsum = 0
#     for i in range(num):
#         salsum += emparray[i]['salary']
#     print(salsum / num)

# avg({
# "count":3,
# "employees":[
# {
# "name":"John",
# "salary":30000
# },
# {
# "name":"Bob",
# "salary":60000
# },
# {
# "name":"Jenny",
# "salary":50000
# }
# ]
# }) # 呼叫 avg 函式

# ##################################################
# ##################################################3.
# def maxProduct(nums):
# # 請用你的程式補完這個函式的區塊
#     length = len(nums)
#     biggest = nums[0] * nums[1]
#     for i in range(length-1):
#         for n in range(i+1, length):
#             if nums[i] * nums[n] > biggest:
#                 biggest = nums[i] * nums[n]
#     print(biggest)

# maxProduct([5, 20, 2, 6]) # 得到 120
# maxProduct([10, -20, 0, 3]) # 得到 30
# maxProduct([-1, 2]) # 得到 -2
# maxProduct([-1, 0, 2]) # 得到 0
# maxProduct([-1, -2, 0]) # 得到 2



# ##################################################
# ##################################################4.
# def twoSum(nums, target):
# # your code here
#     for i in nums:
#         if (target - i) in nums:
#             ans =[nums.index(i), nums.index(target-i)]
#             return ans

# result=twoSum([2, 11, 7, 15], 9)
# print(result) # show [0, 2] because nums[0]+nums[2] is 9

# ##################################################
# ##################################################5.
# def maxZeros(nums):
# # 請用你的程式補完這個函式的區塊
#     biggest = 0
#     count = 0
#     for i in nums:
#         if i == 0:
#             count += 1
#             if count > biggest:
#                 biggest = count
#         else:
#             count = 0
#     print(biggest)

# maxZeros([0, 1, 0, 0]) # 得到 2
# maxZeros([1, 0, 0, 0, 0, 1, 0, 1, 0, 0]) # 得到 4
# maxZeros([1, 1, 1, 1, 1]) # 得到 0
# maxZeros([0, 0, 0, 1, 1]) # 得到 3

