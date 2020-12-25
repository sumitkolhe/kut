export default function (ctx: any) {
  if (ctx.app.$auth.$state.loggedIn) {
    console.log(ctx.app.$auth.$state.loggedIn)
    return ctx.app.$auth.redirect('/user/dashboard')
  }
}
