<template>
  <div id="app">
    <h1>
      <span v-text="title"></span>
      <span v-html="test"></span>
    </h1>
    <input v-model="newItem" @keyup.enter="addNew">
    <ol>
      <li v-for="item in items" :key="item.id" :class="{finished: item.isFinished}" @click="toggleFinish(item)">
        {{item.label}}
      </li>
    </ol>
    <p v-html="intro1"></p>
    <p v-html="intro2"></p>
  </div>
</template>

<script>
import Store from './store'
console.log(Store)
export default {
  data () {
    return {
      title: 'Cris的工作清单',
      test: '<span>todolist</span>',
      items: Store.fetch(),
      newItem: '',
      intro1: '',
      intro2: '',
      num: 0
    }
  },
  watch: {
    items: {
      handler: function (items) {
        Store.save(items)
      },
      deep: true
    }
  },
  methods: {
    toggleFinish: function (item) {
      this.num = 0
      item.isFinished = !item.isFinished
      this.items.map(v => {
        if (v.isFinished) {
          this.num++
        }
      })
      this.intro2 = '总共有' + this.num + '件已完成'
    },
    addNew () {
      this.items.push({
        label: this.newItem,
        isFinished: false
      })
      this.newItem = ''
      this.intro1 = '总共有' + this.items.length + '件待办事项'
    }
  }
}
</script>

<style>
body {
  background: url(./assets/bg.png) no-repeat;
  background-color: #4aa7e8;
  background-size: cover;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
}
input {
  width: 30%;
  min-width: 220px;
  height: 20px;
  padding: 5px;
  line-height: 14px;
  text-indent: 10px;
  border-radius: 8px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.45) inset;
  font-size: 14px;
  outline: none;
}
.finished {
  text-decoration: line-through;
}
ol {
  margin: 20px 40%;
  padding: 0;
  min-width: 80px;
}
p,
li {
  margin: 10px auto;
  font-weight: 600;
  font-size: 18px;
}
</style>
