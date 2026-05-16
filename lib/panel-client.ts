const panelApiBases = [
  process.env.NEXT_PUBLIC_CMS_API_URL,
  "http://localhost/PhpPanel/public/api",
  "http://127.0.0.1:8000/api",
].filter((base): base is string => Boolean(base));

export async function postPanelApi(path: string, payload: unknown): Promise<{ ok: boolean; message: string }> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  for (const base of panelApiBases) {
    try {
      const response = await fetch(`${base.replace(/\/$/, "")}${normalizedPath}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data?.error === false) {
        return { ok: true, message: data.message || "Saved" };
      }

      if (response.status === 422) {
        return { ok: false, message: data?.message || "Please check the submitted fields." };
      }
    } catch {
      // Try the next panel base URL.
    }
  }

  return { ok: false, message: "Unable to reach the admin panel API right now." };
}
