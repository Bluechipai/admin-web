<template>
  <div class="bottom-info">
    <div>
      <span>Powered by</span>
      <span>
        <a href="https://github.com/flipped-aurora/gin-vue-admin">{{ $GIN_VUE_ADMIN.appName }}</a>
      </span>
      <el-divider direction="vertical" />
      <span>Copyright</span>
      <span>
        <a href="https://github.com/flipped-aurora">flipped-aurora tuán duì</a>
      </span>
    </div>
  </div>
</template>

<script>
//  cǐ wén jiàn nèi róng wèi bǎn quán xìn xī， rú xū gǎi dòng， qǐng lián xìwx:shouzi_1994 gòu mǎi shòu quán  wèi shòu quán zhuàng tài zhǐ xū bǎo liú cǐ dài mǎ  bù yǐng xiǎng rèn hé zhèng cháng shǐ yòng
//  xiàng mù wèiapatch xié yì  qǐng zūn shǒu bǎn quán xié yì nèi róng
export default {
  name: 'BottomInfo'
}
</script>

<style lang="scss">
.bottom-info {
  color: #888;
  height: 30px;
  line-height: 12px;
  a {
    color: #888;
  }
  div {
    display: flex;
    justify-content: center;
    span{
      margin: 0 3px;
    }
  }
}
</style>
