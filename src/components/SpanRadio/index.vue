<template>
  <div>
    <span class="spanStatus" :style="styleExternal(colorState)">●</span>
    <span>{{ showStr }}</span>
  </div>
</template>

<script>
export default {
  name: 'SpanRadio',
  props: {
    colorState: {
      type: String,
      required: true
    },
    showStr: {
      type: String,
      required: true
    }
  },
  computed: {
  },
  methods: {
    styleExternal(colorState) {
      if (colorState === 'success' || colorState === '0') {
        return 'color:#4BD863'
      } else if (colorState === 'error' || colorState === '1') {
        return 'color:#FF3B31'
      } else if (colorState === 'waiting' || colorState === '2') {
        return 'color:#0079FE'
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .spanStatus {
    font-family:'微软雅黑';
    font-weight:400;
    font-size:14px;
    text-decoration:none;
    margin-right: 5px;
  }
  .spanSpace {
    font-family:'Microsoft Tai Le';
    font-weight:400;font-size:14px;
    text-decoration:none;
    color:rgba(0, 0, 0, 0.427450980392157);
    width: 15px;
  }
</style>
