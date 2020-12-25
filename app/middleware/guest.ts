export default function (ctx: any) {
  console.log(ctx.app.$auth.$state)
  if (ctx.app.$auth.$state.loggedIn) {
    return ctx.app.$auth.redirect('/user/dashboard')
  }
}
