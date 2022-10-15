export default defineNuxtPlugin(() => {
  return { provide: { auth: (msg: string) => `Hello ${msg}!` } }
})
