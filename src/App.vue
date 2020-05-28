<template>
  <div id="app">
    <a-input placeholder="请输入任务" @change="recivedValue" :value="inputValue" class="my_ipt" />
    <a-button type="primary" @click="addSomeThing">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="cbStatus($event,item.id)">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{undoneStatus}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="rowkey==='all'?'primary':'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="rowkey==='undone'?'primary':'default'" @click="changeList('undone')">未完成</a-button>
          <a-button  :type="rowkey==='done'?'primary':'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="removeDate">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['undoneStatus', 'infoList']),
    ...mapState(['list', 'inputValue', 'rowkey'])

  },
  created () {
    this.getList()
  },
  methods: {
    ...mapMutations(['addItem', 'setInputValue', 'deleteDate', 'changeStatus', 'unchanged', 'handleChange']),
    ...mapActions(['getList']),
    recivedValue (e) {
      this.setInputValue(e.target.value)
    },
    addSomeThing () {
      if (this.inputValue.trim().length <= 0) {
        return
      }
      this.addItem()
    },
    removeItem (id) {
      this.deleteDate()
    },
    cbStatus (e, id) {
      const params = {
        id: id,
        status: e.target.checked
      }
      this.changeStatus(params)
    },
    removeDate () {
      this.unchanged()
    },
    changeList (key) {
      this.handleChange(key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
