<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="w-full h-full">
    <div class="nst-app-default-layout lg:px-48 sm:px-24 max-sm:px-10 h-full">
      <HeaderBase />
      <div class="nst-app-default-layout-content h-full relative z-10">
        <slot></slot>
      </div>
    </div>
    <FooterBase class="relative bottom-0" />
  </div>
</template>
