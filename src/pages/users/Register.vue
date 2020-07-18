<template>
  <el-dialog title="Register User" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <el-form ref="form" label-width="120px">
      <el-form-item label="First Name">
        <el-input :class="verifyError($v.form.firstName.$error)" @input="$v.form.firstName.$touch" v-model="form.firstName"></el-input>
        <span v-if="$v.form.firstName.$error" class="el-form-item__error">First name is required</span>
      </el-form-item>
      <el-form-item label="Last Name">
        <el-input :class="verifyError($v.form.lastName.$error)" @input="$v.form.lastName.$touch" v-model="form.lastName"></el-input>
        <span v-if="$v.form.lastName.$error" class="el-form-item__error">Last name is required</span>
      </el-form-item>
      <el-form-item label="E-mail">
        <el-input :class="verifyError($v.form.email.$error)" @input="$v.form.email.$touch" v-model="form.email"></el-input>
        <span v-if="$v.form.email.$error" class="el-form-item__error">E-mail is required</span>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="info" @click="handleResetForm()">Reset</el-button>
      <el-button @click="handleClose()">Cancel</el-button>
      <el-button type="primary" @click="handleRegister()">Confirm</el-button>
    </span>
  </el-dialog>
</template>
<script>
import RegisterValidator from './mixins/RegisterValidator.mixin'
export default {
  mixins: [RegisterValidator],
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    verifyError (error) {
      return error ? 'el-form-item is-error' : ''
    },
    handleOpen () {
      this.dialogVisible = true
    },
    handleResetForm () {
      this.$v.form.$reset()
      this.form = { ...this.formCopy }
    },
    handleClose (done) {
      this.dialogVisible = false
    },
    handleRegister () {
      this.verifiyValidations()
    }
  }
}
</script>
