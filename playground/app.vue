<template>
  <div>
    <pre>{{ runtimeConfig.public }}</pre>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #1f2937;
}

pre {
  border-radius: 0.5rem;
  background-color: #1f2937;
  margin: 1rem;
  font-size: 0.75rem;
  color: #fff;
  padding: 1rem;
  white-space: pre-wrap;
  overflow: auto;
}
</style>
