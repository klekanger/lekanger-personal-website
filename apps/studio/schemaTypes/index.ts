import blog from "./documents/blog";
import project from "./documents/project";
import showcase from "./documents/showcase";
import { articleImage } from "./fieldTypes/articleImage";
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
  twitter,
  youtube,
  portableText,
  articleImage,
  simplePortableText,
  projectPortableText,
  figure,
  category,
  author,

  // Singletons
  heroText,
  siteSettings,
];
