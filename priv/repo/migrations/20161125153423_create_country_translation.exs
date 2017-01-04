defmodule Pomerol.Repo.Migrations.CreateCountryTranslation do
  use Ecto.Migration

  def change do
    create table(:country_translations, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :country_id, references(:countries, on_delete: :delete_all, type: :binary_id), null: false
      add :locale, :string, null: false
      add :name, :string, null: false

      timestamps
    end

    create index(:country_translations, [:country_id, :locale], unique: true)
  end
end
