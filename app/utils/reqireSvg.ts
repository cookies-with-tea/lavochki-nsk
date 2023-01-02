export const requireSvg = (): void => {
  const requireAll = (
    requireContext: __WebpackModuleApi.RequireContext
  ): void => {
    requireContext.keys().forEach(requireContext)
  }

  requireAll((require).context('@/app/assets/icons/', true, /\.svg$/))
}
