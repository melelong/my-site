<template>
  <div class="app-container" v-loading="isLoading">
    <!-- 数据表格 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="标题" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column label="中图预览" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="单击预览"
            :hide-after="2000"
            placement="top"
          >
            <el-image
              style="width: 100px"
              :src="scope.row.midImg"
              fit="fill"
              :preview-src-list="[scope.row.midImg]"
            ></el-image>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="大图预览" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="单击预览"
            :hide-after="2000"
            placement="top"
          >
            <el-image
              style="width: 100px"
              :src="scope.row.bigImg"
              fit="fill"
              :preview-src-list="[scope.row.bigImg]"
            ></el-image>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            :hide-after="2000"
            placement="top"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editBanner(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑首页标语 -->
    <el-dialog
      title="请编辑信息"
      :visible.sync="dialogFormVisible"
      center
      top="5vh"
    >
      <el-form :model="form">
        <!-- 标题 -->
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <!-- 描述 -->
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-row>
          <!-- 中图 -->
          <el-col :span="12">
            <el-form-item label="首页中图">
              <Upload v-model="form.midImg" />
            </el-form-item>
          </el-col>

          <!-- 大图 -->
          <el-col :span="12">
            <el-form-item label="首页大图">
              <Upload v-model="form.bigImg" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { service_URL } from "@/urlConfig.js";
import { getBanner, setBanner } from "@/api/banner";
// 引入封装好的上传图片组件
import Upload from "@/components/Upload";

export default {
  name: "home",
  components: { Upload },
  data() {
    return {
      data: [], // 存储数据
      dialogFormVisible: false, // 编辑对话框是否显示
      form: {
        id: "",
        title: "",
        description: "",
        midImg: "",
        bigImg: "",
      },
      formLabelWidth: "120px",
      isLoading: true,
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true;
        const res = await getBanner();
        // 保存数据
        this.data = res.data;
        // 处理数据
        // this.data.forEach((item) => {
        //   if (item.midImg) {
        //     const reg = /^\/static/;
        //     item.midImg = reg.test(item.midImg)
        //       ? service_URL + item.midImg
        //       : item.midImg;
        //   }
        //   if (item.bigImg) {
        //     const reg = /^\/static/;
        //     item.bigImg = reg.test(item.bigImg)
        //       ? service_URL + item.bigImg
        //       : item.bigImg;
        //   }
        // });
        this.isLoading = false;
      } catch (err) {
        this.$message.error(err);
      }
    },
    async editBannerConfirm() {
      // 表单拿到用户修改的数据，发送给服务器
      let arr = this.data.map((item) => {
        item.id === this.form.id && (item = this.form);
        // item.midImg = item.midImg.startsWith(service_URL)
        //   ? item.midImg.replace(service_URL, "")
        //   : item.midImg;
        // item.bigImg = item.bigImg.startsWith(service_URL)
        //   ? item.bigImg.replace(service_URL, "")
        //   : item.bigImg;
        return item;
      });
      try {
        await setBanner(arr);
        this.$message.success("修改成功");
        this.dialogFormVisible = false;
        await this.fetchData();
      } catch (err) {
        this.$message.error(err);
      }
    },
    editBanner(bannerInfo) {
      // 把bannerInfo的数据给form
      this.form = JSON.parse(JSON.stringify(bannerInfo));
      this.dialogFormVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
