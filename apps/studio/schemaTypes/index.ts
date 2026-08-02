import blog from "./documents/blog";
import project from "./documents/project";
import author from "./legacy/author";
import category from "./legacy/category";
import figure from "./legacy/figure";
import projectPortableText from "./legacy/projectPortableText";
import simplePortableText from "./legacy/simplePortableText";
import { twitter } from "./objects/twitter";
import { youtube } from "./objects/youtube";

export const schemaTypes = [
	blog,
	project,
	twitter,
	youtube,
	simplePortableText,
	projectPortableText,
	figure,
	category,
	author,
];
