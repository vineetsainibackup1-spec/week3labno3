#!/usr/bin/env node

/**
 * Node.js CLI Calculator App
 * Supports the following basic arithmetic operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
 * Supports the following advanced arithmetic operations:
 * - Modulo (%)
 * - Exponentiation (^)
 * - Square Root (sqrt)
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
  },

  /**
   * Modulo operation
   * @param {number} a - Dividend
   * @param {number} b - Divisor
   * @returns {number} Remainder of a / b
   * @throws {Error} If attempting to get modulo by zero
   */
  modulo: (a, b) => {
    if (b === 0) {
      throw new Error('Cannot perform modulo by zero');
    }
    return a % b;
  },

  /**
   * Exponentiation operation
   * @param {number} base - Base number
   * @param {number} exponent - Power/exponent
   * @returns {number} Result of base ^ exponent
   */
  power: (base, exponent) => Math.pow(base, exponent),

  /**
   * Square root operation
   * @param {number} n - Number to take square root of
   * @returns {number} Square root of n
   * @throws {Error} If attempting to take square root of negative number
   */
  squareRoot: (n) => {
    if (n < 0) {
      throw new Error('Cannot calculate square root of negative number');
    }
    return Math.sqrt(n);
  }
};

/**
 * Parse and execute calculation from command line arguments
 * Usage: node calculator.js <number> <operator> <number>
 * For sqrt: node calculator.js sqrt <number>
 * Example: node calculator.js 10 + 5
 */
function calculateFromArgs(args) {
  // Special handling for sqrt which only needs one operand
  if (args.length >= 2 && args[0] === 'sqrt') {
    try {
      const num = parseFloat(args[1]);
      if (isNaN(num)) {
        console.error('Error: Operand must be a valid number');
        process.exit(1);
      }
      const result = Calculator.squareRoot(num);
      console.log(`√${num} = ${result}`);
      return;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }

  if (args.length < 3) {
    console.error('Usage: calculator <number> <operator> <number>');
    console.error('       calculator sqrt <number>');
    console.error('Operators: +, -, *, /, %, ^');
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
      case '%':
        result = Calculator.modulo(num1, num2);
        break;
      case '^':
        result = Calculator.power(num1, num2);
        break;
      case 'sqrt':
        if (args.length !== 2) {
          throw new Error('Square root requires exactly one operand');
        }
        result = Calculator.squareRoot(num1);
        console.log(`√${num1} = ${result}`);
        return;
      default:
        console.error(`Error: Unknown operator '${operator}'`);
        console.error('Supported operators: +, -, *, /, %, ^, sqrt');
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
  console.log('Basic operations: + (add), - (subtract), * (multiply), / (divide)');
  console.log('Advanced operations: % (modulo), ^ (power), sqrt (square root)');
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
          case '%':
            result = Calculator.modulo(num1, num2);
            break;
          case '^':
            result = Calculator.power(num1, num2);
            break;
          case 'sqrt':
            if (parts.length !== 2) {
              console.log('Square root requires exactly one operand. Example: sqrt 16\n');
              promptUser();
              return;
            }
            result = Calculator.squareRoot(num1);
            console.log(`Result: √${num1} = ${result}\n`);
            promptUser();
            return;
          default:
            console.log(`Error: Unknown operator '${operator}'. Use +, -, *, /, %, ^, or sqrt\n`);
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
