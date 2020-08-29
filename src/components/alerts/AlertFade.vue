<template>
  <div class="alert-fade">
     <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      :variant="variant"
      @dismiss-count-down="countDownChanged"
    >
    {{ message }}
    </b-alert>
  </div>
</template>
<script>
export default {
  name: 'AlertFade',
  props: {
    variant: {
      required: true,
      type: String
    },
    dismissCountDown: {
      required: true,
      type: Number
    },
    countDownChanged: {
      required: true,
      type: Function
    },
    message: {
      required: true,
      type: String
    }
  }
}
</script>
<style scoped>
  .alert-fade {
    margin: .6rem;
  }
</style>
