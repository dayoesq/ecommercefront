<template>
  <div class="login">
    <alert-fade
    :message="successMessage"
    :variant="success"
    :dismissCountDown="dismissCountDown"
    :countDownChanged="countDownChanged"
    />
    <div class="image-wrapper">
      <img src="@/assets/logo.png" alt="Image"/>
    </div>
    <form class="login-form" @submit.prevent="loginUser">
      <div class="form-group" :class="{invalid: $v.email.$error}">
        <label for="email"></label>
        <input class="input" type="text" name="email" id="email" placeholder="Email"
        @blur="$v.email.$touch()" v-model.trim="email">
        <p v-if="!$v.email.email">A valid email is required</p>
      </div>
      <div class="form-group" :class="{invalid: $v.password.$error}">
        <label for="password"></label>
        <input class="input" type="password" name="password" id="password" placeholder="Password"
        @blur="$v.password.$touch()" v-model.trim="password">
        <p v-if="!$v.password.minVal">The password is too short</p>
        <p v-if="!$v.password.maxVal">The password is too  long</p>
      </div>
      <div class="form-group">
        <button class="btn-success" type="submit" :disabled="$v.$invalid">Login</button>
      </div>
    </form>
  </div>
</template>
<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import AlertFade from '@/components/alerts/AlertFade'
// import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      successMessage: 'You are successfully logged in',
      dismissCountDown: 0,
      dismissSec: 10,
      success: 'success'
    }
  },
  components: {
    AlertFade
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minVal: minLength(6),
      maxVal: maxLength(30)
    }
  },
  methods: {
    loginUser () {
      this.showSuccAlert()
      setTimeout(() => {
        this.$router.replace({ path: '/', name: 'Home' })
      }, 10000)
    },
    clearFields () {
      this.email = null
      this.password = null
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showSuccAlert () {
      this.dismissCountDown = this.dismissSec
    }
  }
}
</script>
<style lang="scss" scoped>
  .login {
    box-shadow: 0 .1rem 1rem rgba(0, 0, 0, 0.1);
    width: 30rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 3rem;
    background-color: #e1e7e702;
    border-radius: 1rem;
    text-align: center;
    .image-wrapper {
      width: 30rem;
      height: 15rem;
      image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .login-form {
    .form-group {
       padding: .4rem;
       width: 100%;
      .btn-success {
        background-color: #55c57a;
        width: 7rem;
        box-sizing: border-box;
        padding: .4rem;
        border-radius: 1.5rem;
        outline: none;
        border: none;
        &:hover {
          background-color: #4bb66e;
        }
        &:disabled {
          border: .09rem solid #ccc;
          background-color: transparent;
          color: #ccc;
          cursor: not-allowed;
        }
      }
      .input {
        width: 75%;
        padding: .2rem;
        &:focus {
          outline: none;
          border: .09rem solid #521751;
          background-color: #eee;
        }
      }
    }
  }
  .form-group.invalid input {
    border: .09rem solid red;
    background-color: #ffc9aa;
  }
  .form-group.invalid p {
    color: red;
    font-size: .8rem;
  }
</style>
