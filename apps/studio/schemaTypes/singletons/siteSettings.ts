import { CogIcon } from "@sanity/icons/Cog";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { MenuIcon } from "@sanity/icons/Menu";
import { RobotIcon } from "@sanity/icons/Robot";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  type: "document",
  title: "Innstillinger",
  icon: CogIcon,
  groups: [
    {
      name: "company",
      title: "Informasjon",
      icon: DocumentTextIcon,
      default: true,
    },
    {
      name: "navbar",
      title: "Navigasjonsmeny",
      icon: MenuIcon,
    },
    {
      name: "meta",
      title: "Metadata for søkemotorer",
      icon: RobotIcon,
    },
  ],
  fieldsets: [
    {
      name: "socialMedia",
      title: "Sosiale medier",
    },
  ],

  fields: [
    defineField({
      name: "companyName",
      title: "Firmanavn",
      description: "Firmanavn som skal brukes blant annet i kontaktinformasjon",
      type: "string",
      group: "company",
    }),
    defineField({
      name: "addressLine1",
      title: "Adresselinje 1",
      description: "Adressen som skal brukes blant annet i kontaktinformasjon",
      type: "string",
      group: "company",
    }),
    defineField({
      name: "addressLine2",
      title: "Adresselinje 2",
      type: "string",
      group: "company",
    }),
    defineField({
      name: "companyDescription",
      title: "Kort beskrivelse av firmaet",
      description: "Selgende beskrivelse av firmaet. Til footer.",
      type: "string",
      group: "company",
    }),
    defineField({
      name: "phone",
      title: "Telefonnummer",
      description:
        "Telefonnummer som skal brukes blant annet i kontaktinformasjon",
      type: "string",
      group: "company",
    }),
    defineField({
      name: "email",
      title: "E-post",
      description:
        "E-post-adresse som skal brukes blant annet i kontaktinformasjon",
      type: "string",
      group: "company",
    }),
    defineField({
      name: "organisationNumber",
      title: "Organisasjonsnummer",
      type: "string",
      group: "company",
    }),

    defineField({
      name: "gitHubAccount",
      title: "Lenke til GitHub-konto",
      type: "string",
      group: "company",
      fieldset: "socialMedia",
    }),
    defineField({
      name: "twitterAccount",
      title: "Lenke til X (Twitter)",
      type: "string",
      group: "company",
      fieldset: "socialMedia",
    }),
    defineField({
      name: "linkedInAccount",
      title: "Lenke til LinkedIn-profil",
      type: "string",
      group: "company",
      fieldset: "socialMedia",
    }),
    defineField({
      name: "otherSocialAccount",
      title: "Lenke til annen sosiale medier-konto",
      type: "string",
      group: "company",
      fieldset: "socialMedia",
    }),

    // Meta
    defineField({
      name: "metaTitle",
      title: "Meta - Title-tag",
      description:
        "Forteller søkemotorer og nettsider hva tittelen på nettsiden er.",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta - Description",
      description:
        "Kort beskrivelse av nettsiden for søkemotor-optimalisering. Brukes som standard på forsiden. Undersider får også denne beskrivelsen hvis ikke sidetittel finnes.",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "metaKeywords",
      title: "Meta - Keywords",
      description: "Liste med nøkkelord for SEO. Separert med komma.",
      type: "string",
      group: "meta",
    }),

    defineField({
      type: "image",
      name: "metaOgImage",
      title: "OpenGraph Image ",
      description:
        "Standardbilde for deling i sosiale medier. Helst 1200 x 630 piksler.",
      group: "meta",
    }),
  ],
});
