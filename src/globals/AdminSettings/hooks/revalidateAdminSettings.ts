import { revalidatePath } from 'next/cache'
import type { GlobalAfterChangeHook } from 'payload'

export const revalidateAdminSettings: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating admin settings`)
    // Revalidate the admin dashboard
    revalidatePath('/admin', 'layout')
  }

  return doc
}
