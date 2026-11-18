export type DragPlace = {
  place: string;
  position?: number;
  count?: number;
};

export type DragNamed = { name: string };

export type DragMessages = {
  instructions: string;
  pickedUp: (details: DragNamed & Partial<DragPlace>) => string;
  over: (details: DragNamed & DragPlace) => string;
  notOver: (details: DragNamed) => string;
  refused: (details: DragNamed & { place: string; reason: string }) => string;
  dropped: (details: DragNamed & DragPlace) => string;
  cancelled: (details: DragNamed & Partial<DragPlace>) => string;
  refusedDrop: (details: DragNamed & Partial<DragPlace> & { reason: string }) => string;
};

function at({ place, position, count }: Partial<DragPlace>) {
  const where =
    position == null
      ? ""
      : count == null
        ? `position ${position}`
        : `position ${position} of ${count}`;
  if (!place) return where;
  return where ? `${place}, ${where}` : place;
}

function sentence(text: string) {
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

export const DEFAULT_DRAG_MESSAGES: DragMessages = {
  instructions:
    "To pick up an item, press Space. Use the arrow keys to move it, Space to drop it, Escape to cancel.",
  pickedUp: ({ name, ...place }) =>
    at(place) ? `Picked up ${name}. Over ${at(place)}.` : `Picked up ${name}.`,
  over: ({ name: _name, ...place }) => `Over ${at(place)}.`,
  notOver: () => "Not over a place. Dropping now cancels.",
  refused: ({ name, place, reason }) => `${name} can't go to ${place}. ${reason}`,
  dropped: ({ name, ...place }) => `Dropped ${name} in ${at(place)}.`,
  cancelled: ({ name, ...place }) =>
    at(place) ? `Cancelled. ${name} is back in ${at(place)}.` : `Cancelled. ${name} is back.`,
  refusedDrop: ({ reason, ...rest }) =>
    `${sentence(reason)} ${DEFAULT_DRAG_MESSAGES.cancelled(rest)}`,
};

export function dragMessages(messages?: Partial<DragMessages>): DragMessages {
  return messages ? { ...DEFAULT_DRAG_MESSAGES, ...messages } : DEFAULT_DRAG_MESSAGES;
}

export type DragAnnouncementSource = {
  name: (activeId: string | number) => string;
  place?: (activeId: string | number, overId: string | number | null) => DragPlace | null;
  refusal?: (
    activeId: string | number,
    overId: string | number,
  ) => { place: string; reason: string } | null;
};

export type DragAnnouncements = {
  onDragStart: (event: { activeId: string | number }) => string | undefined;
  onDragOver: (event: {
    activeId: string | number;
    overId: string | number | null;
  }) => string | undefined;
  onDragEnd: (event: {
    activeId: string | number;
    overId: string | number | null;
  }) => string | undefined;
  onDragCancel: (event: { activeId: string | number }) => string | undefined;
};

export function createDragAnnouncements(
  source: DragAnnouncementSource,
  messages?: Partial<DragMessages>,
): DragAnnouncements {
  const say = dragMessages(messages);
  let lastPlace: string | null = null;
  const placeKey = (place: DragPlace | null | undefined) => (place ? JSON.stringify(place) : null);
  const describeOver = (
    name: string,
    activeId: string | number,
    overId: string | number | null,
  ) => {
    if (overId == null) {
      lastPlace = null;
      return say.notOver({ name });
    }
    const refused = source.refusal?.(activeId, overId);
    if (refused) {
      lastPlace = null;
      return say.refused({ name, ...refused });
    }
    if (!source.place) return undefined;
    const place = source.place(activeId, overId);
    if (!place) {
      lastPlace = null;
      return say.notOver({ name });
    }
    const key = placeKey(place);
    if (key === lastPlace) return undefined;
    lastPlace = key;
    return say.over({ name, ...place });
  };
  return {
    onDragStart: ({ activeId }) => {
      const name = source.name(activeId);
      if (!name) return undefined;
      const home = source.place?.(activeId, null);
      lastPlace = placeKey(home);
      return say.pickedUp({ name, ...home });
    },
    onDragOver: ({ activeId, overId }) => {
      const name = source.name(activeId);
      return name ? describeOver(name, activeId, overId) : undefined;
    },
    onDragEnd: ({ activeId, overId }) => {
      const name = source.name(activeId);
      if (!name) return undefined;
      const refused = overId == null ? null : source.refusal?.(activeId, overId);
      if (overId != null && !refused && !source.place) return undefined;
      const place = overId == null || refused ? null : source.place?.(activeId, overId);
      if (place) return say.dropped({ name, ...place });
      const home = source.place?.(activeId, null);
      return refused
        ? say.refusedDrop({ name, reason: refused.reason, ...home })
        : say.cancelled({ name, ...home });
    },
    onDragCancel: ({ activeId }) => {
      const name = source.name(activeId);
      return name ? say.cancelled({ name, ...source.place?.(activeId, null) }) : undefined;
    },
  };
}

export const SILENT_DRAG_ANNOUNCEMENTS: DragAnnouncements = {
  onDragStart: () => undefined,
  onDragOver: () => undefined,
  onDragEnd: () => undefined,
  onDragCancel: () => undefined,
};

export function dragInstructions(messages?: Partial<DragMessages>) {
  return { draggable: dragMessages(messages).instructions };
}
