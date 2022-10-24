export function requireSvg(): void {
    const requireAll = (requireContext: any) => {
        requireContext.keys().forEach(requireContext)
    }

    requireAll((require as any).context('@/app/assets/icons/', true, /\.svg$/))
}
