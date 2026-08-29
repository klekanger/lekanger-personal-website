import { CogIcon } from "@sanity/icons/Cog";
import { ComposeIcon } from "@sanity/icons/Compose";
import { HomeIcon } from "@sanity/icons/Home";
import { ProjectsIcon } from "@sanity/icons/Projects";
import type { StructureBuilder, StructureResolver } from "sanity/structure";

const API_VERSION = "2026-07-28";

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title("Innhold på nettsiden")
    .items([
      S.listItem()
        .title("Blogginnlegg")
        .icon(ComposeIcon)
        .schemaType("blog")
        .child(
          S.documentList()
            .apiVersion(API_VERSION)
            .title("Blogginnlegg")
            .filter('_type == "blog"'),
        ),

      S.listItem()
        .title("Showcase")
        .icon(ProjectsIcon)
        .schemaType("blog")
        .child(
          S.documentList()
            .apiVersion(API_VERSION)
            .title("Alle prosjekter")

            .filter('_type == "showcase"'),
        ),

      S.divider(),

      // Singletons

      S.listItem()
        .title("Forside - hero")
        .icon(HomeIcon)
        .child(S.document().schemaType("heroText").documentId("heroText")),

      S.listItem()
        .title("Forside - om meg")
        .icon(HomeIcon)
        .child(S.document().schemaType("about").documentId("about")),

      S.listItem()
        .title("Nettside-innstillinger")
        .icon(CogIcon)
        .child(S.document().schemaType("settings").documentId("settings")),

      // Legacy
      S.divider(),
      S.listItem()
        .title("LEGACY prosjekter")
        .schemaType("project")
        .child(
          S.documentList()
            .apiVersion(API_VERSION)
            .title("Prosjekter")
            .filter('_type == "project"'),
        ),
      S.listItem()
        .title("LEGACY forfatter")
        .schemaType("author")
        .child(
          S.documentList()
            .apiVersion(API_VERSION)
            .title("Forfattere")
            .filter('_type == "author"'),
        ),
      S.listItem()
        .title("LEGACY kategorier")
        .schemaType("category")
        .child(
          S.documentList()
            .apiVersion(API_VERSION)
            .title("Kategorier")
            .filter('_type == "category"'),
        ),
    ]);
