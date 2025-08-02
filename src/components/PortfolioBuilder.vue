<template>
  <div class="fullscreen-portfolio-builder">
    <!-- Exit Button -->
    <q-btn
      icon="close"
      color="white"
      flat
      round
      size="lg"
      class="exit-btn"
      @click="$emit('exit-builder')"
    />

    <!-- Progress Bar -->
    <div class="progress-container">
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }"
        ></div>
      </div>
      <div class="progress-text">
        {{ currentStep + 1 }} of {{ totalSteps }}
      </div>
    </div>

    <!-- Step Container -->
    <div class="step-container">
      <transition :name="slideDirection" mode="out-in">
        <!-- Step 0: Welcome & Template Selection -->
        <div v-if="currentStep === 0" key="welcome" class="step-content">
          <div class="step-header">
            <h1 class="step-title">Welcome to Portfolio Builder</h1>
            <p class="step-subtitle">Let's create your amazing portfolio in just a few steps</p>
          </div>
          <div class="step-body">
            <div class="template-selection">
              <h3 class="section-title">Choose Your Template</h3>
              <div class="template-grid">
                <div
                  v-for="template in templates"
                  :key="template.id"
                  class="template-card"
                  :class="{ active: selectedTemplate === template.id }"
                  @click="selectedTemplate = template.id"
                >
                  <div class="template-preview">
                    <div class="template-icon">{{ template.icon }}</div>
                  </div>
                  <h4>{{ template.name }}</h4>
                  <p>{{ template.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 1: Personal Information -->
        <div v-else-if="currentStep === 1" key="personal" class="step-content">
          <div class="step-header">
            <h1 class="step-title">Personal Information</h1>
            <p class="step-subtitle">Tell us about yourself</p>
          </div>
          <div class="step-body">
            <div class="form-grid">
              <q-input
                v-model="portfolioData.name"
                label="Full Name *"
                outlined
                dark
                color="yellow"
                class="form-input"
              />
              <q-input
                v-model="portfolioData.title"
                label="Title/Role *"
                outlined
                dark
                color="yellow"
                class="form-input"
              />
              <q-input
                v-model="portfolioData.bio"
                label="Short Bio *"
                type="textarea"
                outlined
                dark
                color="yellow"
                rows="4"
                class="form-input full-width"
              />
              <q-input
                v-model="portfolioData.location"
                label="Location"
                outlined
                dark
                color="yellow"
                class="form-input"
              />
              <q-input
                v-model="portfolioData.website"
                label="Personal Website"
                outlined
                dark
                color="yellow"
                class="form-input"
              />
            </div>
          </div>
        </div>

        <!-- Step 2: Skills -->
        <div v-else-if="currentStep === 2" key="skills" class="step-content">
          <div class="step-header">
            <h1 class="step-title">Skills</h1>
            <p class="step-subtitle">What are you good at?</p>
          </div>
          <div class="step-body">
            <div class="skills-section">
              <div class="skill-input-container">
                <q-input
                  v-model="newSkill"
                  label="Add Skill"
                  outlined
                  dark
                  color="yellow"
                  class="skill-input"
                  @keyup.enter="addSkill"
                >
                  <template v-slot:append>
                    <q-btn icon="add" color="yellow" text-color="black" @click="addSkill" round />
                  </template>
                </q-input>
              </div>
              <div class="skills-display">
                <transition-group name="skill" tag="div" class="skills-grid">
                  <q-chip
                    v-for="skill in portfolioData.skills"
                    :key="skill"
                    color="yellow"
                    text-color="black"
                    removable
                    size="lg"
                    @remove="removeSkill(skill)"
                    class="skill-chip"
                  >
                    {{ skill }}
                  </q-chip>
                </transition-group>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Projects -->
        <div v-else-if="currentStep === 3" key="projects" class="step-content">
          <div class="step-header">
            <h1 class="step-title">Projects</h1>
            <p class="step-subtitle">Showcase your best work</p>
          </div>
          <div class="step-body">
            <div class="projects-section">
              <div v-if="portfolioData.projects.length === 0" class="empty-state">
                <div class="empty-icon">📁</div>
                <p>No projects added yet</p>
                <q-btn
                  color="yellow"
                  text-color="black"
                  @click="addProject"
                  label="Add Your First Project"
                  size="lg"
                />
              </div>
              <div v-else class="projects-list">
                <div v-for="(project, index) in portfolioData.projects" :key="index" class="project-item">
                  <div class="project-header">
                    <h4>Project {{ index + 1 }}</h4>
                    <q-btn
                      icon="delete"
                      color="red"
                      flat
                      round
                      @click="removeProject(index)"
                    />
                  </div>
                  <div class="project-form">
                    <q-input
                      v-model="project.name"
                      label="Project Name"
                      outlined
                      dark
                      color="yellow"
                      class="form-input"
                    />
                    <q-input
                      v-model="project.description"
                      label="Description"
                      type="textarea"
                      outlined
                      dark
                      color="yellow"
                      rows="3"
                      class="form-input full-width"
                    />
                    <q-input
                      v-model="project.link"
                      label="Project Link"
                      outlined
                      dark
                      color="yellow"
                      class="form-input"
                    />
                    <q-input
                      v-model="project.imageUrl"
                      label="Image URL (optional)"
                      outlined
                      dark
                      color="yellow"
                      class="form-input"
                    />
                  </div>
                </div>
                <q-btn
                  icon="add"
                  color="yellow"
                  text-color="black"
                  @click="addProject"
                  label="Add Another Project"
                  class="add-btn"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4: Experience -->
        <div v-else-if="currentStep === 4" key="experience" class="step-content">
          <div class="step-header">
            <h1 class="step-title">Experience</h1>
            <p class="step-subtitle">Your professional journey</p>
          </div>
          <div class="step-body">
            <div class="experience-section">
              <div v-if="portfolioData.experience.length === 0" class="empty-state">
                <div class="empty-icon">💼</div>
                <p>No experience added yet</p>
                <q-btn
                  color="yellow"
                  text-color="black"
                  @click="addExperience"
                  label="Add Your First Experience"
                  size="lg"
                />
              </div>
              <div v-else class="experience-list">
                <div v-for="(exp, index) in portfolioData.experience" :key="index" class="experience-item">
                  <div class="experience-header">
                    <h4>Experience {{ index + 1 }}</h4>
                    <q-btn
                      icon="delete"
                      color="red"
                      flat
                      round
                      @click="removeExperience(index)"
                    />
                  </div>
                  <div class="experience-form">
                    <q-input
                      v-model="exp.company"
                      label="Company *"
                      outlined
                      dark
                      color="yellow"
                      class="form-input"
                    />
                    <q-input
                      v-model="exp.role"
                      label="Role *"
                      outlined
                      dark
                      color="yellow"
                      class="form-input"
                    />
                    <q-input
                      v-model="exp.startDate"
                      label="Start Date *"
                      outlined
                      dark
                      color="yellow"
                      class="form-input"
                      hint="e.g., Jan 2022"
                    />
                    <q-input
                      v-model="exp.endDate"
                      label="End Date"
                      outlined
                      dark
                      color="yellow"
                      class="form-input"
                      hint="Leave empty for current position"
                    />
                    <q-input
                      v-model="exp.description"
                      label="Description *"
                      type="textarea"
                      outlined
                      dark
                      color="yellow"
                      rows="4"
                      class="form-input full-width"
                    />
                  </div>
                </div>
                <q-btn
                  icon="add"
                  color="yellow"
                  text-color="black"
                  @click="addExperience"
                  label="Add Another Experience"
                  class="add-btn"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Step 5: Education -->
        <div v-else-if="currentStep === 5" key="education" class="step-content">
          <div class="step-header">
            <h1 class="step-title">Education</h1>
            <p class="step-subtitle">Your academic background</p>
          </div>
          <div class="step-body">
            <div class="education-section">
              <div v-if="portfolioData.education.length === 0" class="empty-state">
                <div class="empty-icon">🎓</div>
                <p>No education added yet</p>
                <q-btn
                  color="yellow"
                  text-color="black"
                  @click="addEducation"
                  label="Add Your Education"
                  size="lg"
                />
              </div>
              <div v-else class="education-list">
                <div v-for="(edu, index) in portfolioData.education" :key="index" class="education-item">
                  <div class="education-header">
                    <h4>Education {{ index + 1 }}</h4>
                    <q-btn
                      icon="delete"
                      color="red"
                      flat
                      round
                      @click="removeEducation(index)"
                    />
                  </div>
                  <div class="education-form">
                    <q-input
                      v-model="edu.institution"
                      label="Institution *"
                      outlined
                      dark
                      color="yellow"
                      class="form-input"
                    />
                    <q-input
                      v-model="edu.degree"
                      label="Degree *"
                      outlined
                      dark
                      color="yellow"
                      class="form-input"
                    />
                    <q-input
                      v-model="edu.startYear"
                      label="Start Year"
                      outlined
                      dark
                      color="yellow"
                      class="form-input"
                    />
                    <q-input
                      v-model="edu.endYear"
                      label="End Year"
                      outlined
                      dark
                      color="yellow"
                      class="form-input"
                    />
                    <q-input
                      v-model="edu.description"
                      label="Description"
                      type="textarea"
                      outlined
                      dark
                      color="yellow"
                      rows="3"
                      class="form-input full-width"
                    />
                  </div>
                </div>
                <q-btn
                  icon="add"
                  color="yellow"
                  text-color="black"
                  @click="addEducation"
                  label="Add Another Education"
                  class="add-btn"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Step 6: Preview & Export -->
        <div v-else-if="currentStep === 6" key="preview" class="step-content">
          <div class="step-header">
            <h1 class="step-title">🎉 Your Portfolio is Ready!</h1>
            <p class="step-subtitle">Preview your portfolio and export it</p>
          </div>
          <div class="step-body">
            <div class="preview-section">
              <div class="preview-container">
                <PortfolioPreview
                  :portfolio-data="portfolioData"
                  :template="selectedTemplate"
                />
              </div>
              <div class="export-actions">
                <q-btn
                  color="yellow"
                  text-color="black"
                  size="xl"
                  @click="generatePortfolio"
                  :loading="generating"
                  class="export-btn"
                >
                  <q-icon name="visibility" class="q-mr-sm" />
                  Preview Portfolio
                </q-btn>
                <q-btn
                  color="green"
                  text-color="white"
                  size="xl"
                  @click="exportPortfolio"
                  :loading="exporting"
                  class="export-btn"
                >
                  <q-icon name="download" class="q-mr-sm" />
                  Export HTML
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Navigation Controls -->
    <div class="navigation-controls">
      <q-btn
        v-if="currentStep > 0"
        icon="arrow_back"
        color="grey"
        flat
        size="lg"
        @click="previousStep"
        class="nav-btn"
      >
        Previous
      </q-btn>

      <div class="nav-spacer"></div>

      <q-btn
        v-if="currentStep < totalSteps - 1"
        icon-right="arrow_forward"
        color="yellow"
        text-color="black"
        size="lg"
        @click="nextStep"
        class="nav-btn"
        :disable="!canProceed"
      >
        Next
      </q-btn>

      <q-btn
        v-if="currentStep === totalSteps - 1"
        icon="check"
        color="green"
        text-color="white"
        size="lg"
        @click="$emit('exit-builder')"
        class="nav-btn"
      >
        Finish
      </q-btn>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useQuasar } from 'quasar'
import PortfolioPreview from './PortfolioPreview.vue'

export default defineComponent({
  name: 'PortfolioBuilder',
  emits: ['exit-builder'],
  components: {
    PortfolioPreview
  },
  setup(props, { emit }) {
    const $q = useQuasar()
    const currentStep = ref(0)
    const totalSteps = ref(7)
    const slideDirection = ref('slide-left')
    const selectedTemplate = ref('modern')
    const newSkill = ref('')
    const generating = ref(false)
    const exporting = ref(false)

    const templates = [
      {
        id: 'modern',
        name: 'Modern Minimal',
        description: 'Clean and modern design with dark theme',
        icon: '🎨'
      },
      {
        id: 'classic',
        name: 'Classic Professional',
        description: 'Traditional professional layout',
        icon: '💼'
      }
    ]

    const portfolioData = reactive({
      name: 'Muhammad Sinan Ali',
      title: 'Full Stack Developer',
      bio: 'Passionate full stack developer with expertise in modern web technologies.',
      location: 'Mangalore, Karnataka, India',
      website: '',
      skills: ['Vue.js', 'React', 'Node.js', 'Python', 'MongoDB'],
      projects: [
        {
          name: 'E-commerce Platform',
          description: 'A full-stack e-commerce application built with Vue.js and Node.js',
          link: 'https://github.com/example/ecommerce',
          imageUrl: ''
        }
      ],
      experience: [
        {
          company: 'Tech Company',
          role: 'Senior Developer',
          startDate: '2022',
          endDate: 'Present',
          description: 'Led development of multiple web applications using modern technologies.'
        }
      ],
      education: [
        {
          institution: 'Presidency University',
          degree: 'Bachelor of Computer Science Engineering',
          startYear: '2022',
          endYear: '2026',
          description: 'Studying Computer Science with focus on software development and modern technologies.'
        }
      ]
    })

    const canProceed = computed(() => {
      switch (currentStep.value) {
        case 0:
          return selectedTemplate.value !== null
        case 1:
          return portfolioData.name && portfolioData.title && portfolioData.bio
        default:
          return true
      }
    })

    const nextStep = () => {
      if (currentStep.value < totalSteps.value - 1 && canProceed.value) {
        slideDirection.value = 'slide-left'
        currentStep.value++
      }
    }

    const previousStep = () => {
      if (currentStep.value > 0) {
        slideDirection.value = 'slide-right'
        currentStep.value--
      }
    }

    const handleKeydown = (e) => {
      if (e.key === 'Enter' && canProceed.value && currentStep.value < totalSteps.value - 1) {
        nextStep()
      } else if (e.key === 'Escape') {
        emit('exit-builder')
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', handleKeydown)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeydown)
    })

    const addSkill = () => {
      if (newSkill.value.trim()) {
        portfolioData.skills.push(newSkill.value.trim())
        newSkill.value = ''
      }
    }

    const removeSkill = (skill) => {
      const index = portfolioData.skills.indexOf(skill)
      if (index > -1) {
        portfolioData.skills.splice(index, 1)
      }
    }

    const addProject = () => {
      portfolioData.projects.push({
        name: '',
        description: '',
        link: '',
        imageUrl: ''
      })
    }

    const removeProject = (index) => {
      portfolioData.projects.splice(index, 1)
    }

    const addExperience = () => {
      portfolioData.experience.push({
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        description: ''
      })
    }

    const removeExperience = (index) => {
      portfolioData.experience.splice(index, 1)
    }

    const addEducation = () => {
      portfolioData.education.push({
        institution: '',
        degree: '',
        startYear: '',
        endYear: '',
        description: ''
      })
    }

    const removeEducation = (index) => {
      portfolioData.education.splice(index, 1)
    }

    const generatePortfolio = () => {
      generating.value = true
      setTimeout(() => {
        generating.value = false
        $q.notify({
          type: 'positive',
          message: 'Portfolio preview updated successfully!',
          position: 'top'
        })
      }, 1000)
    }

    const exportPortfolio = () => {
      exporting.value = true
      setTimeout(() => {
        const blob = new Blob(['<html><body><h1>Portfolio Export</h1></body></html>'], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${portfolioData.name.replace(/\s+/g, '_')}_Portfolio.html`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        exporting.value = false
        $q.notify({
          type: 'positive',
          message: 'Portfolio exported successfully!',
          position: 'top'
        })
      }, 2000)
    }

    return {
      currentStep,
      totalSteps,
      slideDirection,
      selectedTemplate,
      templates,
      portfolioData,
      newSkill,
      generating,
      exporting,
      canProceed,
      nextStep,
      previousStep,
      addSkill,
      removeSkill,
      addProject,
      removeProject,
      addExperience,
      removeExperience,
      addEducation,
      removeEducation,
      generatePortfolio,
      exportPortfolio
    }
  }
})
</script>

<style scoped>
.fullscreen-portfolio-builder {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #1a1a1a;
  color: white;
  display: flex;
  flex-direction: column;
  z-index: 10000;
}

.exit-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10001;
}

.progress-container {
  padding: 20px 60px;
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: #333;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: #ffc107;
  transition: width 0.3s ease;
}

.progress-text {
  color: #ffc107;
  font-weight: 500;
}

.step-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
}

.step-content {
  width: 100%;
  max-width: 800px;
  text-align: center;
}

.step-header {
  margin-bottom: 40px;
}

.step-title {
  font-size: 2.5rem;
  color: #ffc107;
  margin-bottom: 10px;
}

.step-subtitle {
  font-size: 1.2rem;
  color: #ccc;
}

.step-body {
  text-align: left;
}

.section-title {
  font-size: 1.5rem;
  color: #ffc107;
  margin-bottom: 20px;
  text-align: center;
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.template-card {
  background: #2a2a2a;
  border: 2px solid #333;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.template-card:hover {
  border-color: #ffc107;
  transform: translateY(-2px);
}

.template-card.active {
  border-color: #ffc107;
  background: #333;
}

.template-preview {
  margin-bottom: 15px;
}

.template-icon {
  font-size: 3rem;
  margin-bottom: 10px;
}

.template-card h4 {
  color: #ffc107;
  margin-bottom: 8px;
}

.template-card p {
  color: #ccc;
  font-size: 0.9rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.form-input.full-width {
  grid-column: 1 / -1;
}

.skills-section {
  max-width: 600px;
  margin: 0 auto;
}

.skill-input-container {
  margin-bottom: 30px;
}

.skill-input {
  width: 100%;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.skill-chip {
  margin: 4px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.empty-state p {
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 30px;
}

.projects-list,
.experience-list,
.education-list {
  max-width: 700px;
  margin: 0 auto;
}

.project-item,
.experience-item,
.education-item {
  background: #2a2a2a;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.project-header,
.experience-header,
.education-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.project-header h4,
.experience-header h4,
.education-header h4 {
  color: #ffc107;
  margin: 0;
}

.project-form,
.experience-form,
.education-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.project-form .full-width,
.experience-form .full-width,
.education-form .full-width {
  grid-column: 1 / -1;
}

.add-btn {
  display: block;
  margin: 20px auto 0;
}

.preview-section {
  max-width: 900px;
  margin: 0 auto;
}

.preview-container {
  background: #2a2a2a;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  max-height: 60vh;
  overflow-y: auto;
}

.export-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.export-btn {
  min-width: 200px;
}

.navigation-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  background: #2a2a2a;
  border-top: 1px solid #333;
}

.nav-spacer {
  flex: 1;
}

.nav-btn {
  min-width: 120px;
}

/* Slide Transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Skill animations */
.skill-enter-active,
.skill-leave-active {
  transition: all 0.3s ease;
}

.skill-enter-from,
.skill-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* Responsive Design */
@media (max-width: 768px) {
  .step-title {
    font-size: 2rem;
  }

  .template-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .export-actions {
    flex-direction: column;
  }

  .navigation-controls {
    padding: 15px 20px;
  }

  .progress-container {
    padding: 15px 20px;
  }
}
</style>
