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

Repo.update_all(Pomerol.User, set: [country_id: nil])
Repo.update_all(Pomerol.Organization, set: [country_id: nil])
Repo.delete_all Country
Seed.LoadCountry.seed!
