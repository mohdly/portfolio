<template>
  <q-layout view="hHh lpR fFf" class="bg-dark">
    <q-header elevated class="bg-dark text-white" height-hint="64">
      <q-toolbar>
        <q-toolbar-title class="text-bold">PORTFOLIO</q-toolbar-title>
        <div class="q-gutter-x-md">
        <q-btn
          :label="isBuilderMode ? 'View Portfolio' : 'Builder Mode'"
          :color="isBuilderMode ? 'yellow' : 'primary'"
          :text-color="isBuilderMode ? 'black' : 'white'"
          @click="toggleMode"
        />
        <DownloadResume class="q-ml-md" />
        </div>
        <div class="nav-links" v-if="!isBuilderMode">
          <q-btn flat label="About" class="nav-link" :class="{ active: activeSection === 'about' }" @click="scrollToSection('about')" />
          <q-btn flat label="Skills" class="nav-link" :class="{ active: activeSection === 'skills' }" @click="scrollToSection('skills')" />
          <q-btn flat label="Contact" class="nav-link" :class="{ active: activeSection === 'contact' }" @click="scrollToSection('contact')" />
          <LanguageSelector />
        </div>
      </q-toolbar>
    </q-header>

    <!-- Portfolio Builder Mode -->
    <div v-if="isBuilderMode" class="builder-container" :class="{ 'fullscreen-builder': isBuilderMode }">
      <PortfolioBuilder @exit-builder="toggleMode" />
    </div>

    <!-- Regular Portfolio Mode -->
    <div v-else>
      <q-drawer v-model="leftDrawerOpen" show-if-above side="left" bordered class="bg-dark fixed-sidebar" :width="300">
        <ProfileSidebar />
      </q-drawer>

      <q-page-container class="bg-dark">
        <div class="main-content">
          <div id="about" class="section">
            <AboutSection />
          </div>
          <div id="skills" class="section">
            <SkillsSection />
          </div>
          <div id="services" class="section">
            <ServicesSection />
          </div>
          <div id="contact" class="section">
            <ContactSection />
          </div>
          <!-- ...other sections... -->
        </div>
      </q-page-container>
    </div>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import ProfileSidebar from 'components/ProfileSidebar.vue'
import AboutSection from 'components/AboutSection.vue'
import SkillsSection from 'components/SkillsSection.vue'
import PortfolioBuilder from 'components/PortfolioBuilder.vue'
import ServicesSection from 'components/ServicesSection.vue'
import LanguageSelector from 'components/LanguageSelector.vue'
import DownloadResume from 'components/DownloadResume.vue'
import ContactSection from 'components/ContactSection.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    ProfileSidebar,
    AboutSection,
    SkillsSection,
    PortfolioBuilder,
    ServicesSection,
    LanguageSelector,
    DownloadResume,
    ContactSection
  },
  setup() {
    const leftDrawerOpen = ref(true)
    const activeSection = ref('about')
    const isBuilderMode = ref(false)

    const scrollToSection = (sectionId) => {
      activeSection.value = sectionId
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }

    const toggleMode = () => {
      isBuilderMode.value = !isBuilderMode.value
    }

    return {
      leftDrawerOpen,
      activeSection,
      isBuilderMode,
      scrollToSection,
      toggleMode
    }
  }
})
</script>

<style scoped>
.bg-dark {
  background: #1a1a1a !important;
}

.builder-container {
  margin-top: 64px;
  min-height: calc(100vh - 64px);
}

.fullscreen-builder {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  margin: 0;
  background: #1a1a1a;
}

.fixed-sidebar {
  position: fixed !important;
  top: 64px;
  left: 0;
  height: calc(100vh - 64px);
  z-index: 1000;
}

.main-content {
  margin-left: 300px;
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  margin-right: auto;
  margin-left: auto;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.nav-link {
  color: #fff !important;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ffc107 !important;
}

.nav-link.active {
  color: #ffc107 !important;
  border-bottom: 2px solid #ffc107;
}

.section {
  padding: 48px 0;
  border-bottom: 1px solid #333;
}

.section:last-child {
  border-bottom: none;
}

@media (max-width: 1023px) {
  .main-content {
    margin-left: 0;
  }

  .fixed-sidebar {
    position: relative !important;
    top: auto;
    left: auto;
    height: auto;
  }
}

.services-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.service-item {
  background: #232323;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}
.text-yellow {
  color: #ffc107;
}
</style>
