export function addAppGlobalProperties (app) {
  if (!app) {
    console.error ('App is not provided')
  }

  app.config.globalProperties.$profileStore = useProfileStore()
  app.config.globalProperties.$mainStore = useMainStore()
  app.config.globalProperties.$landingPageStore = useLandingPageStore()
  app.config.globalProperties.$settingsStore = useSettingsStore()
  app.config.globalProperties.$searchStore = useSearchStore()
  app.config.globalProperties.$postsStore = usePostsStore()
  app.config.globalProperties.$friendsStore = useFriendsStore()
  app.config.globalProperties.$chatStore = useChatStore()
}
