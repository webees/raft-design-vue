import type { KeyboardPlatform } from "../../lib/use-platform";

/**
 * A key, by name, case-insensitive. `mod` is Command on a Mac and Ctrl
 * elsewhere: write it for the platform's command key.
 */
export type KbdKeyName =
  | "mod"
  | "meta"
  | "ctrl"
  | "alt"
  | "option"
  | "shift"
  | "enter"
  | "backspace"
  | "delete"
  | "escape"
  | "tab"
  | "space"
  | "up"
  | "down"
  | "left"
  | "right"
  | (string & {});

export type KbdKeyIcon =
  | "chevron-up"
  | "option"
  | "arrow-big-up"
  | "command"
  | "corner-down-left"
  | "delete"
  | "arrow-up"
  | "arrow-down"
  | "arrow-left"
  | "arrow-right";

export type KbdResolvedKey = {
  name: string;
  icon?: KbdKeyIcon;
  text?: string;
  label: string;
};

type Drawing = { icon?: KbdKeyIcon; text?: string; label: string };
type Modifier = "control" | "option" | "shift" | "command" | "meta";
type Canonical =
  | "mod"
  | "meta"
  | "ctrl"
  | "alt"
  | "shift"
  | "enter"
  | "backspace"
  | "delete"
  | "escape"
  | "tab"
  | "space"
  | "up"
  | "down"
  | "left"
  | "right";

const ALIASES: Record<string, Canonical> = {
  mod: "mod",
  meta: "meta",
  cmd: "meta",
  command: "meta",
  ctrl: "ctrl",
  control: "ctrl",
  alt: "alt",
  opt: "alt",
  option: "alt",
  shift: "shift",
  enter: "enter",
  return: "enter",
  backspace: "backspace",
  delete: "delete",
  del: "delete",
  escape: "escape",
  esc: "escape",
  tab: "tab",
  space: "space",
  spacebar: "space",
  " ": "space",
  up: "up",
  arrowup: "up",
  down: "down",
  arrowdown: "down",
  left: "left",
  arrowleft: "left",
  right: "right",
  arrowright: "right",
};

function modifierOf(key: Canonical, platform: KeyboardPlatform): Modifier | undefined {
  switch (key) {
    case "mod":
      return platform === "mac" ? "command" : "control";
    case "meta":
      return platform === "mac" ? "command" : "meta";
    case "ctrl":
      return "control";
    case "alt":
      return "option";
    case "shift":
      return "shift";
    default:
      return undefined;
  }
}

const MODIFIER_ORDER: Record<KeyboardPlatform, Modifier[]> = {
  mac: ["control", "option", "shift", "command"],
  other: ["control", "option", "shift", "meta"],
};

const MODIFIERS: Record<KeyboardPlatform, Record<Modifier, Drawing>> = {
  mac: {
    control: { icon: "chevron-up", label: "Control" },
    option: { icon: "option", label: "Option" },
    shift: { icon: "arrow-big-up", label: "Shift" },
    command: { icon: "command", label: "Command" },
    meta: { icon: "command", label: "Command" },
  },
  other: {
    control: { text: "Ctrl", label: "Control" },
    option: { text: "Alt", label: "Alt" },
    shift: { text: "Shift", label: "Shift" },
    command: { text: "Ctrl", label: "Control" },
    meta: { text: "Win", label: "Windows" },
  },
};

const ARROWS = {
  up: { icon: "arrow-up", label: "Up Arrow" },
  down: { icon: "arrow-down", label: "Down Arrow" },
  left: { icon: "arrow-left", label: "Left Arrow" },
  right: { icon: "arrow-right", label: "Right Arrow" },
} satisfies Record<string, Drawing>;

type Named = Exclude<Canonical, "mod" | "meta" | "ctrl" | "alt" | "shift">;

const NAMED: Record<KeyboardPlatform, Record<Named, Drawing>> = {
  mac: {
    ...ARROWS,
    enter: { icon: "corner-down-left", label: "Return" },
    backspace: { icon: "delete", label: "Delete" },
    delete: { text: "Del", label: "Forward Delete" },
    escape: { text: "Esc", label: "Escape" },
    tab: { text: "Tab", label: "Tab" },
    space: { text: "Space", label: "Space" },
  },
  other: {
    ...ARROWS,
    enter: { text: "Enter", label: "Enter" },
    backspace: { text: "Backspace", label: "Backspace" },
    delete: { text: "Del", label: "Delete" },
    escape: { text: "Esc", label: "Escape" },
    tab: { text: "Tab", label: "Tab" },
    space: { text: "Space", label: "Space" },
  },
};

const CHARACTER_LABELS: Record<string, string> = {
  "/": "Slash",
  "\\": "Backslash",
  ".": "Period",
  ",": "Comma",
  ";": "Semicolon",
  ":": "Colon",
  "'": "Quote",
  '"': "Double Quote",
  "`": "Backtick",
  "-": "Minus",
  _: "Underscore",
  "=": "Equals",
  "+": "Plus",
  "[": "Left Bracket",
  "]": "Right Bracket",
  "{": "Left Brace",
  "}": "Right Brace",
  "(": "Left Parenthesis",
  ")": "Right Parenthesis",
  "?": "Question Mark",
  "!": "Exclamation Mark",
  "@": "At",
  "#": "Number Sign",
  $: "Dollar",
  "%": "Percent",
  "^": "Caret",
  "&": "Ampersand",
  "*": "Asterisk",
  "<": "Less Than",
  ">": "Greater Than",
  "~": "Tilde",
  "|": "Vertical Bar",
};

type Parsed =
  | { kind: "canonical"; key: Canonical; name: string }
  | { kind: "literal"; text: string; label: string; name: string };

function parse(name: string): Parsed | undefined {
  if (name === "") return undefined;
  const alias = ALIASES[name.toLowerCase()];
  if (alias) return { kind: "canonical", key: alias, name };
  if (/^.$/u.test(name)) {
    const text = /^[a-z]$/.test(name) ? name.toUpperCase() : name;
    return { kind: "literal", text, label: CHARACTER_LABELS[name] ?? text, name };
  }
  if (/^f\d{1,2}$/i.test(name)) {
    const text = name.toUpperCase();
    return { kind: "literal", text, label: text, name };
  }
  return { kind: "literal", text: name, label: name, name };
}

const warned = new Set<string>();

function warnOnce(message: string) {
  if (warned.has(message)) return;
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "production") return;
  warned.add(message);
  console.warn(message);
}

/**
 * The keys of a shortcut as a platform draws them: the modifiers first, in
 * the platform's order whatever order they were written in (each once), then
 * the other keys in the order written. An empty name is skipped.
 */
export function resolveKbdKeys(
  keys: readonly KbdKeyName[],
  platform: KeyboardPlatform,
): KbdResolvedKey[] {
  const order = MODIFIER_ORDER[platform];
  const modifiers = new Map<Modifier, string>();
  const rest: KbdResolvedKey[] = [];

  for (const written of keys) {
    const parsed = parse(written);
    if (!parsed) {
      warnOnce(`KbdShortcut: an empty key name in ${JSON.stringify(keys)} is skipped.`);
      continue;
    }
    if (parsed.kind === "literal") {
      rest.push({ name: parsed.name, text: parsed.text, label: parsed.label });
      continue;
    }
    const modifier = modifierOf(parsed.key, platform);
    if (!modifier) {
      rest.push({ name: parsed.name, ...NAMED[platform][parsed.key as Named] });
      continue;
    }
    const earlier = modifiers.get(modifier);
    if (earlier === undefined) modifiers.set(modifier, written);
    else {
      warnOnce(
        `KbdShortcut: "${earlier}" and "${written}" are the same key on ${
          platform === "mac" ? "a Mac" : "Windows and Linux"
        }, so ${JSON.stringify(keys)} draws it once.`,
      );
    }
  }

  const drawnModifiers = [...modifiers.entries()]
    .sort(([a], [b]) => order.indexOf(a) - order.indexOf(b))
    .map(([modifier, name]) => ({ name, ...MODIFIERS[platform][modifier] }));

  return [...drawnModifiers, ...rest];
}
