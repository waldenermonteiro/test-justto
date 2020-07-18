<template>
  <section>
    <header>
      <nav>
        <p class="text-right"><el-button size="medium" round type="primary" @click="handleRegister()">Register</el-button></p>
      </nav>
      <aside>
        <p class="h1-text">Users</p>
      </aside>
    </header>
    <el-table :data="users" :stripe="true" :border="true" style="width: 100%">
      <el-table-column sortable prop="first_name" label="First Name" width="180"> </el-table-column>
      <el-table-column sortable prop="last_name" label="Last Name" width="180"> </el-table-column>
      <el-table-column sortable prop="email" label="E-mail"> </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" round @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" round type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <register ref="registerDialog"></register>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Register from './Register'
export default {
  components: { Register },
  mounted () {
    this.$list({
      urlDispatch: 'User/list'
    })
  },
  computed: {
    ...mapState('User', ['users'])
  },
  methods: {
    handleRegister () {
      this.$refs.registerDialog.handleOpen()
    },
    handleEdit () {
      this.$refs.registerDialog.handleOpen()
    },
    handleDelete () {}
  }
}
</script>

<style scoped>
.text-right {
  text-align: right;
}
.h1-text {
  font-size: 25px;
}
</style>
