import axios from 'axios'

// Frontend-only project: the backend is ALWAYS the remote server.
// The /api/v1 prefix lives ONLY here — callers use bare paths like `/products`.
const baseURL = axios.create({ baseURL: 'https://tandinshop-server-eight.vercel.app/api/v1' })
export default baseURL
