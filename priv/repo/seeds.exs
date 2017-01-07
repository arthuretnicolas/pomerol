# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Pomerol.Repo.insert!(%Pomerol.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Pomerol.{Repo, Country, CountryTranslation}

country_changeset = Country.changeset(%Country{}, %{name: "Australia", default_currency_code: "AUD", country_code: "AUS"})
country = Repo.insert!(country_changeset)
ct_changeset_en = CountryTranslation.changeset(%CountryTranslation{},%{name: "Australia", country_id: country.id, locale: "en"})
Repo.insert!(ct_changeset_en)
ct_changeset_fr = CountryTranslation.changeset(%CountryTranslation{},%{name: "Australie", country_id: country.id, locale: "fr"})
Repo.insert!(ct_changeset_fr)
