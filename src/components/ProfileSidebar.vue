<template>
  <div class="profile-sidebar bg-dark text-white q-pa-lg">
    <div class="text-center q-mb-lg">
      <q-avatar size="120px" class="q-mb-md">
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg" alt="Profile Picture" />
      </q-avatar>
      <div class="text-h4 text-bold q-mb-sm">{{ profile.name }}</div>
      <q-chip color="yellow" text-color="black" size="md" class="title-chip">{{ profile.title }}</q-chip>
    </div>

    <div class="contact-info q-gutter-y-md">
      <div
        v-for="contact in profile.contacts"
        :key="contact.type"
        class="contact-item row items-center q-gutter-sm"
      >
        <q-icon :name="contact.icon" color="yellow" size="20px" />
        <div class="col">
          <div class="text-caption text-grey-4">{{ contact.label }}</div>
          <div class="text-body2">
            <template v-if="contact.type === 'email'">
              <a :href="`mailto:${contact.value}`" class="contact-link">{{ contact.value }}</a>
            </template>
            <template v-else-if="contact.type === 'phone'">
              <a :href="`tel:${contact.value.replace(/[^+\d]/g, '')}`" class="contact-link">{{ contact.value }}</a>
            </template>
            <template v-else>
              {{ contact.value }}
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="social-links q-mt-md">
      <div class="text-h6 q-mb-md">Connect With Me</div>
      <div class="row q-gutter-sm justify-center">
        <q-btn v-for="social in profile.socials" :key="social.name"
               :icon="social.icon" round color="yellow" text-color="black"
               size="md" @click="openSocial(social.url)" />
      </div>
    </div>
  </div>
</template>

<script>
import { profile } from 'src/data/profileData.js'

export default {
  name: 'ProfileSidebar',
  data() {
    return {
      profile
    }
  },
  methods: {
    openSocial(url) {
      if (url !== '#') {
        window.open(url, '_blank')
      }
    }
  }
}
</script>

<style scoped>
.profile-sidebar {
  background: #1a1a1a !important;
  min-height: 100vh;
  border-right: 1px solid #333;
}

.contact-item {
  padding: 8px 0;
  border-bottom: 1px solid #333;
}

.contact-item:last-child {
  border-bottom: none;
}

.social-links {
  border-top: 1px solid #333;
  padding-top: 20px;
}

.title-chip {
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  padding: 8px 16px !important;
}

.contact-link {
  color: #fff; /* Changed from #ffc107 to white */
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  font-size: 1em;
}

.contact-link:hover {
  color: #e8e7e3;
  text-decoration: underline;
}
</style>
