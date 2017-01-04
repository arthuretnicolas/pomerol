defmodule Pomerol.Repo.Migrations.AddCountryToOrganization do
  use Ecto.Migration

  def change do
    alter table :organizations do
      add :country_id, references(:countries, on_delete: :delete_all, type: :binary_id)
    end
  end
end
