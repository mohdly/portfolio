<template>
  <q-btn
    flat
    icon="download"
    label="Resume"
    @click="downloadResume"
    class="nav-link q-ml-md"
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DownloadResume',
  methods: {
    async downloadResume() {
      try {
        const resumeUrl = 'https://mohdsinanresume-1-1.tiiny.site'
        const link = document.createElement('a')
        link.href = resumeUrl
        link.download = 'Muhammad_Sinan_Ali_Resume.pdf'
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (error) {
        console.error('Error downloading resume:', error)
        window.open('https://mohdsinanresume-1-1.tiiny.site', '_blank')
      }
    }
  }
})
</script>

<style scoped>
.nav-link {
  color: #fff !important;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ffc107 !important;
}
</style>
