<template>
  <div class="flex items-center justify-center w-full max-w-2xl min-h-screen px-2 mx-auto overflow-y-auto lg:w-1/2">

    <!-- card -->
    <div class="flex w-full">

      <!-- text -->
      <div class="flex flex-col w-full px-2 pt-4 pb-4 md:px-12">
        <div class="pb-4 text-2xl font-bold text-center">Join Us.</div>
        <!-- form -->
        <form v-on:submit.prevent="handleRegister">
          <div class="flex flex-col w-full pb-4">
            <label for="name" class="block mb-1 text-sm font-bold text-gray-700 uppercase">Name</label>
            <input v-model="form.name" type="text" class="w-full px-3 py-2 mt-1 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" name="text" />
            <div v-if="errors.name" class="text-sm font-semibold text-red-600"> {{errors.name[0]}}</div>
          </div>

          <div class="flex flex-col w-full pb-4">
            <label for="email" class="block mb-1 text-sm font-bold text-gray-700 uppercase">Email</label>
            <input v-model="form.email" type="email" class="w-full px-3 py-2 mt-1 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" name="email" autocomplete="email" />
            <div v-if="errors.email" class="text-sm font-semibold text-red-600"> {{errors.email[0]}}</div>
          </div>
        
          <div class="flex flex-col w-full pb-4">
            <label for="password" class="block mb-1 text-sm font-bold text-gray-700 uppercase">Password</label>
            <input v-model="form.password" type="password" class="w-full px-3 py-2 mt-1 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" name="password" />
            <div v-if="errors.password" class="text-sm font-semibold text-red-600"> {{errors.password[0]}}</div>
          </div>

          <div class="flex flex-col w-full pb-4">
            <label for="password_confirmation" class="block mb-1 text-sm font-bold text-gray-700 uppercase">Confirm Password</label>
            <input v-model="form.password_confirmation" type="password" class="w-full px-3 py-2 mt-1 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" name="password_confirmation" />
            <div v-if="errors.password_confirmation" class="text-sm font-semibold text-red-600"> {{errors.password_confirmation[0]}}</div>
          </div>

          <div class="flex flex-wrap">
            <button type="submit" class="w-full mt-4 btn btn-black">Register</button>
          </div>
        </form>
        <!-- form end -->

        <div class="pt-4 text-center">
          <router-link to="/login" class="font-semibold cursor-pointer">Login</router-link>
        </div>

        <!-- <div class="pt-4 text-center">or</div>
        <button class="w-full mt-4 btn btn-black">Login with Facebook</button> -->

      </div>
      <!-- text end -->


    </div>
    <!-- card end -->

  </div>
</template>

<script>
export default {
  name: "Register",
  data(){
    return {
      form:{
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      errors: []
    }
  },

  methods: {
    handleRegister(){
      this.$store.dispatch('user/register', this.form)
        .then(() => {
          this.$router.push('/login');
        },
        error => {
          if(error.response.status === 422){
              this.errors = error.response.data.errors;
          }
        }
      );
    }
  }
}
</script>

<style>
</style>