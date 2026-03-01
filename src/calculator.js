#!/usr/bin/env node

/**
 * Node.js CLI Calculator App
 * Supports the following basic arithmetic operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
 */

const readline = require('readline');

/**
 * Calculator object containing all arithmetic operations
 */
const Calculator = {
  /**
   * Addition operation
   * @param {number} a - First operand
   * @param {number} b - Second operand
   * @returns {number} Result of a + b
   */
  add: (a, b) => a + b,

  /**
   * Subtraction operation
   * @param {number} a - First operand
   * @param {number} b - Second operand
   * @returns {number} Result of a - b
   */
  subtract: (a, b) => a - b,

  /**
   * Multiplication operation
   * @param {number} a - First operand
   * @param {number} b - Second operand
   * @returns {number} Result of a * b
   */
  multiply: (a, b) => a * b,

  /**
   * Division operation
   * @param {number} a - First operand (dividend)
   * @param {number} b - Second operand (divisor)
   * @returns {number} Result of a / b
   * @throws {Error} If attempting to divide by zero
   */
  divide: (a, b) => {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }
};

/**
 * Parse and execute calculation from command line arguments
 * Usage: node calculator.js <number> <operator> <number>
 * Example: node calculator.js 10 + 5
 */
function calculateFromArgs(args) {
  if (args.length < 3) {
    console.error('Usage: calculator <number> <operator> <number>');
    console.error('Operators: +, -, *, /');
    process.exit(1);
  }

  const num1 = parseFloat(args[0]);
  const operator = args[1];
  const num2 = parseFloat(args[2]);

  if (isNaN(num1) || isNaN(num2)) {
    console.error('Error: Both operands must be valid numbers');
    process.exit(1);
  }

  try {
    let result;
    switch (operator) {
      case '+':
        result = Calculator.add(num1, num2);
        break;
      case '-':
        result = Calculator.subtract(num1, num2);
        break;
      case '*':
        result = Calculator.multiply(num1, num2);
        break;
      case '/':
        result = Calculator.divide(num1, num2);
        break;
      default:
        console.error(`Error: Unknown operator '${operator}'`);
        console.error('Supported operators: +, -, *, /');
        process.exit(1);
    }

    console.log(`${num1} ${operator} ${num2} = ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Interactive mode for calculator
 * Allows user to enter calculations one at a time
 */
function interactiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('Node.js CLI Calculator');
  console.log('Supported operations: + (add), - (subtract), * (multiply), / (divide)');
  console.log('Type "exit" to quit\n');

  const promptUser = () => {
    rl.question('Enter calculation (e.g., 10 + 5): ', (input) => {
      if (input.toLowerCase() === 'exit') {
        console.log('Goodbye!');
        rl.close();
        return;
      }

      const parts = input.trim().split(/\s+/);
      if (parts.length !== 3) {
        console.log('Invalid input. Please enter in format: <number> <operator> <number>\n');
        promptUser();
        return;
      }

      const num1 = parseFloat(parts[0]);
      const operator = parts[1];
      const num2 = parseFloat(parts[2]);

      if (isNaN(num1) || isNaN(num2)) {
        console.log('Error: Both operands must be valid numbers\n');
        promptUser();
        return;
      }

      try {
        let result;
        switch (operator) {
          case '+':
            result = Calculator.add(num1, num2);
            break;
          case '-':
            result = Calculator.subtract(num1, num2);
            break;
          case '*':
            result = Calculator.multiply(num1, num2);
            break;
          case '/':
            result = Calculator.divide(num1, num2);
            break;
          default:
            console.log(`Error: Unknown operator '${operator}'. Use +, -, *, or /\n`);
            promptUser();
            return;
        }

        console.log(`Result: ${result}\n`);
      } catch (error) {
        console.log(`Error: ${error.message}\n`);
      }

      promptUser();
    });
  };

  promptUser();
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  // Run in interactive mode if no arguments provided
  interactiveMode();
} else {
  // Run calculation from command line arguments
  calculateFromArgs(args);
}

module.exports = Calculator;
