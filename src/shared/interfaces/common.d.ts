declare namespace CommonInterfaces {
  interface IDialogWithoutChildren {
    title?: string
    open?: boolean
    centered?: boolean
    toBody?: boolean

    onSuccess?: () => void
    onCancel?: () => void
  }
}
