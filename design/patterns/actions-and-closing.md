---
title: Actions and closing
summary: Which surface carries an action, a dialog, a banner or a toast; how each one closes; and why a screen has at most one pink button. The specifics are in each component's doc.
---

# Actions and closing

The more a surface asks of people, the more deliberately it closes. A dialog asks for a decision and stays until people give one. A banner stays beside the work and offers a way forward, never the screen's main one. A toast is gone in seconds, so its one action is a shortcut or an Undo. This page says which one to reach for; each component's doc owns its parts, layout and rules.

## When it applies

Every [Dialog](../components/dialog.md), [AlertDialog](../components/alert-dialog.md), [Banner](../components/banner.md) and [Toast](../components/toast.md) that carries an action, in every Raft product. Which surface carries a message with no action, and where an error goes by its scope, is in [Feedback](feedback.md); a [Drawer](../components/drawer.md), a `PanelNotice` ([Panel](../components/panel.md)) and the [NotificationCenter](../components/notification-center.md) follow their own docs.

## Choosing the surface

| The action | Use |
| --- | --- |
| People must finish something before they go on: a few fields, a choice | [Dialog](../components/dialog.md#when-to-use) |
| A confirmation | A [Dialog](../components/dialog.md#variants) at `size="sm"`, its confirm button colored by the consequence: retracting an assistant's message asks with Cancel and a red Retract message ([Identity and presence](../people-and-agents/identity-and-presence.md#sent-by-an-assistant)). [AlertDialog](../components/alert-dialog.md) only where the product lists it ([Raft Chat](../products/raft-chat/README.md#overlays)) |
| A next step for something people read before they act, inside a dialog or a form | [Banner](../components/banner.md#when-to-use) |
| A change in one row of a list that waits for people to pick one of one or two answers | A `sm` Banner directly under the row ([Banner](../components/banner.md#attached-to-a-list-row)) |
| A shortcut after something the person just did: View, Undo | [Toast](../components/toast.md) |

- Whether an action is confirmed, offered with Undo or done at once is decided by how far it reaches ([Feedback](feedback.md#confirming)); the words on the buttons are in [Writing](../content/writing.md#actions-and-their-dialogs).
- A toast's View is only a shortcut; its Undo is the way back ([Toast](../components/toast.md#rules)).

## How each one closes

| Surface | Closes by | Owned by |
| --- | --- | --- |
| Dialog | Cancel, the × in its header or Esc; a small dialog (`sm`, `md`, `lg`) also on a click on the scrim. A sheet on a phone has no Cancel and closes by × or Esc | [Behavior](../components/dialog.md#behavior), [On a phone](../components/dialog.md#on-a-phone) |
| AlertDialog | Cancel, Esc, and its × (`AlertDialogClose`) when it has one | [Anatomy](../components/alert-dialog.md#anatomy), [Behavior](../components/alert-dialog.md#behavior) |
| Banner | Dismiss before its button, or a × (`BannerClose`) when it has no button | [Anatomy](../components/banner.md#anatomy) |
| Toast | By itself after a few seconds; people can also swipe it away or press Esc | [Behavior](../components/toast.md#behavior) |

A dialog has at most two buttons. The one exception is an unsaved-changes prompt that can save straight from the prompt ([Dialog](../components/dialog.md#rules)).

## One pink button

Pink marks the one thing the screen exists for, so a screen has at most one pink button, and may have none ([Button](../components/button.md#which-color), [Color](../foundations/color.md#meanings-of-color)).

- While a dialog is open it is the screen: its commit button is the one pink button, unless the consequence colors it orange or red ([AlertDialog](../components/alert-dialog.md#variants)).
- A tour's coach mark is the one exception: its Next is pink while the page under it keeps its own pink button (the composer's send), because the tour lies over a live page instead of replacing it ([Coach marks](coach-marks.md#the-bubble)). It is planned with onboarding v3.
- A banner's button is never pink ([Banner](../components/banner.md#rules)). A toast's action is a bold text action, not a button, so it is never pink either ([Toast](../components/toast.md#rules)).

## Not decided yet

The questions still open on these surfaces are in [Open questions](../decisions/open-questions.md), each with the default to use until it is decided: a confirmation's ×, how long a dismissed new-version banner stays away, and the color and the component of an unsaved-changes prompt.

## Related

- [Feedback](feedback.md): which surface carries a message, and what is confirmed.
- [Choosing a component](../components/overview.md#overlays): which overlay fits which job.
- [Writing](../content/writing.md#actions-and-their-dialogs): the words on dialog buttons.
- [Forms and settings](forms.md): the buttons of a form in a dialog.
