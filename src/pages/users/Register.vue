<template>
  <el-dialog :title="verifyUserTittle(form) + ' User'" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <el-form ref="form" label-width="120px">
      <el-form-item label="First Name">
        <el-input :readonly="inputsReadonly" :class="verifyError($v.form.firstName.$error)" @input="$v.form.firstName.$touch" v-model="form.firstName"></el-input>
        <span v-if="$v.form.firstName.$error" class="el-form-item__error">First name is required</span>
      </el-form-item>
      <el-form-item label="Last Name">
        <el-input :readonly="inputsReadonly" :class="verifyError($v.form.lastName.$error)" @input="$v.form.lastName.$touch" v-model="form.lastName"></el-input>
        <span v-if="$v.form.lastName.$error" class="el-form-item__error">Last name is required</span>
      </el-form-item>
      <el-form-item label="E-mail">
        <el-input :readonly="inputsReadonly" :class="verifyError($v.form.email.$error)" @input="$v.form.email.$touch" v-model="form.email"></el-input>
        <span v-if="$v.form.email.$error" class="el-form-item__error">E-mail is required</span>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="!inputsReadonly" type="info" @click="handleResetForm()">Reset</el-button>
      <el-button @click="handleClose()">Cancel</el-button>
      <el-button v-if="!inputsReadonly" type="primary" @click="handleRegister(form)">Confirm</el-button>
    </span>
  </el-dialog>
</template>
<script>
import RegisterValidator from './mixins/RegisterValidator.mixin'
export default {
  mixins: [RegisterValidator],
  data () {
    return {
      dialogVisible: false,
      inputsReadonly: false
    }
  },
  methods: {
    verifyUserTittle (user) {
      if (this.inputsReadonly) return 'View'
      return user.id ? 'Edit' : 'Register'
    },
    verifyError (error) {
      return error ? 'el-form-item is-error' : ''
    },
    handleOpen (user = this.formCopy) {
      this.dialogVisible = true
      this.form = { ...user }
    },
    handleOpenView (user) {
      this.handleOpen(user)
      this.inputsReadonly = true
    },
    handleResetForm () {
      this.$v.form.$reset()
      this.form = { ...this.formCopy }
    },
    handleClose (done) {
      this.handleResetForm()
      this.dialogVisible = false
      this.inputsReadonly = false
    },
    handleRegister (form) {
      this.verifiyValidations()
      !form.id
        ? this.structureRegister({ form, description: 'registered', urlDispatch: 'create' })
        : this.structureRegister({ form, description: 'edited', urlDispatch: 'update' })
    },
    structureRegister ({ form, description, urlDispatch }) {
      this.$createOrUpdate({
        urlDispatch: `User/${urlDispatch}`,
        messages: `User "${form.firstName} ${form.lastName}" successfully ${description}`,
        params: form,
        callback: () => {
          this.$list({ urlDispatch: 'User/list' })
          this.handleClose()
        }
      })
    }
  }
}
</script>
