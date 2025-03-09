<template>
  <div>
    Nuxt module playground!
  </div>

  <button @click="action">
    Fetch
  </button>
</template>

<script setup lang="ts">
const { logInfo } = useLogger()

const action = async () => {
  logInfo('Fetching data')
  await useFetch('/api/test')
}
</script>
