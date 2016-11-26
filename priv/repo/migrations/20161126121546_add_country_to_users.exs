defmodule Pomerol.Repo.Migrations.AddCountryToUsers do
  use Ecto.Migration

  def change do
    alter table :users do
      add :country_id, references(:countries)
    end
  end
end
