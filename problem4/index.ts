/**
 * Calculates the sum of all integers from 1 to n using an iterative approach.
 * 
 * Time Complexity: O(n) - The loop runs n times, adding each integer to the sum.
 * Space Complexity: O(1) - Only a single variable (`sum`) is used for accumulation.
 * 
 * Pros:
 * - Simple and easy to understand.
 * - Minimal risk of integer overflow.
 * 
 * Cons:
 * - Inefficient for very large values of n due to linear runtime.
 * 
 * Best Use Case: Suitable for small to moderately large values of n.
 */
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Calculates the sum of all integers from 1 to n using a mathematical formula.
 * 
 * Time Complexity: O(1) - The calculation is performed in constant time.
 * Space Complexity: O(1) - No additional space usage beyond a few variables.
 * 
 * Pros:
 * - Extremely efficient with constant time complexity.
 * - Suitable for very large values of n.
 * 
 * Cons:
 * - Potential risk of integer overflow for extremely large values of n.
 * 
 * Best Use Case: Ideal for scenarios with large values of n.
 */
function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2;
}

/**
 * Calculates the sum of all integers from 1 to n using a recursive approach.
 * 
 * Time Complexity: O(n) - The function makes n recursive calls, each reducing n by 1.
 * Space Complexity: O(n) - Each recursive call adds a new frame to the call stack.
 * 
 * Pros:
 * - Elegant and mathematically intuitive implementation.
 * - Simple representation of the summation logic.
 * 
 * Cons:
 * - Stack Overflow Risk: For large values of n, the recursion depth may exceed the call stack limit.
 * - Less efficient than the mathematical formula approach due to recursive overhead.
 * - Slower than iterative approaches due to function call overhead.
 * 
 * Best Use Case: Suitable for small values of n, where recursion depth will not cause a stack overflow.
 */
function sum_to_n_c(n: number): number {
    if (n <= 0) return 0;
    return n + sum_to_n_c(n - 1);
}

function test_sum_to_n(sumFunction: (n: number) => number, functionName: string) {
    type TestCase = {
        input: number;
        expected: number;
    };

    const testCases: TestCase[] = [
        { input: 0, expected: 0 }, // Edge Case: Zero input
        { input: 1, expected: 1 }, // Edge Case: Single value
        { input: 2, expected: 3 }, // Small value
        { input: 10, expected: 55 }, // Typical value
        { input: 100, expected: 5050 }, // Larger value
        { input: 1000, expected: 500500 }, // Very large value
        { input: 1000000, expected: (1000000 * (1000000 + 1)) / 2 }, // Extremely large valid input
        { input: -1, expected: 0 }, // Edge Case: Negative input (assume 0)
    ];

    console.log(`Running Tests for ${functionName}...`);
    console.log("============================================");

    testCases.forEach(({ input, expected }, index) => {
        try {
            const result = sumFunction(input);
            const pass = result === expected;

            console.log(`Test Case ${index + 1}: Input = ${input}`);
            console.log(`  - ${functionName}: ${pass ? '✅ PASS' : '❌ FAIL'} (Result: ${result}, Expected: ${expected})`);
        } catch (error) {
            console.error(`Test Case ${index + 1}: Input = ${input}`);
            console.error(`  - Error: ${error}`);
        }
    });

    console.log("============================================");
    console.log(`Test suite completed for ${functionName}.`);
}

// Run tests independently
console.log("\nTesting sum_to_n_a:");
test_sum_to_n(sum_to_n_a, "sum_to_n_a");

console.log("\nTesting sum_to_n_b:");
test_sum_to_n(sum_to_n_b, "sum_to_n_b");

console.log("\nTesting sum_to_n_c:");
test_sum_to_n(sum_to_n_c, "sum_to_n_c");