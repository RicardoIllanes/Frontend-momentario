import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/atoms/Button';
import { describe, it, expect, vi } from 'vitest';

describe('Button atom', () => {
  it('renderiza el texto correctamente', () => {
    render(<Button text="Guardar" />);
    expect(screen.getByText('Guardar')).toBeInTheDocument();
  });

  it('ejecuta onClick cuando se hace click', () => {
    const handleClick = vi.fn();
    render(<Button text="Click" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('aplica estado disabled correctamente', () => {
    render(<Button text="No tocar" disabled />);
    const btn = screen.getByText('No tocar');
    expect(btn).toBeDisabled();
  });
});
