<template>
  <div class="form-body">
    <div class="form-wrapper">
      <div class="form-content">
        <a-form layout="horizontal" :form="form" @submit="handleSubmit">
          <a-form-item
            :validate-status="emailError() ? 'error' : ''"
            :help="emailError() || ''"
          >
            <a-input
              v-decorator="[
                'email',
                {
                  rules: [
                    { required: true, message: 'Please input your email!' },
                    { validator: validEmail },
                  ],
                },
              ]"
              placeholder="Email"
            >
              <a-icon
                slot="prefix"
                type="mail"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item
            :validate-status="passwordError() ? 'error' : ''"
            :help="passwordError() || ''"
          >
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [
                    { required: true, message: 'Please input your Password!' },
                  ],
                },
              ]"
              type="password"
              placeholder="Password"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              class="form-button"
              :disabled="hasErrors(form.getFieldsError())"
            >
              Login
            </a-button>
          </a-form-item>
          <div class="form-link">
            <router-link to="/auth/register">Register now!</router-link>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
export default {
  name: "login",
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: "login" }),
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    emailError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("email") && getFieldError("email");
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    validEmail(rule, value, callback) {
      this.email = value;
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.email) && this.email) callback("Incorrect email!");
      callback();
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const data = {
            email: values.email,
            password: values.password,
          };

          axios
            .post("api/auth/login", data)
            .then((res) => {

              window.localStorage["token"] = res.data.token;
              // window.axios.defaults.headers.common["token"] = res.data.token;

              this.$router.push("/");
            })
            .catch((err) => console.log(err));
        }
      });
    },
  },
};
</script>

<style lang="scss">
.form-body {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .form-wrapper {
    display: flex;
    width: 100%;
  }
  .form-content {
    width: 320px;
    margin: auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
  }
  .form-button {
    width: 100%;
  }
  .form-link {
    width: 100%;
    text-align: center;
  }
}
</style>