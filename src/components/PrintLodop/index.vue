<template>
  <div>
    选择打印机：
    <select
      ref="printerContainer"
      style="margin-right:10px; cursor: pointer; "
      @change="selectPrinter"
      @click="getPrinter"
    />
    <el-tooltip placement="bottomLeft" title="请确保打印机支持双面打印！！！">
      <el-checkbox @change="onDoublePrint">双面</el-checkbox>
    </el-tooltip>
    <!-- <a-checkbox v-if="printMode == 'jiti'" @change="onPrintAll">全部</a-checkbox> -->
    <slot />
    <!-- 导入导出 -->
    <el-button style="margin-right:10px; " type="primary" size="small" @click="onBeforePrint">预览</el-button>
    <el-button type="primary" size="small" @click="doPrint">打印</el-button>
  </div>
</template>
<script>
import getLodop from './lodop'

export default {
  name: 'VueClodop',
  props: {
    printHtmls: {
      type: Array,
      default: () => [
        'This is Vue-CLODOP component, a web printer component which is based on CLODOP, so before you begin to use this component, you must make sure that the CLODOP is installed on you computer.'
      ]
    },
    printType: {
      type: String,
      default: 'HTML'
    }
  },
  data() {
    return {
      LODOP: null,
      printDouble: false,
      printPreview: false,
      printerIndex: -1
    }
  },
  watch: {
    LODOP(newVal) {
      if (newVal) {
        this.LODOP.Create_Printer_List(this.$refs.printerContainer)
        this.$message.info('打印机准备就绪！')
      }
    }
  },
  created() {
    this.LODOP = getLodop()
  },
  methods: {
    onDoublePrint(e) {
      this.printDouble = e.target.checked
    },
    getPrinter() {
      if (!this.LODOP) {
        this.LODOP = getLodop()
      }
    },
    // 选择打印机
    selectPrinter(e) {
      // console.log(e)
      this.printerIndex = e.target.value
    },
    _print(htmls) {
      var LODOP = this.LODOP
      if (LODOP) {
        LODOP.PRINT_INIT('') // 初始化
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A4') // 设置横向

        // 分类设置打印内容
        if (this.printType === 'TABLE') {
          var strBodyStyle = '<style>'
          strBodyStyle += 'body{ text-align:center; }'
          strBodyStyle +=
            'table{ border-collapse:collapse;min-width:600px; max-width: 100%;  margin: 0 auto;}   table , td, th {text-align: center;  border:1px solid black; font-size:12px;} '
          strBodyStyle +=
            'caption {  caption-side: top;  text-align: center;  font-size: 16px;  font-weight: bold;} '
          strBodyStyle += '</style>' // 设置打印样式

          for (let i = 0; i < htmls.length; i++) {
            const strFormHtml =
              strBodyStyle + '<body><br/><br/><br/>' + htmls[i] + '</body>' // 获取打印内容
            LODOP.ADD_PRINT_TABLE(
              '1cm',
              '1cm',
              'RightMargin:1cm',
              'BottomMargin:1.5cm',
              strFormHtml
            ) // 设置打印内容
            LODOP.NewPageA()
          }
        } else {
          for (let i = 0; i < htmls.length; i++) {
            LODOP.ADD_PRINT_HTML(
              '1cm',
              '1cm',
              'RightMargin:1cm',
              'BottomMargin:1.5cm',
              htmls[i]
            ) // 设置打印内容
            LODOP.NewPageA()
          }
        }

        LODOP.SET_PRINTER_INDEXA(this.printerIndex) // 这里指定打印机打印

        // 双面打印
        if (this.printDouble) {
          LODOP.SET_PRINT_MODE('PRINT_DUPLEX', 2)
        }

        if (this.printPreview) {
          LODOP.SET_PREVIEW_WINDOW(2, 0, 0, 800, 600, '') // 设置预览窗口模式和大小
          LODOP.SET_PRINT_MODE('AUTO_CLOSE_PREWINDOW', 1) // 打印后自动关闭预览窗口
          LODOP.PREVIEW()
        } else {
          LODOP.PRINT()
        }
      } else {
        this.$message.warning('打印机准备中...')
      }
    },
    onBeforePrint() {
      this.printPreview = true
      this._print(this.printHtmls)
    },
    doPrint() {
      this._print(this.printHtmls)
    }
  }
}
</script>
