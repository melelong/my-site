const Controller = require("egg").Controller;
const fs = require("fs");
const path = require("path");

class JsonController extends Controller {
  async index() {
    const { ctx } = this;
    const filePath = path.join(
      this.config.baseDir,
      "app/public/json/chinaMap.json"
    );
    const data = fs.readFileSync(filePath);
    const json = JSON.parse(data);
    ctx.body = json;
  }
}

module.exports = JsonController;
