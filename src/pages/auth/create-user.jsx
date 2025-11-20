import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Forms from '../../components/templates/Forms';
import { generarMensaje } from '../../utils/GenerarMensaje';
import UserService from '../../services/UserService';

const CreateUser = () => {
    const [form, setForm] = useState({ nombre: "", correo: "", contrasena: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.correo || !form.contrasena) {
            generarMensaje('Completa todos los campos', 'warning');
            return;
        }

        setLoading(true);

        try {
            const usuario = {
                "nombre": form.nombre,
                "correo": form.correo,
                "contrasena": form.contrasena,
                rol: {
                    "id": 3
                }
            }
            const response = await UserService.createUser(usuario);

            generarMensaje('usuario creado!', 'success');

            // Redirigir al dashboard
            /*setTimeout(() => {
                navigate('/dashboard');
            }, 800);*/

        } catch (error) {
            // ERRORES
            const msg = error.response?.data?.message || 'Error al crear usuario';
            generarMensaje(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    const Login = [
        {
            type: "text",
            text: [
                {
                    content: "Crear usuario",
                    variant: "h1",
                    className: "text-center text-4xl font-bold mb-10 text-zinc-900 dark:text-white tracking-tight",
                }
            ]
        },
        {
            type: "inputs",
            inputs: [
                {
                    type: "text",
                    placeholder: "Nombre usuario",
                    name: "nombre",
                    value: form.nombre,
                    onChange: handleChange,
                    required: true,
                    autoComplete: "off",
                    className: "w-full border-b-2 border-zinc-300 dark:border-zinc-700 bg-transparent text-lg py-2 outline-none focus:border-black dark:focus:border-white transition-colors text-zinc-900 dark:text-white placeholder-zinc-400 mb-4",
                },
                {
                    type: "email",
                    placeholder: "Correo Electrónico",
                    name: "correo",
                    value: form.correo,
                    onChange: handleChange,
                    required: true,
                    autoComplete: "off",
                    className: "w-full border-b-2 border-zinc-300 dark:border-zinc-700 bg-transparent text-lg py-2 outline-none focus:border-black dark:focus:border-white transition-colors text-zinc-900 dark:text-white placeholder-zinc-400 mb-4",
                },
                {
                    type: "password",
                    placeholder: "Contraseña",
                    name: "contrasena",
                    value: form.contrasena,
                    onChange: handleChange,
                    required: true,
                    autoComplete: "current-password",
                    className: "w-full border-b-2 border-zinc-300 dark:border-zinc-700 bg-transparent text-lg py-2 outline-none focus:border-black dark:focus:border-white transition-colors text-zinc-900 dark:text-white placeholder-zinc-400",
                },
            ],
            className: "space-y-8"
        },
        {
            type: "button",
            text: "Crear usuario",
            className: "w-full mt-8 mb-4 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        },
        {
            type: "text",
            text: [
                {
                    content: (
                        <Link
                            to="/login"
                            className="text-zinc-500 hover:text-black dark:hover:text-white underline transition-colors"
                        >
                            Ya tengo un usuario
                        </Link>
                    ),
                    variant: "p",
                    className: "text-center text-sm mt-4",
                },
            ],
        },
    ];
    return (
        <>
            <main className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-4">
                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-10 rounded-2xl bg-white dark:bg-zinc-900 p-10 shadow-xl border border-zinc-200 dark:border-zinc-800">
                    <Forms content={Login} />
                </form>
            </main>
        </>
    );
};

export default CreateUser;   