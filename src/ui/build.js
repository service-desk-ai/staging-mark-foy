export async function showBuild() {
  try {
    const res = await fetch("version.json", { cache: "no-store" });
    if (!res.ok) return;
    const v = await res.json();
    const build = document.getElementById("build");
    if (build) build.textContent = `build ${v.sha.slice(0, 7)}`;
    if (v.env !== "production") {
      const ribbon = document.getElementById("env-ribbon");
      ribbon.textContent = v.env;
      ribbon.hidden = false;
    }
  } catch {}
}
