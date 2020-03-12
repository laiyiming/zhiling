<template>
  <div class="header">
    <p class="header__tuichu">
      <img src="@/assets/icon/tuichu.png" />
      <span>
        退出
      </span>
    </p>
    <span>高睿</span>
    <img src="@/assets/images/man.png" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.header {
  height: 66px;
  background: #ffffff;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  font-size: 14px;
  color: #999999;
  border-bottom: 1px solid #f2f2f2;

  > img {
    width: 33px;
    height: 33px;
    margin-right: 8px;
  }

  & .header__tuichu {
    height: 15px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding-left: 25px;
    border-left: 1px solid #e5e5e5;
    margin-right: 36px;

    > img {
      width: 13px;
      height: 14px;
      margin-left: 9px;
    }
  }
}
</style>
