export default function (ctx: any) {
  if (ctx.app.$auth.$state.loggedIn) {
    return ctx.app.$auth.redirect('/user/dashboard')
  }
}
