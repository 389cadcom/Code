<template>
  <div class="home">
    <van-swipe :autoplay="3000" indicator-color="white" show-indicators>
      <van-swipe-item v-for="(item, i) in banners" :key="i">
        <van-image :src="$api.path + '16x9' + item.image" fit="fill" />
      </van-swipe-item>
    </van-swipe>

    <div class="">
      <p><span>em</span></p>
    </div>

    <div class="flex home-section">
      <van-cell class="home-item" to="/leader" title-class="home-title" label-class="white" center :border="false">
        <template #title>预约上门</template>
        <template #label>足不出户在线预约</template>
      </van-cell>
      <van-cell class="home-item" data="auto" to="/price" title-class="home-title" label-class="white" center :border="false">
        <template #title>价格公告</template>
        <template #label>每日再生资源价格</template>
      </van-cell>
    </div>
    <van-cell-group class="home-section" :border="false">
      <van-cell icon="/static/images/hot.png" title="新闻资讯" title-class="home-title" center is-link />
      <van-cell v-for="(item, i) in hots" :key="i" :to="'/article-detail?code=wx_yzzx&id=' + item.id">
        <template #title>{{ item.title }}</template>
        <template #label>{{ item.publishTime }}</template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="home-section" :border="false">
      <van-cell icon="/static/images/guide.png" title="回收指南" title-class="home-title" center is-link to="/article-list?code=wx_hszyzn" />

      <van-cell v-for="(item, i) in guides" :key="i" :to="'/article-detail?code=wx_hszyzn&id=' + item.id">
        <template #title>{{ item.title }}</template>
        <template #label>{{ item.publishTime }}</template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
// import {confirm, loading} from '@/utils/decorator'

export default {
  metaInfo: {
    title: "福州市可回收物回收平台",
  },
  name: "Home",
  data() {
    return {
      banners: [],
      hots: [],
      guides: [],
    }
  },
  mixins: [require("../bak"],
  async mounted() {
    $wxsdk.setConfig()
    var result = await this.$api.getBanners({ clientSide: 3 })
    this.banners = result.data

    var [hots, guides] = await Promise.all([
      this.$api.getArticleList({ sysCode: "wx_yzzx", pageSize: 3 }),
      this.$api.getArticleList({ sysCode: "wx_hszyzn", pageSize: 3 }),
    ])
    this.hots = hots.data
    this.guides = guides.data
  },
  methods: {
    // @confirm()
    // @loading()
    delHanlder() {
      console.log("object")
    },
  },
}
</script>
<style lang="scss">
.van-swipe {
  margin-bottom: $gutter;
}
.home-section {
  margin: 0 $gutter $gutter;
  h3 {
    font-weight: normal;
  }
  .van-cell__left-icon {
    font-size: 18px;
  }
}
.home-item {
  background: url("/static/images/home1.png") no-repeat;
  background-size: 100%;
  height: 76px;
  border-radius: 4px;
  &:last-child {
    margin-left: $gutter;
    background-image: url("/static/images/home2.png");
  }
  &.van-cell {
    padding-left: 55px;
    padding-right: 0;
  }
  .home-title {
    color: #fff;
  }
}
.home-title {
  font-size: 17px;
  font-weight: bolder;
  padding: 4px 0;
}
</style>
