import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { AuthProvider, useAuth } from '../../context/AuthContext.jsx';

function TestComponent() {
    const { user, login, logout, loading } = useAuth();

    return (
        <div>
            <span data-testid="loading">{loading ? 'true' : 'false'}</span>
            <span data-testid="user">{user ? user.nombre : 'null'}</span>

            <button
                onClick={() =>
                    login({
                        id: 1,
                        nombre: 'Ricardo',
                        correo: 'ricardo@test.cl',
                        rol: 'Usuario',
                    })
                }
            >
                login
            </button>

            <button onClick={logout}>logout</button>
        </div>
    );
}

describe('AuthContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('empieza con loading=true y luego loading=false', async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(screen.getByTestId('loading').textContent).toBe('false');

        await waitFor(() =>
            expect(screen.getByTestId('loading').textContent).toBe('false')
        );
    });

    it('login guarda el usuario en el contexto y en localStorage', async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.click(screen.getByText('login'));

        await waitFor(() =>
            expect(screen.getByTestId('user').textContent).toBe('Ricardo')
        );

        const stored = JSON.parse(localStorage.getItem('user'));
        expect(stored.nombre).toBe('Ricardo');
    });

    it('logout limpia el usuario del contexto y localStorage', async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.click(screen.getByText('login'));

        await waitFor(() =>
            expect(screen.getByTestId('user').textContent).toBe('Ricardo')
        );

        fireEvent.click(screen.getByText('logout'));

        await waitFor(() =>
            expect(screen.getByTestId('user').textContent).toBe('null')
        );

        expect(localStorage.getItem('user')).toBeNull();
    });
});
