/* SPDX-License-Identifier: GPL-3.0-or-later */
/* Copyright © 2026 kittycatgit */
/* Adaptations copyright © 2026 laxan94 */

import { ContentRating, SourceIntents, type ExtensionInfo } from "@paperback/types";

export default {
  name: "MangaHub",
  description: "MangaHub for Paperback 0.9 and LeafReader; maintained independently from the 0.8 extension.",
  version: "1.0.0",
  icon: "icon.png",
  language: "en",
  contentRating: ContentRating.ADULT,
  badges: [],
  developers: [
    {
      name: "laxan94",
      website: "https://github.com/laxan94/Paperback-MangaHub-0.8-pages",
      github: "https://github.com/laxan94",
    },
  ],
  capabilities: [
    SourceIntents.CHAPTER_PROVIDING,
    SourceIntents.SEARCH_RESULT_PROVIDING,
    SourceIntents.DISCOVER_SECTION_PROVIDING,
    SourceIntents.CLOUDFLARE_BYPASS_PROVIDING,
  ],
} satisfies ExtensionInfo;
