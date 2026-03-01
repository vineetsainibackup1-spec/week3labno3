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
