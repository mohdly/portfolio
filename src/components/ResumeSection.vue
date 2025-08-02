<template>
  <div class="resume-section q-pa-lg text-white">
    <h2 class="text-h3 q-mb-lg">Resume</h2>
    <div class="q-mb-md">
      <p>
        Download my latest resume to learn more about my experience, education, and skills. The PDF contains a detailed overview of my professional background and accomplishments.
      </p>
    </div>
    <q-btn
      color="yellow"
      text-color="black"
      icon="download"
      label="Download Resume (PDF)"
      @click="downloadResume"
      class="q-mt-md"
    />
  </div>
</template>

<script>
export default {
  name: 'ResumeSection',
  data() {
    return {
      resumeUrl: 'https://mohdsinanresume-1-1.tiiny.site' // External PDF URL
    }
  },
  methods: {
    async downloadResume() {
      try {
        // Create a temporary anchor element to trigger download
        const link = document.createElement('a')
        link.href = this.resumeUrl
        link.download = 'Muhammad_Sinan_Ali_Resume.pdf'
        link.target = '_blank'

        // Append to body, click, and remove
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (error) {
        console.error('Error downloading resume:', error)
        // Fallback: open in new tab if direct download fails
        window.open(this.resumeUrl, '_blank')
      }
    }
  }
}
</script>

<style scoped>
.resume-section {
  background: #1a1a1a;
  border-radius: 16px;
}
</style>
