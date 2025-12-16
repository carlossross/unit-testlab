import { createCounter } from './counter.state';

describe('createCounter', () => {
  it('inicia en 0', () => {
    // Arrange
    const counter = createCounter();

    // Act
    const value = counter.count();

    // Assert
    expect(value).toBe(0);
  });
  it('incrementa el contador', () => {
    // Arrange
    const counter = createCounter();

    // Act
    counter.increment();

    // Assert
    expect(counter.count()).toBe(1);
  });
  it('indica si el contador es par', () => {
    // Arrange
    const counter = createCounter();

    // Assert (estado inicial)
    expect(counter.isEven()).toBe(true);

    // Act
    counter.increment();

    // Assert (después de cambiar dependencia)
    expect(counter.isEven()).toBe(false);
  });
});
