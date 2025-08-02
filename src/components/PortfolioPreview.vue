<template>
  <div class="portfolio-preview">
    <!-- Modern Minimal Template -->
    <div v-if="template === 'modern'" class="modern-template">
      <div class="header text-center q-mb-lg">
        <h1 class="text-h3 text-white q-mb-sm">{{ portfolioData.name }}</h1>
        <p class="text-h6 text-yellow q-mb-md">{{ portfolioData.title }}</p>
        <p class="text-body1 text-grey-3">{{ portfolioData.bio }}</p>
      </div>

      <!-- Skills -->
      <div class="skills-section q-mb-lg" v-if="portfolioData.skills.length">
        <h3 class="text-h5 text-white q-mb-md">Skills</h3>
        <div class="skills-grid">
          <q-chip
            v-for="skill in portfolioData.skills"
            :key="skill"
            color="grey-7"
            text-color="white"
            class="q-ma-xs"
          >
            {{ skill }}
          </q-chip>
        </div>
      </div>

      <!-- Projects -->
      <div class="projects-section q-mb-lg" v-if="portfolioData.projects.length">
        <h3 class="text-h5 text-white q-mb-md">Projects</h3>
        <div class="row q-gutter-md">
          <div v-for="project in portfolioData.projects" :key="project.name" class="col-12">
            <q-card class="project-card bg-grey-9" flat bordered>
              <q-card-section>
                <div class="text-h6 text-white q-mb-sm">{{ project.name }}</div>
                <p class="text-grey-3 q-mb-md">{{ project.description }}</p>
                <q-btn
                  v-if="project.link"
                  color="yellow"
                  text-color="black"
                  size="sm"
                  label="View Project"
                  @click="openLink(project.link)"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Experience -->
      <div class="experience-section q-mb-lg" v-if="portfolioData.experience.length">
        <h3 class="text-h5 text-white q-mb-md">Experience</h3>
        <div class="timeline">
          <div v-for="exp in portfolioData.experience" :key="exp.company" class="timeline-item">
            <div class="timeline-content">
              <div class="text-h6 text-white">{{ exp.role }}</div>
              <div class="text-subtitle1 text-yellow">{{ exp.company }}</div>
              <div class="text-caption text-grey-4 q-mb-sm">{{ exp.startDate }} - {{ exp.endDate || 'Present' }}</div>
              <p class="text-grey-3">{{ exp.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div class="education-section" v-if="portfolioData.education && portfolioData.education.length">
        <h3 class="text-h5 text-white q-mb-md">Education</h3>
        <div class="timeline">
          <div v-for="edu in portfolioData.education" :key="edu.institution" class="timeline-item">
            <div class="timeline-content">
              <div class="text-h6 text-white">{{ edu.degree }}</div>
              <div class="text-subtitle1 text-yellow">{{ edu.institution }}</div>
              <div class="text-caption text-grey-4 q-mb-sm">{{ edu.startYear }} - {{ edu.endYear }}</div>
              <p class="text-grey-3" v-if="edu.description">{{ edu.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Classic Professional Template -->
    <div v-else class="classic-template">
      <div class="header text-center q-mb-xl">
        <h1 class="text-h2 text-white q-mb-sm">{{ portfolioData.name }}</h1>
        <p class="text-h5 text-yellow q-mb-md">{{ portfolioData.title }}</p>
        <div class="divider"></div>
        <p class="text-body1 text-grey-3 q-mt-md">{{ portfolioData.bio }}</p>
      </div>

      <!-- Skills -->
      <div class="skills-section q-mb-xl" v-if="portfolioData.skills.length">
        <h3 class="text-h4 text-white q-mb-lg text-center">Technical Skills</h3>
        <div class="skills-grid text-center">
          <q-chip
            v-for="skill in portfolioData.skills"
            :key="skill"
            color="yellow"
            text-color="black"
            size="lg"
            class="q-ma-xs"
          >
            {{ skill }}
          </q-chip>
        </div>
      </div>

      <!-- Projects -->
      <div class="projects-section q-mb-xl" v-if="portfolioData.projects.length">
        <h3 class="text-h4 text-white q-mb-lg text-center">Featured Projects</h3>
        <div class="row q-gutter-lg">
          <div v-for="project in portfolioData.projects" :key="project.name" class="col-12 col-md-6">
            <q-card class="project-card bg-grey-9" flat bordered>
              <q-card-section class="text-center">
                <div class="text-h5 text-white q-mb-sm">{{ project.name }}</div>
                <p class="text-grey-3 q-mb-md">{{ project.description }}</p>
                <q-btn
                  v-if="project.link"
                  color="yellow"
                  text-color="black"
                  outline
                  label="View Project"
                  @click="openLink(project.link)"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Experience -->
      <div class="experience-section q-mb-xl" v-if="portfolioData.experience.length">
        <h3 class="text-h4 text-white q-mb-lg text-center">Professional Experience</h3>
        <div class="experience-timeline">
          <div v-for="exp in portfolioData.experience" :key="exp.company" class="experience-item">
            <div class="experience-header">
              <div class="text-h6 text-white">{{ exp.role }}</div>
              <div class="text-subtitle1 text-yellow">{{ exp.company }}</div>
              <div class="text-caption text-grey-4">{{ exp.startDate }} - {{ exp.endDate || 'Present' }}</div>
            </div>
            <div class="experience-content">
              <p class="text-grey-3">{{ exp.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div class="education-section" v-if="portfolioData.education && portfolioData.education.length">
        <h3 class="text-h4 text-white q-mb-lg text-center">Education</h3>
        <div class="experience-timeline">
          <div v-for="edu in portfolioData.education" :key="edu.institution" class="experience-item">
            <div class="experience-header">
              <div class="text-h6 text-white">{{ edu.degree }}</div>
              <div class="text-subtitle1 text-yellow">{{ edu.institution }}</div>
              <div class="text-caption text-grey-4">{{ edu.startYear }} - {{ edu.endYear }}</div>
            </div>
            <div class="experience-content" v-if="edu.description">
              <p class="text-grey-3">{{ edu.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortfolioPreview',
  props: {
    portfolioData: {
      type: Object,
      required: true
    },
    template: {
      type: String,
      default: 'modern'
    }
  },
  methods: {
    openLink(url) {
      if (url) {
        window.open(url, '_blank')
      }
    }
  }
}
</script>

<style scoped>
.portfolio-preview {
  color: white;
}

.modern-template, .classic-template {
  padding: 20px;
}

.divider {
  width: 100px;
  height: 3px;
  background: #ffc107;
  margin: 0 auto;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.timeline {
  position: relative;
}

.timeline-item {
  margin-bottom: 20px;
  padding-left: 20px;
  border-left: 2px solid #ffc107;
}

.timeline-content {
  padding: 10px;
  background: #2a2a2a;
  border-radius: 8px;
}

.experience-timeline {
  max-width: 800px;
  margin: 0 auto;
}

.experience-item {
  margin-bottom: 30px;
  padding: 20px;
  background: #2a2a2a;
  border-radius: 12px;
  border-left: 4px solid #ffc107;
}

.experience-header {
  margin-bottom: 10px;
}

.project-card {
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-2px);
}
</style>
