<template>
  <div ref="languageBtnRef" style="position: relative; display: inline-block;">
    <q-btn
      flat
      label="Language"
      class="nav-link"
      @click="toggleLanguageSelector"
    />
    <transition name="fade-slide">
      <div
        v-if="showLanguageSelector"
        class="language-selector"
        :style="languageSelectorStyle"
        @click.stop
      >
        <div
          v-for="lang in languages"
          :key="lang.code"
          class="language-option"
          :class="{ selected: lang.code === selectedLanguage }"
          @click="selectLanguage(lang.code)"
        >
          {{ lang.label }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'LanguageSelector',
  setup() {
    const showLanguageSelector = ref(false)
    const selectedLanguage = ref('en')
    const languages = [
      { code: 'en', label: 'English' },
      { code: 'kn', label: 'Kannada' },
      { code: 'ml', label: 'Malayalam' },
      { code: 'ta', label: 'Tamil' },
      { code: 'hi', label: 'Hindi' }
    ]
    const languageBtnRef = ref(null)
    const languageSelectorStyle = ref({})

    const toggleLanguageSelector = () => {
      showLanguageSelector.value = !showLanguageSelector.value
      if (showLanguageSelector.value && languageBtnRef.value) {
        const btn = languageBtnRef.value
        const rect = btn.getBoundingClientRect()
        languageSelectorStyle.value = {
          position: 'absolute',
          top: `${rect.height + 8}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2001
        }
      }
    }


    const closeLanguageSelector = () => {
      showLanguageSelector.value = false
    }

    const selectLanguage = (code) => {
      selectedLanguage.value = code
      closeLanguageSelector()
    }

    const handleKeydown = (e) => {
      if (e.key === 'Escape') closeLanguageSelector()
    }

    onMounted(() => {
      window.addEventListener('keydown', handleKeydown)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeydown)
    })

    return {
      showLanguageSelector,
      selectedLanguage,
      languages,
      languageBtnRef,
      languageSelectorStyle,
      toggleLanguageSelector,
      closeLanguageSelector,
      selectLanguage
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

.language-selector {
  min-width: 150px;
  background: #232323;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 12px 0;
  position: absolute;
  top: 44px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2001;
  display: flex;
  flex-direction: column;
  animation: fadeSlideUp 0.25s;
}

.language-option {
  padding: 10px 24px;
  color: #fff;
  cursor: pointer;
  border-radius: 8px;
  font-size: 15px;
  transition: background 0.18s;
  text-align: left;
}

.language-option:hover,
.language-option.selected {
  background: #ffc107;
  color: #232323;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
