import { required } from 'vuelidate/lib/validators'
import notifyMessage from '../../../mixins/notify-message.mixin'
export default {
  mixins: [notifyMessage],
  data () {
    return {
      form: {
        ...this.formyCopy
      },
      formCopy: {
        firstName: '',
        lastName: '',
        email: ''
      }
    }
  },
  methods: {
    verifiyValidations () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        throw String('Existing invalid fields')
      }
    }
  },
  validations: {
    form: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required
      }
    }
  }
}
