/**
 * Comprehensive Unit Tests for Calculator
 * Tests all basic arithmetic operations: addition, subtraction, multiplication, division
 * Includes edge cases and error handling
 */

const Calculator = require('../calculator');

describe('Calculator - Basic Arithmetic Operations', () => {
  
  // ========== ADDITION TESTS ==========
  describe('Addition (+)', () => {
    test('should add two positive numbers', () => {
      expect(Calculator.add(2, 3)).toBe(5);
    });

    test('should add two negative numbers', () => {
      expect(Calculator.add(-5, -3)).toBe(-8);
    });

    test('should add positive and negative numbers', () => {
      expect(Calculator.add(10, -4)).toBe(6);
    });

    test('should add zero to a number', () => {
      expect(Calculator.add(7, 0)).toBe(7);
      expect(Calculator.add(0, 7)).toBe(7);
    });

    test('should add decimals', () => {
      expect(Calculator.add(3.5, 2.5)).toBe(6);
    });

    test('should add large numbers', () => {
      expect(Calculator.add(1000000, 2000000)).toBe(3000000);
    });
  });

  // ========== SUBTRACTION TESTS ==========
  describe('Subtraction (-)', () => {
    test('should subtract two positive numbers', () => {
      expect(Calculator.subtract(10, 4)).toBe(6);
    });

    test('should subtract resulting in negative', () => {
      expect(Calculator.subtract(5, 10)).toBe(-5);
    });

    test('should subtract two negative numbers', () => {
      expect(Calculator.subtract(-5, -3)).toBe(-2);
    });

    test('should subtract zero', () => {
      expect(Calculator.subtract(10, 0)).toBe(10);
      expect(Calculator.subtract(0, 5)).toBe(-5);
    });

    test('should subtract decimals', () => {
      expect(Calculator.subtract(10.5, 3.5)).toBe(7);
    });

    test('should subtract same number resulting in zero', () => {
      expect(Calculator.subtract(42, 42)).toBe(0);
    });
  });

  // ========== MULTIPLICATION TESTS ==========
  describe('Multiplication (*)', () => {
    test('should multiply two positive numbers', () => {
      expect(Calculator.multiply(45, 2)).toBe(90);
    });

    test('should multiply by zero', () => {
      expect(Calculator.multiply(100, 0)).toBe(0);
      expect(Calculator.multiply(0, 50)).toBe(0);
    });

    test('should multiply by one', () => {
      expect(Calculator.multiply(42, 1)).toBe(42);
    });

    test('should multiply two negative numbers', () => {
      expect(Calculator.multiply(-5, -4)).toBe(20);
    });

    test('should multiply positive and negative numbers', () => {
      expect(Calculator.multiply(6, -3)).toBe(-18);
      expect(Calculator.multiply(-7, 5)).toBe(-35);
    });

    test('should multiply decimals', () => {
      expect(Calculator.multiply(2.5, 4)).toBe(10);
    });

    test('should multiply large numbers', () => {
      expect(Calculator.multiply(1000, 2000)).toBe(2000000);
    });
  });

  // ========== DIVISION TESTS ==========
  describe('Division (/)', () => {
    test('should divide two positive numbers', () => {
      expect(Calculator.divide(20, 5)).toBe(4);
    });

    test('should divide resulting in decimal', () => {
      expect(Calculator.divide(7, 2)).toBe(3.5);
    });

    test('should divide one by one', () => {
      expect(Calculator.divide(1, 1)).toBe(1);
    });

    test('should divide zero by a number', () => {
      expect(Calculator.divide(0, 5)).toBe(0);
    });

    test('should divide two negative numbers', () => {
      expect(Calculator.divide(-10, -2)).toBe(5);
    });

    test('should divide positive by negative numbers', () => {
      expect(Calculator.divide(10, -2)).toBe(-5);
      expect(Calculator.divide(-20, 4)).toBe(-5);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => Calculator.divide(10, 0)).toThrow('Cannot divide by zero');
    });

    test('should throw error when dividing negative by zero', () => {
      expect(() => Calculator.divide(-5, 0)).toThrow('Cannot divide by zero');
    });

    test('should throw error when dividing zero by zero', () => {
      expect(() => Calculator.divide(0, 0)).toThrow('Cannot divide by zero');
    });

    test('should divide decimals', () => {
      expect(Calculator.divide(10.5, 2.1)).toBeCloseTo(5);
    });
  });

  // ========== INTEGRATION TESTS ==========
  describe('Integration - Multiple Operations', () => {
    test('should perform addition then subtraction', () => {
      const result1 = Calculator.add(10, 5);
      const result2 = Calculator.subtract(result1, 3);
      expect(result2).toBe(12);
    });

    test('should perform multiplication then division', () => {
      const result1 = Calculator.multiply(4, 5);
      const result2 = Calculator.divide(result1, 2);
      expect(result2).toBe(10);
    });

    test('should handle chain of operations from image example', () => {
      // 2 + 3 = 5
      const add = Calculator.add(2, 3);
      expect(add).toBe(5);
      
      // 10 - 4 = 6
      const sub = Calculator.subtract(10, 4);
      expect(sub).toBe(6);
      
      // 45 * 2 = 90
      const mul = Calculator.multiply(45, 2);
      expect(mul).toBe(90);
      
      // 20 / 5 = 4
      const div = Calculator.divide(20, 5);
      expect(div).toBe(4);
    });
  });

  // ========== EDGE CASES ==========
  describe('Edge Cases', () => {
    test('should handle very small numbers', () => {
      expect(Calculator.add(0.0001, 0.0002)).toBeCloseTo(0.0003);
    });

    test('should handle negative zero', () => {
      expect(Calculator.add(1, -1)).toBe(0);
    });

    test('should maintain precision for basic operations', () => {
      const result = Calculator.add(0.1, 0.2);
      expect(result).toBeCloseTo(0.3);
    });

    test('should handle consecutive operations without errors', () => {
      let result = 100;
      result = Calculator.divide(result, 4);
      result = Calculator.multiply(result, 2);
      result = Calculator.add(result, 5);
      result = Calculator.subtract(result, 8);
      expect(result).toBeCloseTo(47);
    });
  });
});

// ========== ADVANCED OPERATIONS TESTS ==========
describe('Calculator - Advanced Arithmetic Operations', () => {
  
  // ========== MODULO TESTS ==========
  describe('Modulo (%)', () => {
    test('should calculate modulo of two positive numbers', () => {
      expect(Calculator.modulo(5, 2)).toBe(1);
    });

    test('should calculate modulo from image example', () => {
      expect(Calculator.modulo(5, 2)).toBe(1);
    });

    test('should calculate modulo with larger numbers', () => {
      expect(Calculator.modulo(20, 6)).toBe(2);
    });

    test('should calculate modulo resulting in zero', () => {
      expect(Calculator.modulo(10, 5)).toBe(0);
    });

    test('should calculate modulo of number smaller than divisor', () => {
      expect(Calculator.modulo(3, 5)).toBe(3);
    });

    test('should calculate modulo with negative dividend', () => {
      expect(Calculator.modulo(-5, 2)).toBe(-1);
    });

    test('should calculate modulo with negative divisor', () => {
      expect(Calculator.modulo(5, -2)).toBe(1);
    });

    test('should calculate modulo with both negative numbers', () => {
      expect(Calculator.modulo(-5, -2)).toBe(-1);
    });

    test('should throw error when modulo by zero', () => {
      expect(() => Calculator.modulo(10, 0)).toThrow('Cannot perform modulo by zero');
    });

    test('should calculate modulo with decimals', () => {
      expect(Calculator.modulo(5.5, 2.5)).toBeCloseTo(0.5);
    });
  });

  // ========== POWER/EXPONENTIATION TESTS ==========
  describe('Power (^)', () => {
    test('should calculate power from image example', () => {
      expect(Calculator.power(2, 3)).toBe(8);
    });

    test('should calculate simple power', () => {
      expect(Calculator.power(3, 4)).toBe(81);
    });

    test('should calculate power of two', () => {
      expect(Calculator.power(2, 8)).toBe(256);
    });

    test('should raise to power of zero', () => {
      expect(Calculator.power(5, 0)).toBe(1);
    });

    test('should raise to power of one', () => {
      expect(Calculator.power(7, 1)).toBe(7);
    });

    test('should calculate zero to any power', () => {
      expect(Calculator.power(0, 5)).toBe(0);
    });

    test('should calculate one to any power', () => {
      expect(Calculator.power(1, 100)).toBe(1);
    });

    test('should calculate negative number to even power', () => {
      expect(Calculator.power(-2, 4)).toBe(16);
    });

    test('should calculate negative number to odd power', () => {
      expect(Calculator.power(-2, 3)).toBe(-8);
    });

    test('should calculate power with decimal base', () => {
      expect(Calculator.power(2.5, 2)).toBeCloseTo(6.25);
    });

    test('should calculate power with decimal exponent', () => {
      expect(Calculator.power(4, 0.5)).toBe(2);
    });

    test('should calculate large powers', () => {
      expect(Calculator.power(10, 3)).toBe(1000);
    });
  });

  // ========== SQUARE ROOT TESTS ==========
  describe('Square Root (√)', () => {
    test('should calculate square root from image example', () => {
      expect(Calculator.squareRoot(16)).toBe(4);
    });

    test('should calculate perfect square root', () => {
      expect(Calculator.squareRoot(25)).toBe(5);
    });

    test('should calculate square root of one', () => {
      expect(Calculator.squareRoot(1)).toBe(1);
    });

    test('should calculate square root of zero', () => {
      expect(Calculator.squareRoot(0)).toBe(0);
    });

    test('should calculate square root of decimal', () => {
      expect(Calculator.squareRoot(2.25)).toBe(1.5);
    });

    test('should calculate square root of non-perfect square', () => {
      expect(Calculator.squareRoot(2)).toBeCloseTo(1.414, 3);
    });

    test('should calculate square root of large number', () => {
      expect(Calculator.squareRoot(10000)).toBe(100);
    });

    test('should throw error when square root of negative number', () => {
      expect(() => Calculator.squareRoot(-4)).toThrow('Cannot calculate square root of negative number');
    });

    test('should throw error when square root of -1', () => {
      expect(() => Calculator.squareRoot(-1)).toThrow('Cannot calculate square root of negative number');
    });

    test('should throw error when square root of large negative number', () => {
      expect(() => Calculator.squareRoot(-100)).toThrow('Cannot calculate square root of negative number');
    });
  });

  // ========== ADVANCED INTEGRATION TESTS ==========
  describe('Integration - Advanced Operations', () => {
    test('should perform modulo then add result', () => {
      const mod = Calculator.modulo(20, 6);
      const add = Calculator.add(mod, 10);
      expect(add).toBe(12);
    });

    test('should perform power then divide', () => {
      const pow = Calculator.power(2, 8);
      const div = Calculator.divide(pow, 4);
      expect(div).toBe(64);
    });

    test('should perform square root then multiply', () => {
      const sqrt = Calculator.squareRoot(16);
      const mul = Calculator.multiply(sqrt, 5);
      expect(mul).toBe(20);
    });

    test('should handle all operations from extended example', () => {
      // 5 % 2 = 1
      const mod = Calculator.modulo(5, 2);
      expect(mod).toBe(1);
      
      // 2 ^ 3 = 8
      const pow = Calculator.power(2, 3);
      expect(pow).toBe(8);
      
      // √16 = 4
      const sqrt = Calculator.squareRoot(16);
      expect(sqrt).toBe(4);
    });

    test('should chain multiple advanced operations', () => {
      let result = 100;
      result = Calculator.squareRoot(result);  // √100 = 10
      result = Calculator.power(result, 2);    // 10^2 = 100
      result = Calculator.modulo(result, 30);  // 100 % 30 = 10
      expect(result).toBe(10);
    });
  });

  // ========== ADVANCED EDGE CASES ==========
  describe('Edge Cases - Advanced Operations', () => {
    test('should handle modulo with very small numbers', () => {
      const result = Calculator.modulo(0.5, 0.3);
      expect(result).toBeCloseTo(0.2);
    });

    test('should handle power resulting in very large number', () => {
      const result = Calculator.power(10, 10);
      expect(result).toBe(10000000000);
    });

    test('should handle power with negative exponent', () => {
      expect(Calculator.power(2, -2)).toBe(0.25);
    });

    test('should handle square root of very small positive number', () => {
      const result = Calculator.squareRoot(0.01);
      expect(result).toBe(0.1);
    });

    test('should maintain precision across advanced operations', () => {
      const sqrt = Calculator.squareRoot(2);
      const pow = Calculator.power(sqrt, 2);
      expect(pow).toBeCloseTo(2);
    });

    test('should handle modulo of decimal by decimal', () => {
      const result = Calculator.modulo(7.5, 2.5);
      expect(result).toBeCloseTo(0);
    });
  });
});
