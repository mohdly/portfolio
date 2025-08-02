<template>
  <div class="skills-section q-pa-lg">
    <h2 class="text-h3 text-white q-mb-lg">Skills & Technologies</h2>
    <div class="row q-gutter-md">
      <div v-for="skill in skills" :key="skill.name" class="col-12 col-sm-6 col-md-4">
        <q-card class="skill-card bg-dark text-white" flat bordered>
          <q-card-section class="text-center">
            <q-icon :name="skill.icon" size="48px" color="yellow" class="q-mb-md" />
            <div class="text-h6 text-bold q-mb-sm">{{ skill.name }}</div>
            <div class="text-caption text-grey-4">{{ skill.description }}</div>
            <div class="q-mt-md">
              <q-chip v-for="tech in skill.technologies" :key="tech"
                      color="yellow" text-color="black" size="sm" class="q-ma-xs">
                {{ tech }}
              </q-chip>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkillsSection',
  data() {
    return {
      skills: [
        {
          name: 'Frontend Development',
          icon: 'code',
          description: 'Modern web applications with responsive design',
          technologies: ['Vue.js', 'React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS']
        },
        {
          name: 'Backend Development',
          icon: 'storage',
          description: 'Robust server-side applications and APIs',
          technologies: ['Node.js', 'Express', 'Python', 'Django', 'PHP', 'Laravel', 'Java']
        },
        {
          name: 'Database & Cloud',
          icon: 'cloud',
          description: 'Data management and cloud infrastructure',
          technologies: ['MongoDB', 'PostgreSQL', 'MySQL', 'AWS', 'Azure', 'Firebase', 'Redis']
        },
        {
          name: 'DevOps & Tools',
          icon: 'build',
          description: 'Development operations and version control',
          technologies: ['Git', 'Docker', 'CI/CD', 'Jenkins', 'Kubernetes', 'Linux', 'Nginx']
        },
        {
          name: 'Mobile Development',
          icon: 'phone_android',
          description: 'Cross-platform mobile applications',
          technologies: ['React Native', 'Flutter', 'Ionic', 'Cordova', 'Progressive Web Apps']
        },
        {
          name: 'Design & UX',
          icon: 'palette',
          description: 'User experience and interface design',
          technologies: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'UI/UX Design']
        }
      ]
    }
  }
}
</script>

<style scoped>
.skills-section {
  background: #1a1a1a;
}

.skill-card {
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #333;
}

.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(255, 193, 7, 0.2);
}

.bg-dark {
  background: #2a2a2a !important;
}
</style>
