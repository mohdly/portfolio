<template>
  <div class="tailwind-demo p-8 bg-gradient-to-r from-blue-900 to-purple-900 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-center text-white mb-12">Tailwind CSS Demo</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl">
          <div class="text-3xl text-yellow-400 mb-4 flex justify-center">
            <q-icon name="design_services" />
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Web Design</h3>
          <p class="text-gray-200">Modern, responsive designs that look great on all devices.</p>
        </div>

        <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300">
          <div class="text-3xl text-yellow-400 mb-4 flex justify-center">
            <q-icon name="code" />
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Development</h3>
          <p class="text-gray-200">Clean, efficient code with modern frameworks and best practices.</p>
        </div>

        <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl">
          <div class="text-3xl text-yellow-400 mb-4 flex justify-center">
            <q-icon name="speed" />
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Performance</h3>
          <p class="text-gray-200">Optimized applications for fast loading and smooth interactions.</p>
        </div>
      </div>

      <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 shadow-xl">
        <h2 class="text-2xl font-bold text-white mb-6 text-center">Contact Form</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-200 mb-2">Name</label>
            <input type="text" class="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
          </div>

          <div>
            <label class="block text-gray-200 mb-2">Email</label>
            <input type="email" class="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
          </div>

          <div>
            <label class="block text-gray-200 mb-2">Message</label>
            <textarea class="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent" rows="4"></textarea>
          </div>

          <div class="pt-4">
            <button class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105">
              Send Message
            </button>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center">
        <button class="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-yellow-500/50">
          Get Started
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TailwindDemo'
}
</script>

<style scoped>
.tailwind-demo {
  font-family: 'Inter', sans-serif;
}
</style>
