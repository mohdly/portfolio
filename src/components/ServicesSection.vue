<template>
  <div class="services-section q-pa-lg">
    <h2 class="text-h3 section-title q-mb-lg text-center">What I&#39;m Doing</h2>
    <div class="services-list">
      <div v-for="service in services" :key="service.name" class="service-card">
        <div class="service-icon">
          <q-icon :name="service.icon" size="40px" color="yellow" />
        </div>
        <div class="service-content">
          <div class="text-h6 text-bold service-name">{{ service.name }}</div>
          <p class="service-desc">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServicesSection',
  data() {
    return {
      services: [
        {
          name: 'Web Design',
          icon: 'palette',
          description: 'Modern, high-quality design at a professional level.'
        },
        {
          name: 'Web Development',
          icon: 'code',
          description: 'High-quality development of sites at the professional level.'
        },
        {
          name: 'Mobile Apps',
          icon: 'phone_android',
          description: 'Professional development of mobile applications for iOS and Android.'
        },
        {
          name: 'API Development',
          icon: 'api',
          description: 'Robust and scalable RESTful APIs and microservices architecture.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.services-section {
  background: var(--services-bg, #1a1a1a);
  padding: 48px 24px;
}

.section-title {
  color: var(--services-title, #fff);
  letter-spacing: 1px;
}

.services-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin: 0 auto;
  max-width: 900px;
}

.service-card {
  background: var(--service-card-bg, #232323);
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
  border: 1px solid #333;
}

.service-card:hover {
  box-shadow: 0 4px 24px rgba(255,193,7,0.12);
  transform: translateY(-4px) scale(1.03);
  background: var(--service-card-hover, #2a2a2a);
}

.service-icon {
  margin-bottom: 18px;
}

.service-name {
  color: var(--service-name, #fff);
  font-size: 1.2rem;
  margin-bottom: 8px;
}

.service-desc {
  color: var(--service-desc, #bdbdbd);
  font-size: 1rem;
  margin: 0;
  line-height: 1.6;
}

/* Light mode support */
@media (prefers-color-scheme: light) {
  :root {
    --services-bg: #fff;
    --services-title: #111;
    --service-card-bg: #f8f8f8;
    --service-card-hover: #f0f0f0;
    --service-name: #111;
    --service-desc: #333;
  }
  .service-card {
    border: 1px solid #e0e0e0;
  }
}
</style>
