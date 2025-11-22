import { render, screen } from '@testing-library/react';
import Image from '../../components/atoms/Image';
import { describe, it, expect } from 'vitest';

describe('Image atom', () => {
  it('renderiza imagen con src y alt', () => {
    render(<Image src="https://example.com/auto.jpg" alt="Auto" />);
    const img = screen.getByAltText('Auto');
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('example.com/auto.jpg');
  });
});
