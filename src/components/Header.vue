<template>
  <Disclosure as="nav" class="bg-primary border-b border-slate-800/80 shadow-md backdrop-blur-md sticky top-0 z-40" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <!-- Mobile menu toggle button -->
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-secondary-100 hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-secondary-300 transition-colors"
          >
            <span class="sr-only">Toggle main navigation</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>

        <!-- Brand Logo & Navigation Links -->
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <!-- Brand / Logo -->
          <router-link to="/" class="flex items-center gap-2 group">
            <div class="w-8 h-8 rounded-lg bg-secondary-300 flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
              C
            </div>
            <span class="font-heading font-extrabold text-lg tracking-tight text-white group-hover:text-secondary-200 transition-colors">
              CryptoTrack
            </span>
          </router-link>

          <!-- Desktop Navigation -->
          <div class="hidden sm:block sm:ml-8">
            <div class="flex space-x-2">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="{ name: item.name }"
                class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all"
                :class="[
                  isCurrentRoute(item.name)
                    ? 'bg-secondary-300/20 text-white border border-secondary-300/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60',
                ]"
                :aria-current="isCurrentRoute(item.name) ? 'page' : undefined"
              >
                {{ item.label || item.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <DisclosurePanel class="sm:hidden border-t border-slate-800/60 bg-primary/95 backdrop-blur-lg">
      <div class="px-4 pt-3 pb-4 space-y-1.5">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="template"
        >
          <router-link
            :to="{ name: item.name }"
            class="block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
            :class="[
              isCurrentRoute(item.name)
                ? 'bg-secondary-300/20 text-white border border-secondary-300/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60',
            ]"
            :aria-current="isCurrentRoute(item.name) ? 'page' : undefined"
          >
            {{ item.label || item.name }}
          </router-link>
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

const route = useRoute();

const navigation = [
  { name: "Home", label: "Home" },
  { name: "Coins", label: "Coins" },
  { name: "Exchanges", label: "Exchanges" },
  { name: "Trending", label: "Trending" },
];

const isCurrentRoute = (routeName) => {
  return route.name === routeName;
};
</script>