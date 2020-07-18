<template>
  <section>
    <header>
      <nav>
        <p class="text-right"><el-button icon="fa fa-plus" size="medium" round type="primary" @click="handleRegister()"> Register</el-button></p>
        <p class="h1-text">Users</p>
      </nav>
    </header>
    <article>
      <el-table empty-text="No data" :data="users" :stripe="true" :border="true" style="width: 100%">
        <el-table-column sortable prop="firstName" label="First Name" width="180"> </el-table-column>
        <el-table-column sortable prop="lastName" label="Last Name" width="180"> </el-table-column>
        <el-table-column sortable prop="email" label="E-mail"> </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button icon="fa fa-search" size="mini" round type="success" @click="handleView(scope.row)"> View</el-button>
            <el-button icon="fa fa-paint-brush" size="mini" round @click="handleEdit(scope.row)"> Edit</el-button>
            <el-button icon="fa fa-trash" size="mini" round type="danger" @click="handleDelete(scope.row)"> Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </article>
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
    handleEdit (user) {
      this.$refs.registerDialog.handleOpen(user)
    },
    handleView (user) {
      this.$refs.registerDialog.handleOpenView(user)
    },
    handleDelete (user) {
      this.$setDialogQuestion({
        title: 'Delete user',
        message: `Are you sure you want to delete the user "${user.firstName} ${user.lastName}" ?`,
        callback: () =>
          this.$remove({
            urlDispatch: 'User/remove',
            messages: `User "${user.firstName} ${user.lastName}" successfully deleted`,
            params: user,
            callback: () => {
              this.$list({
                urlDispatch: 'User/list'
              })
            }
          })
      })
    }
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
