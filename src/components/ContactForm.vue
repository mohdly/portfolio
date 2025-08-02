<template>
  <div class="contact-form-container">
    <h3 class="text-h4 text-bold q-mb-lg text-white">Send us a Message</h3>
    <q-form @submit="onSubmit" class="q-gutter-y-md">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <q-input
            filled
            dark
            color="yellow"
            v-model="formData.firstName"
            label="First Name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            filled
            dark
            color="yellow"
            v-model="formData.lastName"
            label="Last Name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <q-input
            filled
            dark
            color="yellow"
            v-model="formData.email"
            label="Email Address"
            type="email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            filled
            dark
            color="yellow"
            v-model="formData.phone"
            label="Phone Number"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>
      </div>
      <q-input
        filled
        dark
        color="yellow"
        v-model="formData.message"
        label="Message"
        type="textarea"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <div>
        <q-btn label="Send Message" type="submit" color="yellow" text-color="black" class="full-width q-mt-md"/>
      </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ContactForm',
  setup() {
    const formData = ref({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    })

    const onSubmit = () => {
      console.log('Form submitted:', formData.value)
      // Here you would typically handle the form submission, e.g., send the data to a server.
    }

    return {
      formData,
      onSubmit
    }
  }
})
</script>

<style scoped>
.contact-form-container {
  background: #2a2a2a;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #333;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
</style>
