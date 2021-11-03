<template>
  <div class="form-body">
    <div class="form-wrapper">
      <div class="form-content">
        <a-form layout="horizontal" :form="form" @submit="handleSubmit">
          <a-form-item
            :validate-status="userNameError() ? 'error' : ''"
            :help="userNameError() || ''"
          >
            <a-input
              v-decorator="[
                'username',
                {
                  rules: [
                    { required: true, message: 'Please input your username!' },
                  ],
                },
              ]"
              placeholder="Username"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
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
                    { validator: handlePass },
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
          <a-form-item
            :validate-status="passwordErrorConfirmed() ? 'error' : ''"
            :help="passwordErrorConfirmed() || ''"
          >
            <a-input
              v-decorator="[
                'password_confirmed',
                {
                  rules: [
                    { required: true, message: 'Password not confirmed!' },
                    { validator: handleConfirmedPass },
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
              Registration
            </a-button>
          </a-form-item>
          <div class="form-link">
            <router-link to="/login">I have an account!</router-link>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "Vuex";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
export default {
  name: "register",
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: "register" }),
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    ...mapActions(["fetchUserRegister"]),
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("username") && getFieldError("username");
    },
    emailError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("email") && getFieldError("email");
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    passwordErrorConfirmed() {
      const { getFieldError, isFieldTouched } = this.form;
      return (
        isFieldTouched("password_confirmed") &&
        getFieldError("password_confirmed")
      );
    },
    validEmail(rule, value, callback) {
      this.email = value;
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.email) && this.email) callback("Incorrect email!");
      callback();
    },
    handlePass(rule, value, callback) {
      this.password = value;
      callback();
    },
    handleConfirmedPass(rule, value, callback) {
      this.password_confirmed = value;
      if (this.password !== this.password_confirmed) {
        callback("Password not confirmed!");
      }
      callback();
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const data = {
            username: values.username,
            email: values.email,
            password: values.password,
          };

          this.fetchUserRegister(data)
            .then((res) => {
              // console.log(res);
              this.$router.push('/login');
            })
            .catch((err) => {});
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