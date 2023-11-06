
export const requireSvg = (): void => {
  if (typeof window === 'undefined') {
    const requireAll = (
      requireContext: __WebpackModuleApi.RequireContext
    ): void => {
      requireContext.keys().forEach(requireContext)
    }

    requireAll((require).context('@/assets/icons/', true, /\.svg$/))
  }
}
