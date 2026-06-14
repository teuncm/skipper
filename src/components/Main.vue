<script setup>
import { nextTick, onBeforeUnmount, ref } from 'vue'

const skipperName = 'Teun M'
const faceUrl = `${import.meta.env.BASE_URL}face.webp`
const copied = ref(false)
const showManualCopy = ref(false)
const manualCopyInput = ref(null)
const showReviewThanks = ref(false)
const showReviewMessage = ref(false)
const reviewPlatform = ref('google')
const celebrationRun = ref(0)
let waitingForReviewReturn = false
let leftForReview = false
let thankYouTimer
let thankYouMessageTimer
let returnCheckTimer
const googleReviewUrl = 'https://www.google.com/maps/search/?api=1&query=Flagship%20Amsterdam%20Leliegracht'
const tripadvisorReviewUrl = 'https://www.tripadvisor.com/UserReviewEdit-g188590-d13998700-Flagship_Amsterdam-Amsterdam_North_Holland_Province.html'
const recommendations = [
  {
    category: 'Bike',
    name: 'Explore by bike',
    description: 'See more of Amsterdam with a guided Flagship bike tour.',
    url: 'https://fareharbor.com/embeds/book/flagshipbiketoursamsterdam/items/?ref=Teun%20Mathijss&sheet-uuid=4b2d21d1-22ed-4015-be94-bf383472eee5&asn=flagshipemployees-eur&asn-ref=Teun%20Mathijss&flow=1255628&full-items=yes',
    activity: true,
    featured: true,
  },
  {
    category: 'Wander',
    name: 'The Jordaan',
    description: 'Quiet canals, small streets, and plenty of character.',
    url: 'https://www.google.com/maps/search/?api=1&query=Jordaan%20Amsterdam',
  },
  {
    category: 'Unwind',
    name: 'Westerpark',
    description: 'Green space, good terraces, and room to slow down.',
    url: 'https://www.google.com/maps/search/?api=1&query=Westerpark%20Amsterdam',
  },
  {
    category: 'Explore',
    name: 'Albert Cuyp Market',
    description: 'A lively local market for snacks, souvenirs, and people-watching.',
    url: 'https://www.google.com/maps/search/?api=1&query=Albert%20Cuyp%20Market%20Amsterdam',
  },
  {
    category: 'Drink',
    name: "In 't Aepjen",
    description: 'A cozy café inside one of only two fully wooden buildings in the historic center.',
    url: 'https://www.google.com/maps/search/?api=1&query=In%20%27t%20Aepjen%20Amsterdam',
  },
  {
    category: 'Ride',
    name: 'Free ferry to Noord',
    description: 'Hop aboard behind Central Station for a free trip across the IJ.',
    url: 'https://www.google.com/maps/search/?api=1&query=Amsterdam%20Central%20Station%20Ferry',
  },
  {
    category: 'Discover',
    name: 'Beurspassage',
    description: "Home to Amsterdam Oersoep, a dazzling mosaic artwork celebrating the city's bond with water.",
    url: 'https://www.google.com/maps/search/?api=1&query=Beurspassage%20Amsterdam',
  },
]

const copyWithSelection = (text) => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()

  const copied = document.execCommand('copy')
  textarea.remove()

  return copied
}

const copyName = async () => {
  if (copied.value) return

  showManualCopy.value = false

  try {
    if (!navigator.clipboard?.writeText) {
      copied.value = copyWithSelection(skipperName)
    } else {
      try {
        await navigator.clipboard.writeText(skipperName)
        copied.value = true
      } catch {
        copied.value = copyWithSelection(skipperName)
      }
    }

    if (copied.value) return
  } catch {
    copied.value = false
  }

  showManualCopy.value = true
  await nextTick()
  manualCopyInput.value?.select()
}

const completeReviewReturn = () => {
  if (!waitingForReviewReturn || !leftForReview || document.visibilityState === 'hidden' || !document.hasFocus()) return

  waitingForReviewReturn = false
  leftForReview = false
  celebrationRun.value += 1
  showReviewThanks.value = true
  showReviewMessage.value = true
  clearTimeout(thankYouTimer)
  clearTimeout(thankYouMessageTimer)
  thankYouMessageTimer = setTimeout(() => {
    showReviewMessage.value = false
  }, 3500)
  thankYouTimer = setTimeout(() => {
    showReviewThanks.value = false
  }, 6500)
  window.removeEventListener('focus', showThankYou)
  window.removeEventListener('blur', trackReviewBlur)
  document.removeEventListener('visibilitychange', trackReviewVisibility)
}

const showThankYou = () => {
  clearTimeout(returnCheckTimer)
  returnCheckTimer = setTimeout(completeReviewReturn, 100)
}

const trackReviewVisibility = () => {
  if (document.visibilityState === 'hidden') {
    leftForReview = true
  } else if (leftForReview) {
    showThankYou()
  }
}

const trackReviewBlur = () => {
  leftForReview = true
}

const startReview = (platform) => {
  clearTimeout(returnCheckTimer)
  window.removeEventListener('focus', showThankYou)
  window.removeEventListener('blur', trackReviewBlur)
  document.removeEventListener('visibilitychange', trackReviewVisibility)

  reviewPlatform.value = platform
  waitingForReviewReturn = true
  leftForReview = false
  window.addEventListener('focus', showThankYou)
  window.addEventListener('blur', trackReviewBlur, { once: true })
  document.addEventListener('visibilitychange', trackReviewVisibility)
}

onBeforeUnmount(() => {
  clearTimeout(thankYouTimer)
  clearTimeout(thankYouMessageTimer)
  clearTimeout(returnCheckTimer)
  window.removeEventListener('focus', showThankYou)
  window.removeEventListener('blur', trackReviewBlur)
  document.removeEventListener('visibilitychange', trackReviewVisibility)
})

</script>

<template>
  <main class="min-h-screen overflow-hidden bg-[#f4f7f6] text-[#15302b]">
    <div class="pointer-events-none fixed inset-x-0 top-0 h-72 bg-gradient-to-b from-[#dbeae6] to-transparent"></div>

    <Transition name="review-thanks">
      <div v-if="showReviewThanks" :key="celebrationRun" class="pointer-events-none fixed inset-0 z-50" role="status">
        <div
          class="review-celebration-rain absolute inset-0 overflow-hidden"
          :class="reviewPlatform === 'tripadvisor' ? 'text-[#34e0a1]' : 'text-[#f4c95d]'"
          aria-hidden="true"
        >
          <span v-for="item in 32" :key="item">{{ reviewPlatform === 'tripadvisor' ? '●' : '★' }}</span>
        </div>
        <Transition name="review-thanks">
          <div v-if="showReviewMessage" class="absolute inset-x-4 top-4 mx-auto max-w-sm overflow-hidden rounded-2xl border border-white/90 bg-[#fffaf7] px-5 py-4 text-center text-[#15302b] shadow-2xl shadow-[#15302b]/20">
            <div class="relative">
              <svg
                viewBox="0 0 24 24"
                class="review-thanks-check mx-auto size-8"
                :class="reviewPlatform === 'tripadvisor' ? 'text-[#34e0a1]' : 'text-[#fbbc04]'"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="m8 12 2.5 2.5L16.5 9" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="mt-1 text-lg font-bold">Thank you!</p>
              <p class="mt-0.5 text-sm text-[#617b75]">Your review means a lot to me.</p>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <div class="relative mx-auto flex min-h-screen max-w-5xl flex-col px-5 py-2 sm:px-8 sm:py-3">
      <section class="grid items-center gap-9 py-4 md:grid-cols-[0.9fr_1.1fr] md:gap-10 md:py-5">
        <div>
          <div class="flex items-center gap-4">
            <div class="relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-[1.6rem] border-4 border-white bg-[#c8dcd7] shadow-lg shadow-[#15302b]/10 sm:size-28">
              <img :src="faceUrl" :alt="`${skipperName}, your skipper`" class="face-photo size-full object-cover object-center" />
            </div>
            <div class="min-w-0 flex items-center gap-2">
              <div class="grid size-8 shrink-0 place-items-center rounded-full bg-[#fff0e8] text-[#e7682f]">
                <svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path d="M12 3v15m-4-9h8M6 18c1.2 1.3 3.2 2 6 2s4.8-.7 6-2M9 5h6" stroke-linecap="round" />
                </svg>
              </div>
              <div>
              <p class="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-[#d26b4a]">Your skipper</p>
              <p class="text-2xl font-normal tracking-[-0.04em] min-[380px]:text-3xl sm:text-4xl">{{ skipperName }}</p>
              </div>
            </div>
          </div>

        </div>

        <div class="rounded-[2rem] border border-white/80 bg-white p-4 text-center shadow-[0_24px_70px_-30px_rgba(21,48,43,0.3)] sm:p-5">
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-[#d26b4a]">Leave a review</p>
          <h2 class="mt-1 text-2xl font-bold tracking-[-0.03em]">Enjoyed your voyage?</h2>
          <p class="mx-auto mt-1.5 max-w-sm text-sm leading-5 text-[#617b75]">
            Share your experience and mention me so your feedback reaches me. Thank you 😊
          </p>

          <div class="mt-3 grid grid-cols-[2rem_1fr] items-center gap-x-3 gap-y-4">
            <span class="grid size-8 place-items-center rounded-full border border-[#d26b4a]/20 bg-[#fff0e8] text-xs font-bold text-[#d26b4a]" aria-hidden="true">1</span>
            <button
              type="button"
              :disabled="copied"
              class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[#15302b]/10 bg-[#f4f7f6] px-4 py-3 text-sm font-semibold text-[#15302b] transition hover:border-[#15302b]/20 hover:bg-[#e9f0ee] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d26b4a] disabled:cursor-default disabled:border-[#2f6d61]/15 disabled:bg-[#e2efeb] disabled:text-[#2f6d61]"
              :aria-label="`Step 1: Copy ${skipperName}'s name for your review`"
              @click="copyName"
            >
              <svg v-if="!copied" viewBox="0 0 24 24" class="size-4 text-[#617b75]" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="8" y="8" width="11" height="11" rx="2" />
                <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
              </svg>
              <svg v-else viewBox="0 0 24 24" class="size-4 text-[#d26b4a]" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                <path d="m5 12 4 4L19 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ copied ? 'Name copied!' : `Click to copy my name` }}
            </button>
            <div
              v-if="showManualCopy"
              class="col-start-2 rounded-2xl border border-[#d26b4a]/25 bg-[#fff4ed] p-3 text-left"
              role="status"
            >
              <label for="manual-copy-name" class="block text-xs font-bold text-[#9a4e36]">Press and hold the selected name to copy it</label>
              <input
                id="manual-copy-name"
                ref="manualCopyInput"
                :value="skipperName"
                readonly
                class="mt-2 w-full rounded-xl border border-[#d26b4a]/20 bg-white px-3 py-2 text-base text-[#15302b] outline-none selection:bg-[#d26b4a]/25"
                @focus="$event.target.select()"
              />
            </div>

            <span class="grid size-8 place-items-center rounded-full border border-[#d26b4a]/20 bg-[#fff0e8] text-xs font-bold text-[#d26b4a]" aria-hidden="true">2</span>
            <div class="grid items-center gap-2 sm:grid-cols-2">
              <a
                :href="googleReviewUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative flex w-full flex-col items-center justify-center gap-1.5 rounded-2xl bg-[#3f4d61] px-4 py-3.5 transition hover:bg-[#334052] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d26b4a]"
                :aria-label="`Step 2: Leave a five star Google review mentioning ${skipperName}`"
                @click="startReview('google')"
              >
                <span class="rating-glow rating-glow-google flex gap-1 text-[#fbbc04] drop-shadow-[0_2px_4px_rgba(251,188,4,0.35)] transition duration-200 group-hover:drop-shadow-[0_0_10px_rgba(251,188,4,0.8)]">
                  <svg v-for="star in 5" :key="star" viewBox="0 0 24 24" class="size-5 transition duration-200 group-hover:-translate-y-0.5 group-hover:scale-110" fill="currentColor" aria-hidden="true">
                    <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
                  </svg>
                </span>
                <span class="text-sm font-semibold text-white">Google review</span>
                <svg viewBox="0 0 24 24" class="absolute right-3 top-3 size-4 text-white/55 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </a>
              <a
                :href="tripadvisorReviewUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative flex w-full flex-col items-center justify-center gap-1.5 rounded-2xl bg-[#24584b] px-4 py-3.5 transition hover:bg-[#1c493e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34e0a1]"
                :aria-label="`Step 2: Find Flagship Amsterdam on TripAdvisor and leave a review mentioning ${skipperName}`"
                @click="startReview('tripadvisor')"
              >
                <span class="rating-glow rating-glow-tripadvisor flex gap-1 text-[#34e0a1] drop-shadow-[0_2px_4px_rgba(52,224,161,0.35)] transition duration-200 group-hover:drop-shadow-[0_0_10px_rgba(52,224,161,0.8)]">
                  <svg v-for="star in 5" :key="star" viewBox="0 0 24 24" class="size-5 transition duration-200 group-hover:-translate-y-0.5 group-hover:scale-110" fill="currentColor" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </span>
                <span class="text-sm font-semibold text-white">TripAdvisor review</span>
                <svg viewBox="0 0 24 24" class="absolute right-3 top-3 size-4 text-white/55 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="pt-6 pb-4" aria-labelledby="recommendations-title">
        <div class="mb-3 sm:flex sm:items-end sm:justify-between">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-[#d26b4a]">Next: stay a little longer</p>
            <h2 id="recommendations-title" class="mt-1 text-2xl font-normal tracking-[-0.03em]">Skipper's recommendations</h2>
          </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <a
            v-for="recommendation in recommendations"
            :key="recommendation.name"
            :href="recommendation.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d26b4a]"
            :class="recommendation.featured
              ? 'border-[#d26b4a]/35 bg-[#fff4ed] shadow-sm shadow-[#d26b4a]/10 hover:border-[#d26b4a]/55 hover:shadow-[#d26b4a]/15'
              : 'border-[#15302b]/8 bg-white/65 hover:border-[#15302b]/15 hover:shadow-[#15302b]/5'"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d26b4a]">{{ recommendation.category }}</span>
                <span v-if="recommendation.activity" class="flex items-center gap-1 rounded-full bg-[#d26b4a] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white">
                  <svg viewBox="0 0 24 24" class="size-2.5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <circle cx="6" cy="17" r="3.5" />
                    <circle cx="18" cy="17" r="3.5" />
                    <path d="m6 17 4-8h4l4 8M9 12h7M12 9l-2-3h3" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  Real Amsterdam Experience
                </span>
              </div>
              <svg viewBox="0 0 24 24" class="size-4 text-[#8da09c] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#15302b]" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <h3 class="mt-2 text-base font-normal tracking-[-0.02em]">{{ recommendation.name }}</h3>
            <p class="mt-1 text-sm leading-5 text-[#617b75]">{{ recommendation.description }}</p>
          </a>
        </div>
      </section>

    </div>
  </main>
</template>
