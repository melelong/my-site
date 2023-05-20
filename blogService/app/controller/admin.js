const Controller = require("egg").Controller;

class AdminController extends Controller {
  async login() {
    const { ctx } = this;
    const res = await ctx.service.admin.login(ctx.request.body);
    const { id, loginId, name, tongJi, APIKey, refresh_token, SecretKey } =
      await ctx.service.admin.login(ctx.request.body);
    ctx.body = { id, loginId, name, tongJi, APIKey, refresh_token, SecretKey };
  }

  async profile() {
    const { ctx } = this;
    const { loginId, name, tongJi, id } = ctx.user;
    ctx.body = { loginId, name, tongJi, id };
  }

  async update() {
    const { ctx } = this;
    ctx.body = await ctx.service.admin.update(ctx.request.body, ctx.user);
  }
  async updateTongJi() {
    const { ctx } = this;
    ctx.body = await ctx.service.admin.setTongJi(ctx.request.body);
  }
  async index() {
    const { ctx } = this;
    const { APIKey, CODE, SecretKey } = await ctx.service.admin.findTongJi();
    ctx.body = { APIKey, CODE, SecretKey };
  }
}

module.exports = AdminController;
