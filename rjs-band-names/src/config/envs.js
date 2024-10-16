import.meta.env

export const envs = {
    /** @type {string} */
    SOCKET_HOST: import.meta.env.VITE_SOCKET_HOST ?? ''
}