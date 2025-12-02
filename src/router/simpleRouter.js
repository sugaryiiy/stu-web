import { computed, h, inject, shallowRef } from 'vue'

const ROUTER_KEY = Symbol('router')

export function createWebHistory(base = '') {
  const navigate = (to, replace = false) => {
    const url = base + to
    if (replace) {
      window.history.replaceState({}, '', url)
    } else {
      window.history.pushState({}, '', url)
    }
  }

  const listen = (cb) => {
    window.addEventListener('popstate', cb)
    return () => window.removeEventListener('popstate', cb)
  }

  return { base, navigate, listen }
}

export function createRouter({ history, routes = [] }) {
  const currentRoute = shallowRef(resolveLocation(window.location.pathname || '/', routes))
  const beforeGuards = []

  history.listen(() => {
    currentRoute.value = resolveLocation(window.location.pathname || '/', routes)
  })

  const resolveRedirect = (target) => {
    if (typeof target === 'string') return target
    if (target && typeof target === 'object') {
      return target.path || '/'
    }
    return null
  }

  const runGuards = async (to, from) => {
    for (const guard of beforeGuards) {
      let decided = null
      const next = (val) => {
        decided = val === undefined ? true : val
      }

      const result = await guard(to, from, next)
      const outcome = decided === null ? result : decided

      if (outcome === false) return false
      if (typeof outcome === 'string' || (outcome && typeof outcome === 'object')) {
        return outcome
      }
    }
    return true
  }

  const navigateTo = async (target, replace = false) => {
    const to = resolveLocation(target, routes)
    const from = currentRoute.value

    const guardResult = await runGuards(to, from)
    if (guardResult === false) return from

    const redirect = resolveRedirect(guardResult)
    if (redirect) {
      return navigateTo(redirect, replace)
    }

    currentRoute.value = to
    history.navigate(to.path, replace)
    return to
  }

  const router = {
    currentRoute: computed(() => currentRoute.value),
    push: (target) => navigateTo(target, false),
    replace: (target) => navigateTo(target, true),
    beforeEach: (fn) => beforeGuards.push(fn),
    install(app) {
      navigateTo(currentRoute.value.path, true)
      app.provide(ROUTER_KEY, router)
      app.config.globalProperties.$router = router
      app.config.globalProperties.$route = currentRoute
      app.component('RouterView', RouterView)
      app.component('RouterLink', RouterLink)
    }
  }

  return router
}

export function useRouter() {
  return inject(ROUTER_KEY)
}

export function useRoute() {
  const router = inject(ROUTER_KEY)
  return router?.currentRoute ?? shallowRef({})
}

function resolveLocation(target, routes) {
  const path = typeof target === 'string' ? target : target?.path ?? '/'
  const record =
    routes.find((item) => item.path === path) ||
    (typeof target === 'object' && target?.name
      ? routes.find((item) => item.name === target.name)
      : undefined)

  return {
    path,
    name: record?.name,
    component: record?.component,
    meta: record?.meta ?? {},
    redirect: record?.redirect
  }
}

const RouterView = {
  name: 'RouterView',
  setup() {
    const route = useRoute()

    return () => {
      const matched = route.value
      const component = matched?.component
      return component ? h(component) : null
    }
  }
}

const RouterLink = {
  name: 'RouterLink',
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    custom: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const router = useRouter()

    const navigate = (event) => {
      event?.preventDefault?.()
      router?.push(props.to)
    }

    return () => {
      const slotContent = slots.default?.({ navigate, href: props.to })
      if (props.custom) return slotContent

      return h(
        'a',
        {
          href: typeof props.to === 'string' ? props.to : props.to?.path ?? '/',
          onClick: navigate
        },
        slotContent || String(props.to)
      )
    }
  }
}
