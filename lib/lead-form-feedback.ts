const pendingFocus = new WeakMap<HTMLFormElement, number>();

export function focusFirstInvalidField(form: HTMLFormElement) {
  const previousFrame = pendingFocus.get(form);
  if (previousFrame !== undefined) cancelAnimationFrame(previousFrame);

  // React must commit inline errors before we look for the first invalid control.
  const frame = requestAnimationFrame(() => {
    pendingFocus.delete(form);
    if (!form.isConnected) return;
    const field = Array.from(
      form.querySelectorAll<HTMLElement>(
        '[aria-invalid="true"], [data-invalid-field="true"]',
      ),
    ).find(
      (element) =>
        element.getClientRects().length > 0 &&
        !element.closest("[hidden], [inert]"),
    );
    if (!field) return;
    const target = field.closest<HTMLElement>("label") || field;
    field.focus({ preventScroll: true });
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "center",
    });
  });
  pendingFocus.set(form, frame);
}
