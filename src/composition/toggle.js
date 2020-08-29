import { ref } from 'vue'

export const useToggle = () => {
  const show = ref(false)
  const toggle = () => {
    show.value = !show.value
  }
  return { show, toggle }
}