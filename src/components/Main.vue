<script setup>
import { ref } from 'vue'

const skipperName = 'Teun Mathijssen'
const copied = ref(false)
const googleReviewUrl = 'https://www.google.com/maps/search/?api=1&query=Flagship%20Amsterdam'
const recommendations = [
  {
    category: 'Wander',
    name: 'The Jordaan',
    description: 'Quiet canals, small streets, and plenty of character.',
    url: 'https://www.google.com/maps/search/?api=1&query=Jordaan%20Amsterdam',
  },
  {
    category: 'Taste',
    name: 'Foodhallen',
    description: 'A relaxed stop with something delicious for everyone.',
    url: 'https://www.google.com/maps/search/?api=1&query=Foodhallen%20Amsterdam',
  },
  {
    category: 'Unwind',
    name: 'Westerpark',
    description: 'Green space, good terraces, and room to slow down.',
    url: 'https://www.google.com/maps/search/?api=1&query=Westerpark%20Amsterdam',
  },
]

const copyName = async () => {
  try {
    await navigator.clipboard.writeText(skipperName)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 1800)
  } catch {
    copied.value = false
  }
}

</script>

<template>
  <main class="min-h-screen overflow-hidden bg-[#f4f7f6] text-[#15302b]">
    <div class="pointer-events-none fixed inset-x-0 top-0 h-72 bg-gradient-to-b from-[#dbeae6] to-transparent"></div>

    <div class="relative mx-auto flex min-h-screen max-w-5xl flex-col px-5 py-6 sm:px-8 sm:py-10">
      <section class="grid items-center gap-10 pt-10 pb-16 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <div class="mb-6 flex items-center gap-4">
            <div class="relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-[1.6rem] border-4 border-white bg-[#c8dcd7] shadow-lg shadow-[#15302b]/10 sm:size-28">
              <img src="/face.jpg" :alt="`${skipperName}, your skipper`" class="size-full object-cover object-center" />
            </div>
            <div>
              <p class="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-[#d26b4a]">Your skipper</p>
              <button type="button" class="group flex items-center gap-2 text-left" :aria-label="`Copy ${skipperName}'s name`" @click="copyName">
                <span class="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{{ skipperName }}</span>
                <span class="grid size-8 place-items-center rounded-full border border-[#15302b]/10 bg-white text-[#51706a] transition group-hover:border-[#15302b]/25 group-hover:text-[#15302b]">
                  <svg v-if="!copied" viewBox="0 0 24 24" class="size-3.5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <rect x="8" y="8" width="11" height="11" rx="2" />
                    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                  </svg>
                  <svg v-else viewBox="0 0 24 24" class="size-3.5 text-[#d26b4a]" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                    <path d="m5 12 4 4L19 6" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
              </button>
              <p class="mt-1 text-sm text-[#51706a]">{{ copied ? 'Name copied!' : 'Tap name to copy' }}</p>
            </div>
          </div>

          <h1 class="max-w-md text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl">How was your time on the water?</h1>
          <p class="mt-4 max-w-md text-base leading-7 text-[#51706a]">
            Your feedback helps future guests feel at ease and helps me make every cruise a little better.
          </p>

        </div>

        <div class="rounded-[2rem] border border-white/80 bg-white p-6 text-center shadow-[0_24px_70px_-30px_rgba(21,48,43,0.3)] sm:p-10">
          <div class="mx-auto grid size-14 place-items-center rounded-full bg-[#e2efeb] text-[#2f6d61]">
            <svg viewBox="0 0 24 24" class="size-6" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M12 3v15m-4-9h8M6 18c1.2 1.3 3.2 2 6 2s4.8-.7 6-2M9 5h6" stroke-linecap="round" />
            </svg>
          </div>
          <p class="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#d26b4a]">Leave a review</p>
          <h2 class="mt-2 text-3xl font-semibold tracking-[-0.04em]">Enjoyed the voyage?</h2>
          <p class="mx-auto mt-3 max-w-sm leading-7 text-[#617b75]">
            Share your experience on Google and please mention
            <strong class="font-semibold text-[#15302b]">{{ skipperName }}</strong>
            by name so your feedback reaches me.
          </p>

          <button
            type="button"
            class="mx-auto mt-5 flex items-center gap-2 rounded-full border border-[#15302b]/10 bg-[#f4f7f6] px-4 py-2 text-sm font-semibold text-[#15302b] transition hover:border-[#15302b]/20 hover:bg-[#e9f0ee] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d26b4a]"
            :aria-label="`Copy ${skipperName}'s name for your review`"
            @click="copyName"
          >
            <svg v-if="!copied" viewBox="0 0 24 24" class="size-4 text-[#617b75]" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="8" y="8" width="11" height="11" rx="2" />
              <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
            </svg>
            <svg v-else viewBox="0 0 24 24" class="size-4 text-[#d26b4a]" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
              <path d="m5 12 4 4L19 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ copied ? 'Name copied!' : `Copy “${skipperName}”` }}
          </button>

          <a
            :href="googleReviewUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="group mt-5 flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-[#15302b] px-5 py-4 transition hover:bg-[#24453f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d26b4a]"
            :aria-label="`Leave a five star Google review mentioning ${skipperName}`"
          >
            <span class="flex gap-1 text-[#f3a36f]">
              <svg v-for="star in 5" :key="star" viewBox="0 0 24 24" class="size-6 transition group-hover:scale-110" fill="currentColor" aria-hidden="true">
                <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
              </svg>
            </span>
            <span class="text-sm font-semibold text-white">Review Teun on Google</span>
          </a>
          <p class="mt-3 text-xs text-[#839792]">Remember to include “{{ skipperName }}” in your review</p>
        </div>
      </section>

      <section class="border-t border-[#15302b]/10 py-10 sm:py-12" aria-labelledby="recommendations-title">
        <div class="mb-7 sm:flex sm:items-end sm:justify-between">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-[#d26b4a]">Stay a little longer</p>
            <h2 id="recommendations-title" class="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">Skipper's recommendations</h2>
          </div>
          <p class="mt-2 text-sm text-[#617b75] sm:mt-0">A few favorite stops after your cruise.</p>
        </div>

        <div class="grid gap-3 sm:grid-cols-3">
          <a
            v-for="recommendation in recommendations"
            :key="recommendation.name"
            :href="recommendation.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group rounded-2xl border border-[#15302b]/8 bg-white/65 p-5 transition hover:-translate-y-0.5 hover:border-[#15302b]/15 hover:bg-white hover:shadow-lg hover:shadow-[#15302b]/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d26b4a]"
          >
            <div class="flex items-start justify-between gap-4">
              <span class="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d26b4a]">{{ recommendation.category }}</span>
              <svg viewBox="0 0 24 24" class="size-4 text-[#8da09c] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#15302b]" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <h3 class="mt-5 text-lg font-semibold tracking-[-0.02em]">{{ recommendation.name }}</h3>
            <p class="mt-1 text-sm leading-6 text-[#617b75]">{{ recommendation.description }}</p>
          </a>
        </div>
      </section>
    </div>
  </main>
</template>
