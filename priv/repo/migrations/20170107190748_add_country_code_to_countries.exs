defmodule Pomerol.Repo.Migrations.AddCountryCodeToCountries do
  use Ecto.Migration

  def change do
    alter table(:countries) do
      add :country_code, :string
    end

    create index(:countries, [:country_code], unique: true)
  end
end
