import type { ReviewFormValues } from "@/components/shared/AddReviewModal"

const LOG_PREFIX = "[Pitambari PatronReview]"

/**
 * POST review to Google Apps Script Web App (`doPost` expects URL-encoded fields:
 * `rating`, `review`, `name`, `description`).
 */
export async function submitPatronReviewToSheet(
  endpoint: string,
  values: ReviewFormValues
): Promise<void> {
  console.group(`${LOG_PREFIX} submit`)

  console.log(`${LOG_PREFIX} config`, {
    endpoint,
    envHasReviewUrl: Boolean(import.meta.env.VITE_REVIEW_FORM_URL?.trim()),
    mode: import.meta.env.MODE,
    dev: import.meta.env.DEV,
  })

  const payload = {
    rating: String(values.rating),
    review: values.quote.trim(),
    name: values.name.trim(),
    description: values.title.trim(),
  }

  console.log(`${LOG_PREFIX} mapped payload (for sheet)`, payload)
  console.log(`${LOG_PREFIX} raw form values`, { ...values })

  const body = new URLSearchParams()
  body.set("rating", payload.rating)
  body.set("review", payload.review)
  body.set("name", payload.name)
  body.set("description", payload.description)

  const bodyString = body.toString()
  console.log(`${LOG_PREFIX} request`, {
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
    bodyKeys: ["rating", "review", "name", "description"],
    bodyByteLength: new TextEncoder().encode(bodyString).length,
    bodyForDebug: bodyString,
  })

  const requestInit: RequestInit = {
    method: "POST",
    mode: "cors",
    redirect: "follow",
    headers: {
      Accept: "application/json, text/plain, */*",
    },
    body,
  }

  console.log(`${LOG_PREFIX} fetch init`, {
    ...requestInit,
    body: "[URLSearchParams]",
  })

  try {
    const t0 = performance.now()
    const res = await fetch(endpoint, requestInit)
    const t1 = performance.now()

    console.log(`${LOG_PREFIX} response meta`, {
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
      type: res.type,
      url: res.url,
      redirected: res.redirected,
      durationMs: Math.round(t1 - t0),
    })

    const responseHeaders: Record<string, string> = {}
    res.headers.forEach((v, k) => {
      responseHeaders[k] = v
    })
    console.log(`${LOG_PREFIX} response headers`, responseHeaders)

    const rawText = await res.text()
    console.log(`${LOG_PREFIX} response body (raw text)`, rawText)

    let data: { ok?: boolean; error?: string } = {}
    try {
      data = rawText
        ? (JSON.parse(rawText) as { ok?: boolean; error?: string })
        : {}
      console.log(`${LOG_PREFIX} response body (parsed JSON)`, data)
    } catch (parseErr) {
      console.warn(`${LOG_PREFIX} JSON parse failed`, parseErr)
    }

    if (!res.ok || data.ok === false) {
      const errMsg =
        data.error ||
        `${res.status} ${res.statusText}`.trim() ||
        "Could not submit your review."
      console.error(`${LOG_PREFIX} server indicated failure`, { errMsg, data })
      throw new globalThis.Error(errMsg)
    }

    console.log(`${LOG_PREFIX} success — sheet append should be done`)
  } catch (e: unknown) {
    console.error(`${LOG_PREFIX} submit error`, {
      name: e instanceof globalThis.Error ? e.name : typeof e,
      message: e instanceof globalThis.Error ? e.message : String(e),
      stack: e instanceof globalThis.Error ? e.stack : undefined,
    })
    console.warn(
      `${LOG_PREFIX} hint: If you see a CORS/network error, check Apps Script deployment (Web app, access for your audience) and DevTools → Network.`
    )
    throw e
  } finally {
    console.groupEnd()
  }
}
