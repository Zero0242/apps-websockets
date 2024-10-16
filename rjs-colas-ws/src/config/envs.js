import.meta.env

export const envs = {
    /** @type {string} */
    SOCKET_HOST: import.meta.env.VITE_SOCKET_HOST ?? '',
    /** @type {string} */
    API_HOST: import.meta.env.VITE_API_HOST ?? ''
}