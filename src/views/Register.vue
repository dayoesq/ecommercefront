<template>
  <div class="register">
    <alert-fade
    :message="successMessage"
    :variant="success"
    :dismissCountDown="dismissCountDown"
    :countDownChanged="countDownChanged"
    />
    <h4>Register</h4>
    <form class="form" id="form" @submit.prevent="registerUser">
      <div class="email-password">
        <div class="group-1 group" :class="{invalid: $v.email.$error}">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Email" name="email" v-model.trim="email" @blur="$v.email.$touch()">
        <p v-if="!$v.email.email">A valid email is required</p>
      </div>
        <div class="group-1 group" :class="{invalid: $v.password.$error}">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Password" name="password" v-model.trim="password" @blur="$v.password.$touch()">
          <p v-if="!$v.password.minVal">The password is too short</p>
          <p v-if="!$v.password.maxVal">The password is too  long</p>
        </div>
      </div>
      <div class="form-wrapper">
        <div class="group-2 m-a group" :class="{invalid: $v.firstname.$error}">
          <label for="firstname">Firstname</label>
          <input type="text" id="firstname" placeholder="Firstname" name="firstname" v-model.trim="firstname" @blur="$v.firstname.$touch()">
          <p v-if="!$v.firstname.minVal">The firstname is too short</p>
          <p v-if="!$v.firstname.maxVal">The firstname is too long</p>
          <p v-if="!$v.firstname.fname">Invalid format</p>
        </div>
        <div class="group-2 group" :class="{invalid: $v.lastname.$error}">
          <label for="lastname">Lastname</label>
          <input type="text" id="lastname" placeholder="Lastname" name="lastname" v-model.trim="lastname" @blur="$v.lastname.$touch()">
          <p v-if="!$v.lastname.minVal">The lastname is too short</p>
          <p v-if="!$v.lastname.maxVal">The lastname is too long</p>
          <p v-if="!$v.lastname.lname">Invalid format</p>
        </div>
      </div>
      <div class="group-1 group" :class="{invalid: $v.phone.$error}">
          <label for="phone">Phone</label>
          <input type="phone" id="phone" placeholder="e.g 044356987" name="phone" v-model.trim="phone" @blur="$v.phone.$touch()">
          <p v-if="!$v.phone.minVal">The length is too short</p>
          <p v-if="!$v.phone.maxVal">The length is too long</p>
          <p v-if="!$v.phone.numbersAndPlus">Invalid phone format</p>
        </div>
      <div class="form-group" :class="{invalid: $v.terms.$invalid}">
        <label for="terms">I accept the terms and condition</label>
        <input type="checkbox" id="terms" v-model="terms" @change="$v.terms.$touch()">
      </div>
      <div class="form-group button-group">
        <button type="submit" class="btn-primary" :disabled="$v.$invalid">Submit</button>
        <router-link :to="{name: 'Home', path: '/'}">
          <button type="button" class="btn-danger">Cancel</button>
        </router-link>
      </div>
    </form>
  </div>
</template>
<script>
import { required, minLength, maxLength, email, helpers } from 'vuelidate/lib/validators'
import AlertFade from '@/components/alerts/AlertFade'
import axios from 'axios'
export default {
  name: 'Register',
  data () {
    return {
      email: null,
      password: null,
      firstname: null,
      lastname: null,
      phone: null,
      terms: false,
      successMessage: 'Registration successful',
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
    },
    firstname: {
      required,
      minVal: minLength(2),
      maxVal: maxLength(30),
      fname: helpers.regex('val', /^(([a-zA-Z]+)|(([a-zA-Z]+)(-{1})([a-zA-Z]+)))$/)
    },
    lastname: {
      required,
      minVal: minLength(2),
      maxVal: maxLength(30),
      lname: helpers.regex('val', /^(([a-zA-Z]+)|(([a-zA-Z]+)(-{1})([a-zA-Z]+)))$/)
    },
    phone: {
      required,
      minVal: minLength(3),
      maxVal: maxLength(14),
      numbersAndPlus: helpers.regex('val', /^((\+[1-9]+)$|([0-9]+)$)/)
    },
    terms: {
      required,
      mustBeChecked: value => {
        return value === true
      }
    }
  },
  methods: {
    registerUser () {
      const params = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        phone: this.phone,
        password: this.password
      }
      axios.post('/views/admin/users/index.php', params)
        .then(res => {
          console.log(res)
        })
      this.clearFields()
      this.showSuccAlert()
      // setTimeout(() => {
      //   this.$router.push({ path: '/login', name: 'Login' })
      // }, 4000)
    },
    clearFields () {
      this.email = null
      this.firstname = null
      this.lastname = null
      this.phone = null
      this.terms = null
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
  .register {
    width: 30rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 .1rem 1rem rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin-top: 3rem;
    margin-bottom: 3rem;
    border-radius: 1rem;
  }
  .email-password {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .group-1 {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    label {
      display: flex;
      align-self: start;
    }
  }
   input:not(input[type='checkbox']) {
      width: 100%;
      padding: .2rem;
      &:focus {
        outline: none;
        border: .09rem solid #521751;
        background-color: #eee;
      }
    }
  input[type='checkbox'] {
    margin-left: .4rem;
  }
  .form-wrapper {
    display: flex;
    .group-2 {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
      label {
        display: flex;
        align-self: start;
      }
    }
  }
  .m-a {
    margin-right: auto;
  }
  .btn-primary {
    background-color: #25356a;
    width: 7rem;
    box-sizing: border-box;
    padding: .4rem;
    border-radius: 1.5rem;
    outline: none;
    border: none;
    &:hover {
      background-color: #4a5c8f;
    }
    &:disabled {
      border: .09rem solid #ccc;
      background-color: transparent;
      color: #ccc;
      cursor: not-allowed;
    }
  }
  .button-group {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .group.invalid input {
    border: .09rem solid red;
    background-color: #ffc9aa;
  }
  p {
    color: red;
    font-size: .8rem;
  }
  .btn-danger {
    margin-left: 2rem;
    background-color: #ed89a2;
    width: 7rem;
    box-sizing: border-box;
    padding: .4rem;
    border-radius: 1.5rem;
    outline: none;
    border: none;
     &:hover {
      background-color: #c1829c;
    }
  }
</style>
