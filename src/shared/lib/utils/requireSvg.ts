export const requireSvg = (): void => {
  if (typeof window === 'undefined') {
    const requireAll = (
      // @ts-ignore
      requireContext: __WebpackModuleApi.RequireContext
    ): void => {
      requireContext.keys().forEach(requireContext)
    }

    // @ts-ignore
    requireAll(require.context('@/assets/icons/', true, /\.svg$/))
  }
}
