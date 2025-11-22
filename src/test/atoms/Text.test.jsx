import { render, screen } from '@testing-library/react';
import Text from '../../components/atoms/Text';
import { describe, it, expect } from 'vitest';

describe('Text atom', () => {
  it('renderiza un párrafo por defecto', () => {
    render(<Text>Hola mundo</Text>);
    const p = screen.getByText('Hola mundo');
    expect(p.tagName.toLowerCase()).toBe('p');
  });

  it('permite usar un variant como h2', () => {
    render(<Text variant="h2">Título</Text>);
    const h2 = screen.getByText('Título');
    expect(h2.tagName.toLowerCase()).toBe('h2');
  });
});
