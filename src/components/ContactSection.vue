<template>
  <div class="contact-section q-pa-lg">
    <h2 class="text-h3 text-white q-mb-lg text-center">
      Get In Touch
      <div class="underline"></div>
    </h2>

    <div class="row justify-center">
      <div class="col-12 col-md-8 col-lg-10">
        <ContactForm />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ContactForm from './ContactForm.vue'

export default defineComponent({
  name: 'ContactSection',
  components: {
    ContactForm
  }
})
</script>

<style scoped>
.contact-section {
  background: #1a1a1a;
}

.underline {
  width: 600px;
  height: 3px;
  background: #ffc107;
  margin: 8px auto 0;
}


@media (max-width: 768px) {
  .contact-section {
    padding: 16px;
  }
}
</style>
