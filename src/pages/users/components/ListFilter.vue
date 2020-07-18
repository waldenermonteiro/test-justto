<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" :offset="3"><label class="el-form-item__label">First Name</label> <el-input maxlength="20" v-model="form.firstName"></el-input></el-col>
      <el-col :span="6"> <label class="el-form-item__label">Last Name</label><el-input maxlength="20" v-model="form.lastName"></el-input></el-col>
      <el-col :span="6"> <label class="el-form-item__label">E-mail</label><el-input maxlength="20" v-model="form.email"></el-input></el-col>
    </el-row>
    <el-row :gutter="20" class="container-mt">
      <el-col :span="3" :offset="9"><el-button class="full-width" type="info" size="mini" round @click="handleReset()">Reset</el-button></el-col>
      <el-col :span="3">
        <el-button class="full-width" icon="fa fa-search" type="primary" size="mini" round @click="handleFilter(form)"> Filter</el-button></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formCopy: {
        firstName: '',
        lastName: '',
        email: ''
      },
      form: { ...this.formCopy }
    }
  },
  methods: {
    handleFilter (form) {
      const user = this.prepareParams(form)
      this.$list({
        urlDispatch: 'User/list',
        params: user
      })
    },
    handleReset () {
      this.form = { ...this.formCopy }
      this.$list({
        urlDispatch: 'User/list'
      })
    },
    prepareParams (form) {
      const user = { ...form }
      Object.getOwnPropertyNames(user).forEach(function (val) {
        if (user[val] === '') delete user[val]
        else {
          user[val] = user[val].toLowerCase()
        }
      })
      return user
    }
  }
}
</script>

<style scoped>
.container-mt {
  margin-top: 10px;
}
.full-width {
  width: 100% !important;
}
</style>
