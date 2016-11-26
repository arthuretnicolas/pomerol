defmodule Pomerol.CountryTranslation do
  use Pomerol.Web, :model
  use Translator.TranslationModel,
    schema: "country_translations", belongs_to: Pomerol.Country, required_fields: [:name]
end
