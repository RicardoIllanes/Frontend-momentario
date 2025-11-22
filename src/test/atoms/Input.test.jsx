import { render, screen } from '@testing-library/react';
import Input from '../../components/atoms/Input';
import { describe, it, expect } from 'vitest';

describe('Input atom', () => {
  it('renderiza un input básico', () => {
    render(<Input placeholder="Buscar" name="buscar" />);
    const input = screen.getByPlaceholderText('Buscar');
    expect(input).toBeInTheDocument();
    expect(input.name).toBe('buscar');
  });

  it('renderiza textarea cuando type=textarea', () => {
    render(<Input type="textarea" placeholder="Descripción" />);
    const textarea = screen.getByPlaceholderText('Descripción');
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
  });
});
