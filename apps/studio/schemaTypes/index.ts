import about from "./documents/about";
import blog from "./documents/blog";
import page from "./documents/page";
import project from "./documents/project";
import showcase from "./documents/showcase";
import { articleImage } from "./fieldTypes/articleImage";
import { factItem } from "./fieldTypes/factItem";
import { portableText } from "./fieldTypes/portableText";
import { twitter } from "./fieldTypes/twitter";
import { youtube } from "./fieldTypes/youtube";
import author from "./legacy/author";
import category from "./legacy/category";
import figure from "./legacy/figure";
import projectPortableText from "./legacy/projectPortableText";
import simplePortableText from "./legacy/simplePortableText";
import heroText from "./singletons/heroText";
import siteSettings from "./singletons/siteSettings";

export const schemaTypes = [
  blog,
  showcase,
  project,
  page,
  category,
  author,
  about,

  // Singletons
  heroText,
  siteSettings,

  // fieldTypes
  figure,
  twitter,
  youtube,
  articleImage,
  portableText,
  simplePortableText,
  projectPortableText,
  factItem,
];
