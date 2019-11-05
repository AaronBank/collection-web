<template>
  <div class="container">
    <div>
      <logo />
      <User />
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'
import User from '@/components/User.vue'

export default {
  components: {
    Logo,
    User
  }
}
</script>
