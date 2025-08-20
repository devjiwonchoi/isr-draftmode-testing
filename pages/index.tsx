import { staticGenerationAsyncStorage } from 'next/dist/client/components/static-generation-async-storage.external'
import { useRouter } from 'next/router'
import { GetStaticPropsContext } from 'next'

export default function Home() {
  const router = useRouter()
  const { query } = router
  const isDraftModeEnabled = query.draftMode === 'true'
  const token = query.token

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl font-mono text-sm">
        <a
          href="/api/draft/enable"
          className="inline-block mb-5 mr-5 border-2 border-blue-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl rounded-xl bg-gray-200 p-4"
        >
          Click to enable draft mode
        </a>
        <a
          href="/api/draft/disable"
          className="inline-block mb-5 border-2 border-blue-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl rounded-xl bg-gray-200 p-4"
        >
          Click to disable draft mode
        </a>
        <p className="mb-5 border border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl rounded-xl bg-gray-200 p-4">
          Draft mode: {isDraftModeEnabled ? 'ENABLED' : 'DISABLED'}
        </p>
        <p className="mb-5 border border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl rounded-xl bg-gray-200 p-4">
          Token: {`${token}`}
        </p>
        <p className="mb-5 border border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl rounded-xl bg-gray-200 p-4">
          {/* Rendered: {new Date().toISOString()} */}
        </p>
        <div className="mb-5 border border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl rounded-xl bg-gray-200 p-4">
          Static generation:
          <br />
          <pre>{JSON.stringify(_getStore(), null, 2)}</pre>
        </div>
      </div>
    </main>
  )
}

/**
 * Provides context for Next's rendering for debugging purposes. Filters out some properties that
 * aren't useful.
 */
function _getStore() {
  const rawSrc = staticGenerationAsyncStorage.getStore()

  if (!rawSrc) {
    return rawSrc
  }

  const {
    incrementalCache,
    // prerenderState,
    pendingRevalidates,
    dynamicUsageErr,
    fetchMetrics,
    ...store
  } = rawSrc

  return store
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  return {
    props: {
      draftMode: ctx.draftMode ?? false,
    },
  }
}
