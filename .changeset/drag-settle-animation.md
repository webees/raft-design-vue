---
"@webees/raft-design-vue": patch
---

Glide drag overlays into place with the upstream `DRAG_SETTLE` token: drops
settle onto the droppable rect, cancels return to the origin, the animation is
skipped under `prefers-reduced-motion`, and the internal keyboard drag path
shares the same finish logic. The lifted copy is frozen for the duration of the
glide, so callers that clear their active id on drop still animate real content.
Also drop the duplicate `MessageReference` export so the message-item barrel
exposes `MessageReferenceChip` only, matching upstream.
