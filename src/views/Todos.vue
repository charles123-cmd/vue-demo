<template>
  <div class="todos">
    <h2>我的待办</h2>

    <!-- 添加 -->
    <form class="add-form" @submit.prevent="addTodo">
      <el-input v-model="inputText" placeholder="输入待办，回车添加" clearable />
      <el-button type="primary" native-type="submit">添加</el-button>
    </form>

    <!-- 统计 -->
    <div class="stats">
      <el-tag>共 {{ total }} 条</el-tag>
      <el-tag type="success">已完成 {{ doneCount }} 条</el-tag>
      <el-tag type="info" v-if="allDone">全部完成 🎉</el-tag>
    </div>

    <!-- 筛选 -->
    <el-radio-group v-model="filter" class="filter">
      <el-radio-button value="all">全部</el-radio-button>
      <el-radio-button value="active">未完成</el-radio-button>
      <el-radio-button value="done">已完成</el-radio-button>
    </el-radio-group>

    <!-- 列表 -->
    <ul class="list">
      <li
        v-for="item in filteredList"
        :key="item.id"
        class="item"
        :class="{ done: item.done }"
      >
        <span class="text" @click="toggle(item.id)">{{ item.text }}</span>
        <el-button size="small" type="danger" link @click="remove(item.id)">删除</el-button>
      </li>
    </ul>

    <el-empty v-if="filteredList.length === 0" description="没有待办" />

    <el-button
      v-if="list.length > 0"
      type="danger"
      plain
      class="clear-btn"
      @click="dialogVisible = true"
    >
      清空全部
    </el-button>

    <el-dialog v-model="dialogVisible" title="确认清空？" width="300px">
      <p>清空后无法恢复，确定吗？</p>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="danger" @click="clearAll">确定清空</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'

// ===== 数据（从 localStorage 读） =====
const stored = localStorage.getItem('vue-todos')
const list = ref(stored ? JSON.parse(stored) : [
  { id: 1, text: '学 HTML', done: true },
  { id: 2, text: '学 CSS', done: false },
  { id: 3, text: '学 Vue', done: false }
])

const inputText = ref('')
const filter = ref('all')
const dialogVisible = ref(false)

// ===== 计算属性 =====
const total = computed(() => list.value.length)
const doneCount = computed(() => list.value.filter(i => i.done).length)
const allDone = computed(() => total.value > 0 && doneCount.value === total.value)

const filteredList = computed(() => {
  if (filter.value === 'active') return list.value.filter(i => !i.done)
  if (filter.value === 'done') return list.value.filter(i => i.done)
  return list.value
})

// ===== 方法 =====
function addTodo() {
  const text = inputText.value.trim()
  if (!text) return
  list.value.push({ id: Date.now(), text, done: false })
  inputText.value = ''
  ElMessage.success('添加成功')
}

function toggle(id) {
  const item = list.value.find(i => i.id === id)
  if (item) item.done = !item.done
}

function remove(id) {
  list.value = list.value.filter(i => i.id !== id)
  ElMessage.info('已删除')
}

function clearAll() {
  list.value = []
  dialogVisible.value = false
  ElMessage.success('已清空')
}

// ===== 本地保存（watch 监听 list 变化） =====
watch(list, (newVal) => {
  localStorage.setItem('vue-todos', JSON.stringify(newVal))
}, { deep: true })
</script>

<style scoped>
.todos { max-width: 600px; margin: 20px auto; padding: 0 16px; }
.add-form { display: flex; gap: 8px; margin-bottom: 16px; }
.stats { display: flex; gap: 8px; margin-bottom: 12px; }
.filter { margin-bottom: 16px; }
.list { list-style: none; padding: 0; }
.item { display: flex; justify-content: space-between; align-items: center; padding: 10px 8px; border-bottom: 1px solid #eee; }
.item .text { flex: 1; cursor: pointer; user-select: none; }
.item.done .text { text-decoration: line-through; color: #999; }
.clear-btn { width: 100%; margin-top: 16px; }
</style>