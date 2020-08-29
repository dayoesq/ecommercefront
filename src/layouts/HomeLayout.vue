<template>
  <div class="home-layout">
    <section class="navigation">
      <div class="logo-wrapper">
        <img src="@/assets/logo.png" alt="Company Image">
      </div>
      <div class="search-input">
        <input type="text" placeholder="Place your search">
        <button type="button" class="search-btn primary">Search</button>
      </div>
      <div class="cart-validate">
        <router-link :to="{ path: '/login', name: 'Login' }">Login</router-link>
        <router-link :to="{ path: '/register', name: 'Register' }">Register</router-link>
      </div>
    </section>
    <section class="content">
        <slot/>
    </section>
    <section class="footer">
      <div class="list">
       <h2>This is the footer</h2>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'HomeLayout'
}
</script>
<style lang="scss" scoped>
  .navigation {
    display: flex;
    padding: 2rem;
    background-color: rgb(128, 184, 128);
    z-index: 5000;
  }
  .logo-wrapper {
    width: 3rem;
    height: 3rem;
    z-index: 5000;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .cart-validate {
    margin-left: auto;
    router-link:first-child {
      margin-right: .5rem;
    }
  }
  .list {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 20%;
    width: 100%;
    background-color: rgb(22, 77, 22);
    color: #ffffff;
    text-align: center;
  }
  input {
    width: 20rem;
    padding: .2rem;
    margin-left: 2rem;
    box-sizing: border-box;
    // position: relative;
    &:focus {
      border: .02rem solid green;
    }
  }
  .search-btn {
    // position: absolute;
    // left: 36rem;
    background-color: #0e5e19;
    width: 7rem;
    box-sizing: border-box;
    padding: .3rem;
    outline: none;
    border: none;
    color: #ffffff;
  }
  a, a:hover {
    text-decoration: none;
    color: #ffffff;
    margin: .5rem;
  }
</style>
