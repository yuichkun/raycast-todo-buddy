/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Language - Language */
  "language": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `create-task` command */
  export type CreateTask = ExtensionPreferences & {}
  /** Preferences accessible in the `list-tasks` command */
  export type ListTasks = ExtensionPreferences & {}
  /** Preferences accessible in the `create-tag` command */
  export type CreateTag = ExtensionPreferences & {}
  /** Preferences accessible in the `list-tags` command */
  export type ListTags = ExtensionPreferences & {}
  /** Preferences accessible in the `export-data` command */
  export type ExportData = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `create-task` command */
  export type CreateTask = {}
  /** Arguments passed to the `list-tasks` command */
  export type ListTasks = {}
  /** Arguments passed to the `create-tag` command */
  export type CreateTag = {}
  /** Arguments passed to the `list-tags` command */
  export type ListTags = {}
  /** Arguments passed to the `export-data` command */
  export type ExportData = {}
}

