<template>
  <div class="bg-gray-100">
    <div class="container flex flex-col h-screen mx-auto">
      <div class="flex flex-col items-end px-2 pt-2 bg-gray-100 sm:hidden">
        <Burger v-if="this.$route.path !== '/login' && this.$route.path !== '/register'"></Burger>
      </div>
      <div class="flex flex-1 overflow-y-hidden bg-gray-100">
        <Navigation v-if="this.$route.path !== '/login' && this.$route.path !== '/register'"></Navigation>
        <router-view />
      </div>
      
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import Burger from "@/components/Burger";

export default {
  name: 'App',
  components: {
    Navigation,
    Burger
  }
}
</script>

<style>
</style>
<style src="./assets/tailwind.css"></style>
